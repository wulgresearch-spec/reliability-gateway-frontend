import Link from "next/link";
import { ArrowRight, ArrowUpRight, Box, CheckCheck, ChevronRight, Code2, ShieldCheck } from "lucide-react";
import { PipelinePreview } from "@/components/pipeline-preview";
import { BrandGallery } from "@/components/brand-gallery";
import { BrandStory, TrustBanner } from "@/components/brand-story";
import { SectionHeading } from "@/components/section-heading";

const capabilities = [
  { title: "Governance at the boundary", text: "Authenticate callers and evaluate policy before a model request leaves your application." },
  { title: "Reliable provider execution", text: "Route to configured providers, apply resilience policies, and keep provider-specific plumbing in adapters." },
  { title: "Response integrity", text: "Check response shape with SchemaLock and detect incomplete streams with StreamGuard." },
  { title: "Usage you can account for", text: "Produce metering, cost and audit facts through the execution pipeline." },
];

const stages = ["Ingress", "Identity", "Governance", "Routing", "Reliability", "Secrets", "Provider", "StreamGuard", "SchemaLock", "Metering", "Cost", "Emitter"];

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="announce"><span className="announce-dot" /> BUILT FOR PRODUCTION-MINDED AI TEAMS <ChevronRight size={15}/></span>
            <h1>AI is powerful.<br/><span>Reliability is</span><br/>non-negotiable.</h1>
            <p className="hero-description">One deliberate boundary between your application and AI models. Govern every request, validate every response, and keep the infrastructure in your control.</p>
            <div className="hero-actions"><Link className="btn btn-dark btn-lg" href="/platform">Explore the platform <ArrowUpRight size={18}/></Link><Link className="btn btn-outline btn-lg" href="/how-it-works">See how it works <ArrowRight size={18}/></Link></div>
            <div className="hero-footnote"><span><CheckCheck size={16}/> Ordered execution</span><span><CheckCheck size={16}/> Provider-aware</span><span><CheckCheck size={16}/> Auditable by design</span></div>
          </div>
          <div className="hero-art"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><PipelinePreview/></div>
        </div>
      </section>
      <section className="facts-strip" aria-label="Platform characteristics"><div className="container facts-grid">
        <div><strong>12</strong><span>Mandatory pipeline stages</span></div>
        <div><strong>31</strong><span>Backend Maven modules</span></div>
        <div><strong>Java 21</strong><span>Data-plane foundation</span></div>
        <div><strong>OpenAI</strong><span>Adapter implemented</span></div>
      </div></section>
      <section className="section section-white"><div className="container">
        <SectionHeading eyebrow="THE PROBLEM" title="A model response is not the same as a reliable outcome." description="A successful HTTP response can still contain unusable data. Reliability cannot be an afterthought spread across dozens of applications."/>
        <div className="problem-grid"><div className="problem-note"><div className="problem-label"><span className="problem-x">×</span> WITHOUT A SHARED BOUNDARY</div><h3>Every team rebuilds the safety net.</h3><p>Retry logic, provider failures, schema checks, policy decisions, streaming issues and observability become scattered application code.</p><div className="problem-code">200 OK <span>≠</span> valid business output</div></div>
        <div className="solution-note"><div className="problem-label"><span className="solution-check">✓</span> WITH RELIABILITY GATEWAY</div><h3>One place to enforce the path.</h3><p>Keep prompts, RAG, memory and business rules in your app. Put common model-call reliability and control concerns into the gateway.</p><div className="solution-code"><ShieldCheck size={17}/> Every request follows the pipeline</div></div></div>
      </div></section>
      <BrandStory />
      <section className="section section-ice"><div className="container"><SectionHeading eyebrow="BUILT-IN CAPABILITIES" title="Infrastructure that makes AI dependable." description="Not another chatbot. A purposeful execution layer that helps your team focus on the AI experience instead of reinventing its guardrails."/>
        <div className="feature-grid">{capabilities.map(({title,text},i)=><div className="feature-card" key={title}><span className="feature-index">CAPABILITY / 0{i+1}</span><h3>{title}</h3><p>{text}</p><Link href="/platform" className="text-link">Explore capability <ArrowUpRight size={16}/></Link></div>)}</div>
      </div></section>
      <section className="section dark-section"><div className="container"><div className="dark-section-top"><SectionHeading eyebrow="NON-BYPASSABLE BY DESIGN" title="Twelve stages. One accountable path." description="The Java runtime defines a fixed order. A mandatory stage that is not bound prevents startup—rather than silently removing a protection."/><Link className="btn btn-light" href="/how-it-works">Walk through the flow <ArrowUpRight size={17}/></Link></div>
        <div className="stage-grid">{stages.map((stage,i)=><div key={stage} className="stage-tile"><span>{String(i+1).padStart(2,"0")}</span><strong>{stage}</strong></div>)}</div>
        <p className="dark-disclaimer">Real stage names from the Java Data Plane. Actual enforcement depends on configured policies and adapters.</p>
      </div></section>
      <section className="section section-white"><div className="container"><SectionHeading eyebrow="BUILT FOR REAL APPLICATIONS" title="Your business logic stays yours." description="Use your existing LLM tools. Let Reliability Gateway own the model-call boundary, not the decisions only your business can make."/>
        <div className="usecase-grid"><Link href="/solutions#insurance" className="usecase-card"><span className="eyebrow">INSURANCE</span><h3>Claims processing you can explain.</h3><p>Your app retrieves policies and evaluates claims. The gateway handles access, response structure, streams, and usage.</p><span className="text-link">Explore workflow <ArrowUpRight size={17}/></span></Link><Link href="/solutions#support" className="usecase-card"><span className="eyebrow">CUSTOMER SUPPORT</span><h3>Customer answers with better control.</h3><p>Use RAG and CRM context for helpful replies, with a consistent model request path underneath.</p><span className="text-link">Explore workflow <ArrowUpRight size={17}/></span></Link></div>
      </div></section>
      <TrustBanner />
      <BrandGallery />
      <section className="section section-ice"><div className="container developer-teaser"><div><span className="eyebrow">FOR BUILDERS</span><h2>Built for engineers who care how systems behave.</h2><p>Java backend. Clear contracts. Real integration tests. A growing API surface designed around reliable execution—not inflated feature claims.</p><div className="hero-actions"><Link className="btn btn-dark" href="/docs"><Code2 size={18}/> Read developer docs</Link><Link className="btn btn-outline" href="/login"><Box size={18}/> Open console</Link></div></div><div className="code-surface"><div className="code-surface-bar"><i/><i/><i/><span>gateway / request path</span></div><pre>{`POST /v1/chat/completions\n\nIngress       → ACCEPTED\nAuthentication→ VERIFIED\nGovernance    → ALLOWED\nProvider      → COMPLETED\nStreamGuard   → COMPLETE\nSchemaLock    → VALID\nMetering      → RECORDED\n\n// Illustration, not live output`}</pre></div></div></section>
      <section className="cta-band"><div className="container cta-band-inner"><div><span className="eyebrow">BUILD WITH CONFIDENCE</span><h2>Give your AI an accountable foundation.</h2><p>Explore the platform, understand the architecture, and connect the Java gateway when you are ready.</p></div><Link className="btn btn-light btn-lg" href="/how-it-works">Explore the architecture <ArrowUpRight size={18}/></Link></div></section>
    </>
  );
}
