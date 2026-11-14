"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, CircleCheck, CircleX, Clock3, RefreshCw, Server, ShieldCheck } from "lucide-react";
import type { GatewayStatus } from "@/lib/console-types";

export function useGatewayStatus(auto = false) {
  const [status, setStatus] = useState<GatewayStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/gateway/status", { cache: "no-store" });
      if (!response.ok) throw new Error(response.status === 401 ? "Session expired, sign in again" : "Unable to fetch gateway status");
      setStatus((await response.json()) as GatewayStatus);
    } catch (e) { setError(e instanceof Error ? e.message : "Gateway status unavailable"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    let active = true;
    void (async () => { if (active) await refresh(); })();
    if (!auto) return () => { active = false; };
    const timer = setInterval(() => { if (active) void refresh(); }, 30_000);
    return () => { active = false; clearInterval(timer); };
  }, [auto, refresh]);
  return { status, loading, error, refresh };
}

function StateMark({ ok, waiting }: { ok: boolean; waiting?: boolean }) {
  return <span className={`state-mark ${waiting ? "state-waiting" : ok ? "state-good" : "state-bad"}`}>{waiting ? <Clock3 size={19}/> : ok ? <CircleCheck size={19}/> : <CircleX size={19}/>}</span>;
}

export function GatewayOverview() {
  const { status, loading, error, refresh } = useGatewayStatus(true);
  const configured = status?.configured === true;
  const reachable = status?.health?.reachable === true;
  const ready = status?.readiness?.ok === true;
  return <><div className="console-heading"><div><span className="eyebrow">OPERATIONS OVERVIEW</span><h1>Your gateway, at a glance.</h1><p>Live connection checks against your configured Java Data Plane. No invented traffic or usage figures.</p></div><button className="btn btn-outline console-refresh" onClick={() => void refresh()} disabled={loading}><RefreshCw size={17} className={loading ? "spin" : ""}/> Refresh</button></div>
  {error && <div className="status-alert" role="alert">{error}</div>}
  {!loading && !configured && <div className="setup-alert"><Server size={24}/><div><strong>Gateway connection not configured</strong><p>Add <code>GATEWAY_BASE_URL</code>, <code>GATEWAY_API_KEY</code>, and <code>GATEWAY_MODEL</code> to <code>.env.local</code>, then restart Next.js.</p></div></div>}
  <div className="stat-grid"><div className="stat-card"><div><span>Backend connection</span><Server size={19}/></div><strong>{loading ? "Checking..." : configured ? reachable ? "Connected" : "Offline" : "Not set"}</strong><p><StateMark ok={reachable} waiting={loading}/> {configured ? "Java backend reachability" : "Configuration required"}</p></div>
    <div className="stat-card"><div><span>Gateway readiness</span><Activity size={19}/></div><strong>{loading ? "Checking..." : ready ? "READY" : configured ? "Not ready" : "Not set"}</strong><p><StateMark ok={ready} waiting={loading}/> From the actual /ready endpoint</p></div>
    <div className="stat-card"><div><span>Configured model</span><ShieldCheck size={19}/></div><strong className="stat-model">{status?.model ?? "Not set"}</strong><p>Configured server-side model route</p></div>
    <div className="stat-card"><div><span>Last status check</span><Clock3 size={19}/></div><strong className="stat-date">{status?.checkedAt ? new Date(status.checkedAt).toLocaleTimeString() : "—"}</strong><p>Refreshed every 30 seconds</p></div>
  </div>
  <div className="console-two-col"><div className="console-panel"><div className="panel-title"><div><span className="eyebrow">RUNTIME HEALTH</span><h2>Endpoint status</h2></div><Link href="/console/health" className="text-link">View details <ArrowRight size={16}/></Link></div><div className="endpoint-row"><div><span className="endpoint-icon"><Server size={17}/></span><div><strong>Process health</strong><span>GET /health</span></div></div><span className={`status-pill ${status?.health?.ok ? "pill-green" : "pill-muted"}`}>{status?.health?.ok ? "Healthy" : "Unavailable"}</span></div><div className="endpoint-row"><div><span className="endpoint-icon"><Activity size={17}/></span><div><strong>Service readiness</strong><span>GET /ready</span></div></div><span className={`status-pill ${status?.readiness?.ok ? "pill-green" : "pill-muted"}`}>{status?.readiness?.ok ? "Ready" : "Unavailable"}</span></div></div>
  <div className="console-panel panel-navy"><span className="eyebrow">START HERE</span><h2>Make a verified model request.</h2><p>Use the protected Playground to send a chat prompt through the real 12-stage gateway pipeline.</p><Link href="/console/playground" className="btn btn-light">Open Playground <ArrowRight size={17}/></Link><div className="panel-decoration"><ShieldCheck size={90}/></div></div></div>
  <div className="console-bottom-note"><ShieldCheck size={20}/><p><strong>About this console:</strong> Health and playground requests use the existing gateway HTTP endpoints. Provider setup, policy editors, audit-history search and multi-tenant administration need separate Control Plane APIs and are not represented as working features.</p></div>
  </>;
}
