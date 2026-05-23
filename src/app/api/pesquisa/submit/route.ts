import { NextResponse } from "next/server";
import { z } from "zod";
import {
  CAMPAIGN_KEY,
  CONSULENTE_ROLE_KEY,
  getQuestionsForRoles,
  getRoleLabel,
  roles,
  type SurveyQuestion,
} from "@/lib/surveyConfig";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const answerSchema = z.object({
  questionKey: z.string().min(1),
  questionLabel: z.string().min(1),
  questionType: z.enum(["single", "multiple"]),
  selectedOptions: z.array(z.string().min(1)),
  comment: z.string().optional().default(""),
});

const requestSchema = z.object({
  identificationChoice: z.enum(["anonymous", "identified"]),
  identified: z.boolean().optional(),
  roleKeys: z.array(z.string().min(1)).min(1),
  roleLabels: z.array(z.string().min(1)).min(1),
  roleKey: z.string().optional(),
  roleLabel: z.string().optional(),
  name: z.string().optional().default(""),
  whatsapp: z.string().optional().default(""),
  allowContact: z.boolean().optional().default(false),
  answers: z.array(answerSchema).min(1),
});

function needsComment(selectedOptions: string[]): boolean {
  return selectedOptions.some((option) => {
    const normalized = option.trim().toLowerCase();
    return normalized === "outro" || normalized.includes("prefiro explicar");
  });
}

function validateQuestionAnswer(question: SurveyQuestion, answer: z.infer<typeof answerSchema>) {
  if (answer.questionType !== question.type) {
    return `Tipo de resposta inválido para a pergunta: ${question.label}`;
  }

  const validOptions = new Set(question.options.map((option) => option.value));
  const hasInvalidOption = answer.selectedOptions.some((option) => !validOptions.has(option));

  if (hasInvalidOption) {
    return `Uma das opções enviadas não pertence à pergunta: ${question.label}`;
  }

  if (question.required && answer.selectedOptions.length === 0) {
    return `Responda a pergunta obrigatória: ${question.label}`;
  }

  if (question.type === "single" && answer.selectedOptions.length !== 1) {
    return `A pergunta de escolha única deve ter exatamente uma resposta: ${question.label}`;
  }

  if (question.type === "multiple" && question.required && answer.selectedOptions.length < 1) {
    return `A pergunta de múltipla escolha precisa ter pelo menos uma opção marcada: ${question.label}`;
  }

  if (needsComment(answer.selectedOptions) && answer.comment.trim().length < 10) {
    return `Ao marcar 'Outro' ou 'prefiro explicar', inclua um comentário com pelo menos 10 caracteres na pergunta: ${question.label}`;
  }

  return null;
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos para salvar a pesquisa. Confira identificação, função e respostas obrigatórias." },
      { status: 400 },
    );
  }

  const payload = parsed.data;
  const identified = payload.identificationChoice === "identified";

  if (typeof payload.identified === "boolean" && payload.identified !== identified) {
    return NextResponse.json(
      { error: "A opção de identificação enviada está inconsistente." },
      { status: 400 },
    );
  }

  if (identified && payload.name.trim().length < 2) {
    return NextResponse.json(
      { error: "Informe seu nome com pelo menos 2 caracteres ou escolha responder de forma anônima." },
      { status: 400 },
    );
  }

  const knownRoleKeys = new Set(roles.map((role) => role.key));
  const uniqueRoleKeys = Array.from(new Set(payload.roleKeys));

  if (uniqueRoleKeys.length === 0) {
    return NextResponse.json(
      { error: "Selecione pelo menos uma função/papel no TUCXA." },
      { status: 400 },
    );
  }

  const hasInvalidRole = uniqueRoleKeys.some((roleKey) => !knownRoleKeys.has(roleKey));
  if (hasInvalidRole) {
    return NextResponse.json({ error: "Função/papel inválido na pesquisa." }, { status: 400 });
  }

  if (uniqueRoleKeys.includes(CONSULENTE_ROLE_KEY) && uniqueRoleKeys.length > 1) {
    return NextResponse.json(
      { error: "A pesquisa de consulentes deve ser enviada separadamente das funções internas." },
      { status: 400 },
    );
  }

  const expectedQuestions = getQuestionsForRoles(uniqueRoleKeys);
  const answersByQuestionKey = new Map(payload.answers.map((answer) => [answer.questionKey, answer]));

  for (const question of expectedQuestions) {
    const answer = answersByQuestionKey.get(question.key);

    if (!answer) {
      return NextResponse.json(
        { error: `Responda a pergunta obrigatória: ${question.label}` },
        { status: 400 },
      );
    }

    const questionError = validateQuestionAnswer(question, answer);
    if (questionError) {
      return NextResponse.json({ error: questionError }, { status: 400 });
    }
  }

  const expectedQuestionKeys = new Set(expectedQuestions.map((question) => question.key));
  const hasUnexpectedAnswer = payload.answers.some((answer) => !expectedQuestionKeys.has(answer.questionKey));

  if (hasUnexpectedAnswer) {
    return NextResponse.json(
      { error: "A pesquisa contém respostas que não pertencem às perguntas esperadas." },
      { status: 400 },
    );
  }

  const roleLabels = uniqueRoleKeys.map(getRoleLabel);
  const firstRoleKey = uniqueRoleKeys[0] ?? payload.roleKey ?? CONSULENTE_ROLE_KEY;
  const firstRoleLabel = roleLabels[0] ?? payload.roleLabel ?? getRoleLabel(firstRoleKey);

  const { data: responseRow, error: responseError } = await supabaseAdmin
    .from("survey_responses")
    .insert({
      campaign_key: CAMPAIGN_KEY,
      role_key: firstRoleKey,
      role_label: firstRoleLabel,
      role_keys: uniqueRoleKeys,
      role_labels: roleLabels,
      identified,
      name: identified ? payload.name.trim() : null,
      whatsapp: identified ? payload.whatsapp.trim() || null : null,
      allow_contact: identified ? payload.allowContact : false,
      user_agent: request.headers.get("user-agent"),
    })
    .select("id")
    .single();

  if (responseError || !responseRow) {
    return NextResponse.json(
      { error: responseError?.message ?? "Erro ao registrar a resposta." },
      { status: 500 },
    );
  }

  const answersToInsert = expectedQuestions.map((question) => {
    const answer = answersByQuestionKey.get(question.key);

    return {
      response_id: responseRow.id,
      question_key: question.key,
      question_label: question.label,
      question_type: question.type,
      selected_options: answer?.selectedOptions ?? [],
      comment: answer?.comment.trim() || null,
    };
  });

  const { error: answersError } = await supabaseAdmin.from("survey_answers").insert(answersToInsert);

  if (answersError) {
    return NextResponse.json({ error: answersError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
