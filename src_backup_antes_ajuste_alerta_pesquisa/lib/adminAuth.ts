import { NextResponse } from "next/server";

export function validateAdminTokenFromUrl(request: Request): true | NextResponse {
  const expectedToken = process.env.ADMIN_SURVEY_TOKEN;

  if (!expectedToken) {
    return NextResponse.json(
      { error: "ADMIN_SURVEY_TOKEN não configurado no ambiente." },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token || token !== expectedToken) {
    return NextResponse.json({ error: "Token inválido ou ausente." }, { status: 401 });
  }

  return true;
}
