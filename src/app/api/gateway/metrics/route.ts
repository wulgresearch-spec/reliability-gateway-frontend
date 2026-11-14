import { NextResponse } from "next/server";
import { isOperatorAuthenticated } from "@/lib/auth";
import { gatewayEnvironment, gatewayGet } from "@/lib/gateway";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  if (!(await isOperatorAuthenticated())) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!gatewayEnvironment().connected) return NextResponse.json({ error: "Gateway is not configured" }, { status: 503 });
  try {
    const upstream = await gatewayGet("/metrics", 5000);
    if (!upstream.ok || !upstream.body) return NextResponse.json({ error: "Metrics endpoint unavailable" }, { status: 502 });
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let result = "";
    let size = 0;
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 64_000) return NextResponse.json({ error: "Metrics response exceeds preview limit" }, { status: 502 });
        result += decoder.decode(value, { stream: true });
      }
      result += decoder.decode();
    } finally {
      reader.releaseLock();
    }
    return new NextResponse(result, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not reach gateway metrics endpoint" }, { status: 502 });
  }
}
