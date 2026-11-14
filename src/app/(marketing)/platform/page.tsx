import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "Platform" };
const details = [
  { name: "Identity & admission", detail: "Verify the calling application and evaluate the configured governance policy before provider execution." },
  { name: "Routing & reliability", detail: "Select an eligible configured route and apply retries/failure handling. Failover requires actual alternative providers and the right policy." },
  { name: "Credential isolation", detail: "Resolve provider credentials at the execution boundary instead of copying them into browser applications." },
  { name: "StreamGuard", detail: "Keep the streaming lifecycle observable, and distinguish a completed stream from an interrupted one." },
  { name: "SchemaLock", detail: "Apply configured structural checks to AI outputs. Structural validity is not evidence of factual accuracy." },
  { name: "Metering and cost", detail: "Attribute token usage and derive costs using configured pricing information; the local demo does not represent actual provider billing." },
  { name: "Operational evidence", detail: "Use structured runtime facts, metrics, and audit sinks to understand how requests were handled." },
  { name: "Application independence", detail: "Keep RAG, agent orchestration, memory retrieval and business decisions where they belong: in your application." },
];
export default function PlatformPage() {
  return <><section className="subpage-hero"><div className="container"><span className="eyebrow">THE PLATFORM</span><h1>One boundary.<br/><span>More control.</span></h1><p>Reliability Gateway is the execution and governance layer around your AI provider calls. It complements your existing AI stack rather than replacing it.</p><Link href="/how-it-works" className="btn btn-dark">See the request path <ArrowUpRight size={17}/></Link></div></section>
  <section className="section section-white"><div className="container"><SectionHeading eyebrow="CORE CAPABILITIES" title="Controls your application can rely on." description="Built as modular Java services, connected through a mandatory execution path."/><div className="platform-grid">{details.map(({name,detail},i)=><article className="platform-card" key={name}><span className="eyebrow">CAPABILITY / {String(i+1).padStart(2,"0")}</span><h3>{name}</h3><p>{detail}</p></article>)}</div></div></section>
  <section className="section section-ice"><div className="container disclaimer-panel"><ShieldCheck size={28}/><div><h3>Implementation status matters.</h3><p>The Java Data Plane and OpenAI adapter are implemented and tested. The operator-facing Console in this frontend initially supports gateway health and the chat playground; customer administration, organization-wide reporting and full Control Plane APIs need separate backend development. This project is not yet a turnkey enterprise SaaS.</p></div></div></section></>;
}
