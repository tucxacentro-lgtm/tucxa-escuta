import { NextResponse } from "next/server";
import { validateAdminTokenFromUrl } from "@/lib/adminAuth";
import { CAMPAIGN_KEY } from "@/lib/surveyConfig";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type SurveyResponseForExport = {
  role_labels?: string[] | null;
  identified?: boolean | null;
  name?: string | null;
  whatsapp?: string | null;
  allow_contact?: boolean | null;
  submitted_at?: string | null;
  campaign_key?: string | null;
};

type SurveyAnswerExportRow = {
  question_key: string | null;
  question_label: string | null;
  question_type: "single" | "multiple" | string | null;
  selected_options: string[] | null;
  comment: string | null;
  created_at: string | null;
  survey_responses: SurveyResponseForExport | SurveyResponseForExport[] | null;
};

type CsvValue = string | number | boolean | null | undefined | string[];

function csvEscape(value: CsvValue): string {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function normalizeSurveyResponse(
  value: SurveyResponseForExport | SurveyResponseForExport[] | null,
): SurveyResponseForExport | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

export async function GET(request: Request) {
  const authorized = validateAdminTokenFromUrl(request);
  if (authorized !== true) return authorized;

  const { data, error } = await supabaseAdmin
    .from("survey_answers")
    .select(
      "question_key, question_label, question_type, selected_options, comment, created_at, survey_responses!inner(role_labels, identified, name, whatsapp, allow_contact, submitted_at, campaign_key)",
    )
    .eq("survey_responses.campaign_key", CAMPAIGN_KEY)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rowsFromSupabase = (data ?? []) as unknown as SurveyAnswerExportRow[];

  const header = [
    "data_envio",
    "funcoes",
    "identificado",
    "nome",
    "whatsapp",
    "aceita_contato",
    "pergunta",
    "tipo_pergunta",
    "opcoes_marcadas",
    "comentario",
  ];

  const rows = rowsFromSupabase.map((row) => {
    const response = normalizeSurveyResponse(row.survey_responses);

    return [
      response?.submitted_at,
      response?.role_labels ?? [],
      response?.identified ? "sim" : "nao",
      response?.name,
      response?.whatsapp,
      response?.allow_contact ? "sim" : "nao",
      row.question_label,
      row.question_type === "single" ? "escolha unica" : "multipla escolha",
      row.selected_options ?? [],
      row.comment,
    ];
  });

  const csv = [header, ...rows]
    .map((row) => row.map((value) => csvEscape(value)).join(","))
    .join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="escuta-tucxa-respostas.csv"',
    },
  });
}
