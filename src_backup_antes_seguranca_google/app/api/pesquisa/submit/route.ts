import { NextResponse } from "next/server";
import { z } from "zod";
import { CAMPAIGN_KEY, CONSULENTE_ROLE_KEY, getRoleLabel } from "@/lib/surveyConfig";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const answerSchema = z.object({
  questionKey: z.string().min(1),
  questionLabel: z.string().min(1),
  questionType: z.enum(["single", "multiple"]),
  selectedOptions: z.array(z.string()).min(1),
  comment: z.string().optional().default(""),
});

const requestSchema = z.object({
  roleKeys: z.array(z.string().min(1)).min(1),
  roleLabels: z.array(z.string().min(1)).min(1),
  roleKey: z.string().optional(),
  roleLabel: z.string().optional(),
  identified: z.boolean(),
  name: z.string().optional().default(""),
  whatsapp: z.string().optional().default(""),
  allowContact: z.boolean().optional().default(false),
  answers: z.array(answerSchema).min(1),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos para salvar a pesquisa." }, { status: 400 });
  }

  const payload = parsed.data;
  const firstRoleKey = payload.roleKeys[0] ?? payload.roleKey ?? CONSULENTE_ROLE_KEY;
  const firstRoleLabel = payload.roleLabels[0] ?? payload.roleLabel ?? getRoleLabel(firstRoleKey);

  if (payload.identified && !payload.name.trim()) {
    return NextResponse.json(
      { error: "Informe seu nome ou escolha responder de forma anônima." },
      { status: 400 },
    );
  }

  const { data: responseRow, error: responseError } = await supabaseAdmin
    .from("survey_responses")
    .insert({
      campaign_key: CAMPAIGN_KEY,
      role_key: firstRoleKey,
      role_label: firstRoleLabel,
      role_keys: payload.roleKeys,
      role_labels: payload.roleLabels,
      identified: payload.identified,
      name: payload.identified ? payload.name.trim() || null : null,
      whatsapp: payload.identified ? payload.whatsapp.trim() || null : null,
      allow_contact: payload.identified ? payload.allowContact : false,
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

  const answersToInsert = payload.answers.map((answer) => ({
    response_id: responseRow.id,
    question_key: answer.questionKey,
    question_label: answer.questionLabel,
    question_type: answer.questionType,
    selected_options: answer.selectedOptions,
    comment: answer.comment.trim() || null,
  }));

  const { error: answersError } = await supabaseAdmin.from("survey_answers").insert(answersToInsert);

  if (answersError) {
    return NextResponse.json({ error: answersError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
