import type { PostgrestError } from "@supabase/supabase-js";

type SurveyResponseRow = {
  id: string;
  role_keys: string[];
  role_labels: string[];
  identified: boolean;
  name: string | null;
  whatsapp: string | null;
  allow_contact: boolean;
  submitted_at: string;
};

type SurveyAnswerRow = {
  id: string;
  response_id: string;
  question_key: string;
  question_label: string;
  question_type: "single" | "multiple";
  selected_options: string[];
  comment: string | null;
  survey_responses: SurveyResponseRow | null;
};

export type DashboardData = {
  totalResponses: number;
  anonymousResponses: number;
  identifiedResponses: number;
  allowContactCount: number;
  lastSubmittedAt: string | null;
  responsesByRole: Array<{ label: string; total: number }>;
  topOptions: Record<string, Array<{ label: string; total: number }>>;
  comments: Array<{
    submittedAt: string;
    roleLabels: string[];
    identified: boolean;
    name: string | null;
    whatsapp: string | null;
    questionLabel: string;
    selectedOptions: string[];
    comment: string;
  }>;
};

export function throwIfSupabaseError(error: PostgrestError | null): void {
  if (error) {
    throw new Error(error.message);
  }
}

function increment(map: Map<string, number>, key: string, by = 1): void {
  map.set(key, (map.get(key) ?? 0) + by);
}

function toRanking(map: Map<string, number>, limit = 12): Array<{ label: string; total: number }> {
  return Array.from(map.entries())
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label, "pt-BR"))
    .slice(0, limit);
}

export function buildDashboardData(responses: SurveyResponseRow[], answers: SurveyAnswerRow[]): DashboardData {
  const responsesByRoleMap = new Map<string, number>();
  const topOptionMaps: Record<string, Map<string, number>> = {};

  for (const response of responses) {
    for (const label of response.role_labels ?? []) {
      increment(responsesByRoleMap, label);
    }
  }

  for (const answer of answers) {
    if (!topOptionMaps[answer.question_key]) {
      topOptionMaps[answer.question_key] = new Map<string, number>();
    }
    for (const option of answer.selected_options ?? []) {
      increment(topOptionMaps[answer.question_key], option);
    }
  }

  const topOptions = Object.fromEntries(
    Object.entries(topOptionMaps).map(([questionKey, map]) => [questionKey, toRanking(map)]),
  );

  return {
    totalResponses: responses.length,
    anonymousResponses: responses.filter((response) => !response.identified).length,
    identifiedResponses: responses.filter((response) => response.identified).length,
    allowContactCount: responses.filter((response) => response.allow_contact).length,
    lastSubmittedAt: responses[0]?.submitted_at ?? null,
    responsesByRole: toRanking(responsesByRoleMap, 20),
    topOptions,
    comments: answers
      .filter((answer) => answer.comment && answer.comment.trim().length > 0)
      .map((answer) => ({
        submittedAt: answer.survey_responses?.submitted_at ?? "",
        roleLabels: answer.survey_responses?.role_labels ?? [],
        identified: Boolean(answer.survey_responses?.identified),
        name: answer.survey_responses?.name ?? null,
        whatsapp: answer.survey_responses?.whatsapp ?? null,
        questionLabel: answer.question_label,
        selectedOptions: answer.selected_options ?? [],
        comment: answer.comment ?? "",
      }))
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)),
  };
}
