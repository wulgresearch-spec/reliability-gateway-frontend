import { ArrowDown, ArrowRight, Check, Fingerprint, GitBranch, Layers3, LockKeyhole, Radio, ShieldCheck, Waves } from "lucide-react";

const checks = [
  { icon: Fingerprint, title: "Identity", detail: "Caller verified" },
  { icon: ShieldCheck, title: "Policy", detail: "Admission allowed" },
  { icon: GitBranch, title: "Routing", detail: "Provider selected" },
  { icon: Layers3, title: "Schema", detail: "Structure validated" },
  { icon: Waves, title: "Streaming", detail: "Complete response" },
];

export function PipelinePreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`pipeline-visual ${compact ? "pipeline-compact" : ""}`} aria-label="Illustrative successful AI request through the gateway">
      <div className="pipeline-topline"><span className="pipeline-dot-group"><i /><i /><i /></span><span>REQUEST PATH / ILLUSTRATION</span><Radio size={15}/></div>
      <div className="pipeline-intro"><div className="pipeline-intro-icon"><LockKeyhole size={21}/></div><div><span className="pipeline-overline">CONTROLLED EXECUTION</span><h3>Every stage. One boundary.</h3></div></div>
      <div className="pipeline-incoming"><span>Application request</span><ArrowRight size={17}/><span>AI provider</span></div>
      <div className="pipeline-connector"><ArrowDown size={15}/></div>
      <div className="pipeline-checks">
        {checks.map(({ icon: Icon, title, detail }, i) => (
          <div className="pipeline-check" key={title}>
            <span className="check-icon"><Icon size={16}/></span>
            <span className="check-name">{String(i + 1).padStart(2,"0")} / {title}</span>
            <span className="check-detail">{detail}</span>
            <span className="check-success"><Check size={14}/></span>
          </div>
        ))}
      </div>
      <div className="pipeline-result"><span className="result-icon"><Check size={19}/></span><div><strong>Response verified</strong><span>Safe to hand back to the application</span></div><span className="result-simulated">SAMPLE</span></div>
      <p className="pipeline-disclaimer">Illustrative flow · Not live telemetry</p>
    </div>
  );
}
