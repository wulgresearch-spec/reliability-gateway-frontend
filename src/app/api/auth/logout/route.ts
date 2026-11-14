import { NextRequest, NextResponse } from "next/server";
import { isSameOrigin, sessionCookieName } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Cross-origin request refused" }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookieName, "", { path: "/", maxAge: 0, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
