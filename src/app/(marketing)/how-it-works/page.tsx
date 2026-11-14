import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Braces, Database, Layers3, Shield, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
const steps = [
  ["01", "Ingress", "Accept the HTTP request and enforce transport-level bounds."],
  ["02", "Authentication", "Verify which caller is making this request."],
  ["03", "Governance", "Check configured gateway access and policy constraints."],
  ["04", "Router", "Choose a configured provider route."],
  ["05", "Reliability", "Apply request reliability policies."],
  ["06", "Secrets", "Resolve the upstream provider credential."],
  ["07", "Adapter", "Invoke the model provider using its adapter."],
  ["08", "StreamGuard", "Check response streaming integrity and completion."],
  ["09", "SchemaLock", "Apply configured response-structure checks."],
  ["10", "Metering", "Produce request usage facts."],
  ["11", "Cost", "Calculate cost from usage and configured pricing."],
  ["12", "Emitter", "Emit operational and audit facts."],
];
export const metadata: Metadata = { title: "How it works" };
export default function HowItWorks() {
 return <><section className="subpage-hero"><div className="container"><span className="eyebrow">HOW IT WORKS</span><h1>Between your app<br/><span>and the model.</span></h1><p>Your app continues to own prompts, retrieval, memory and business logic. The gateway controls the model execution boundary.</p></div></section>
 <section className="section section-white"><div className="container"><SectionHeading eyebrow="TWO RESPONSIBILITIES" title="What stays with the app, what moves to the gateway."/><div className="responsibility-grid"><div className="responsibility-card"><div className="responsibility-icon"><Braces size={26}/></div><span className="eyebrow">YOUR APPLICATION</span><h3>What the AI should do</h3><p>Customer data, retrieval (RAG), orchestration, prompts, conversation memory, validation, and business rules.</p><ul><li>Find relevant insurance policy documents</li><li>Prepare a claim summary prompt</li><li>Decide whether a claim needs human review</li></ul></div><div className="responsibility-bridge"><ArrowRight size={24}/><ArrowDown size={23}/></div><div className="responsibility-card responsibility-dark"><div className="responsibility-icon"><Shield size={26}/></div><span className="eyebrow">RELIABILITY GATEWAY</span><h3>How the AI call executes</h3><p>Caller identity, gateway policy, provider routing, secrets, streaming and output checks, usage and audit facts.</p><ul><li>Verify the app is allowed to call a model</li><li>Detect interrupted response streaming</li><li>Attribute request usage and cost</li></ul></div></div></div></section>
 <section className="section section-ice"><div className="container"><SectionHeading eyebrow="REQUEST JOURNEY" title="Every stage has a job." description="These are the 12 named stages of the implemented Java Data Plane. The operational behavior depends on actual policy and provider configuration."/><div className="steps-list">{steps.map(([number,title,description])=><div className="step-row" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="step-line"/></div>)}</div></div></section>
 <section className="section dark-section"><div className="container callout-inline"><div><span className="eyebrow">IMPORTANT DISTINCTION</span><h2>Validated structure is not verified truth.</h2><p>A response can match JSON Schema and still contain a false claim or inaccurate refund information. The application must use authoritative records and its own business rules for real decisions.</p></div><div className="callout-icon"><Layers3 size={56}/><Sparkles size={25}/></div></div></section>
 <section className="section section-white"><div className="container"><SectionHeading eyebrow="LEARN MORE" title="Explore the implemented architecture."/><div className="mini-links"><Link href="/platform"><Database/> Platform capabilities <ArrowUpRight size={17}/></Link><Link href="/solutions"><Shield/> Real use cases <ArrowUpRight size={17}/></Link><Link href="/docs"><Braces/> Backend documentation <ArrowUpRight size={17}/></Link></div></div></section></>;
}
