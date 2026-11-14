import { NextResponse } from "next/server";
import { isOperatorAuthenticated } from "@/lib/auth";
import { gatewayEnvironment, gatewayGet } from "@/lib/gateway";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function probe(path: "/health" | "/ready") {
  try {
    const response = await gatewayGet(path, 4000);
    return { reachable: true, ok: response.ok, status: response.status, message: (await response.text()).slice(0, 80).trim() };
  } catch {
    return { reachable: false, ok: false, status: null, message: "Unavailable" };
  }
}

export async function GET() {
  if (!(await isOperatorAuthenticated())) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const env = gatewayEnvironment();
  if (!env.connected) return NextResponse.json({ configured: false, model: null, health: null, readiness: null, checkedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
  const [health, readiness] = await Promise.all([probe("/health"), probe("/ready")]);
  return NextResponse.json({ configured: true, model: env.model, health, readiness, checkedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
}
