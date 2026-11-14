"use client";
import { useEffect, useState } from "react";
import { Activity, RefreshCw, TerminalSquare } from "lucide-react";
import { useGatewayStatus } from "@/components/gateway-status";

export function HealthDetail() {
  const { status, loading, error, refresh } = useGatewayStatus();
  const [metrics, setMetrics] = useState("");
  const [metricsError, setMetricsError] = useState("");
  const [metricsBusy, setMetricsBusy] = useState(true);
  useEffect(() => { void (async () => {
    setMetricsBusy(true);
    try {
      const r=await fetch("/api/gateway/metrics", { cache: "no-store" });
      if(!r.ok) throw new Error(r.status===503 ? "Configure the gateway to load metrics" : "Gateway metrics are not available");
      setMetrics(await r.text()); setMetricsError("");
    } catch(e) {setMetricsError(e instanceof Error?e.message:"Unable to read metrics");}
    finally{setMetricsBusy(false)}
  })(); }, []);
  async function refreshAll() {
    await refresh();setMetricsBusy(true);
    try { const r=await fetch("/api/gateway/metrics", {cache:"no-store"});if(!r.ok) throw new Error("Metrics not available"); setMetrics(await r.text());setMetricsError(""); }
    catch(e){setMetricsError(e instanceof Error?e.message:"Metrics unavailable")}finally{setMetricsBusy(false)}
  }
  return <><div className="console-heading"><div><span className="eyebrow">OPERATIONS / HEALTH</span><h1>Gateway health & metrics.</h1><p>Real-time endpoint status and raw metrics, retrieved securely through the frontend server.</p></div><button className="btn btn-outline" disabled={loading || metricsBusy} onClick={() => void refreshAll()}><RefreshCw size={17} className={loading || metricsBusy?"spin":""}/> Refresh all</button></div>
    {error && <div className="status-alert" role="alert">{error}</div>}
    <div className="health-detail-grid"><div className="console-panel health-status-card"><div className="health-card-title"><Activity size={20}/><h2>Runtime endpoints</h2></div><div className="health-check"><span>GET /health</span><strong>{loading ? "Checking…" : status?.health?.message ?? "Not connected"}</strong></div><div className="health-check"><span>GET /ready</span><strong>{loading ? "Checking…" : status?.readiness?.message ?? "Not connected"}</strong></div><div className="health-check"><span>Configured model</span><strong>{status?.model ?? "—"}</strong></div><p className="muted-small">These values are never simulated. A disconnected or unconfigured gateway is shown as unavailable.</p></div><div className="console-panel health-info"><TerminalSquare size={28}/><h2>How status works</h2><p>The frontend makes server-to-server calls to your Java gateway's existing <code>/health</code>, <code>/ready</code> and <code>/metrics</code> endpoints.</p><p>Do not expose the backend or provider credentials directly to the browser.</p></div></div>
    <div className="console-panel metrics-panel"><div className="panel-title"><div><span className="eyebrow">RAW / PROMETHEUS-STYLE</span><h2>Gateway metrics</h2></div><span className="status-pill pill-muted">READ ONLY</span></div>{metricsError?<div className="empty-metrics" role="status">{metricsError}</div>:<pre className="metrics-pre">{metricsBusy?"Loading actual metrics…":metrics||"Gateway returned an empty metrics body."}</pre>}</div>
  </>;
}
