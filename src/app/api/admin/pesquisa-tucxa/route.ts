import { NextResponse } from "next/server";
import { validateAdminTokenFromUrl } from "@/lib/adminAuth";
import { buildDashboardData } from "@/lib/surveyAnalytics";
import { CAMPAIGN_KEY } from "@/lib/surveyConfig";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request: Request) {
  const authorized = validateAdminTokenFromUrl(request);
  if (authorized !== true) return authorized;

  const { data: responses, error: responsesError } = await supabaseAdmin
    .from("survey_responses")
    .select("id, role_keys, role_labels, identified, name, whatsapp, allow_contact, submitted_at")
    .eq("campaign_key", CAMPAIGN_KEY)
    .order("submitted_at", { ascending: false });

  if (responsesError) {
    return NextResponse.json({ error: responsesError.message }, { status: 500 });
  }

  const { data: answers, error: answersError } = await supabaseAdmin
    .from("survey_answers")
    .select(
      "id, response_id, question_key, question_label, question_type, selected_options, comment, survey_responses!inner(id, role_keys, role_labels, identified, name, whatsapp, allow_contact, submitted_at, campaign_key)",
    )
    .eq("survey_responses.campaign_key", CAMPAIGN_KEY)
    .order("created_at", { ascending: false });

  if (answersError) {
    return NextResponse.json({ error: answersError.message }, { status: 500 });
  }

  return NextResponse.json(buildDashboardData(responses ?? [], (answers ?? []) as never));
}
