import { NextRequest, NextResponse } from "next/server";
import { isOperatorAuthenticated, isSameOrigin } from "@/lib/auth";
import { gatewayEnvironment } from "@/lib/gateway";
import { z } from "zod";

const promptSchema = z.object({ prompt: z.string().trim().min(1).max(4000), stream: z.boolean().optional() }).strict();

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!(await isOperatorAuthenticated())) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Cross-origin request refused" }, { status: 403 });
  // Isolated infrastructure pilot: never forward prompts to a provider.
  if (process.env.GATEWAY_PILOT_HEALTH_ONLY === "true") return NextResponse.json({ error: "AI requests are disabled for this health-only pilot" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  const env = gatewayEnvironment();
  if (!env.connected) return NextResponse.json({ error: "Configure the backend connection first" }, { status: 503 });

  let data: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12_000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON request" }, { status: 400 });
  }
  const parsed = promptSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Provide a prompt of 1–4000 characters and an optional stream flag" }, { status: 400 });
  }
  const streaming = parsed.data.stream === true;
  const payload = JSON.stringify({ model: env.model, messages: [{ role: "user", content: parsed.data.prompt }], stream: streaming });
  try {
    const response = await fetch(`${env.url}/v1/chat/completions`, {
      method: "POST",
      cache: "no-store",
      redirect: "manual",
      headers: { "Content-Type": "application/json", "Accept": streaming ? "text/event-stream" : "application/json", Authorization: `Bearer ${env.apiKey}` },
      body: payload,
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(60_000)]),
    });
    const type = response.headers.get("content-type") ?? "application/json";
    const contentType = type.startsWith("text/event-stream") ? "text/event-stream; charset=utf-8" : "application/json; charset=utf-8";
    return new Response(response.body, {
      status: response.status,
      headers: { "Content-Type": contentType, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
    });
  } catch {
    return NextResponse.json({ error: "The configured gateway could not complete this request" }, { status: 502 });
  }
}
