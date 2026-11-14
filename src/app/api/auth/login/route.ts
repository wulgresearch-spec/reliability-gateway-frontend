import { NextRequest, NextResponse } from "next/server";
import { createSession, hasOperatorCredentials, isSameOrigin, sessionCookieName, sessionOptions, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Cross-origin request refused" }, { status: 403 });
  if (!hasOperatorCredentials()) return NextResponse.json({ error: "Console access has not been configured by the operator" }, { status: 503 });

  let password = "";
  try {
    const text = await request.text();
    if (text.length > 4500) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const body: unknown = JSON.parse(text);
    if (typeof body === "object" && body !== null && "password" in body && typeof body.password === "string") password = body.password;
  } catch {
    return NextResponse.json({ error: "Invalid login request" }, { status: 400 });
  }

  if (!verifyPassword(password)) return NextResponse.json({ error: "Invalid access password" }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookieName, createSession(), sessionOptions);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
