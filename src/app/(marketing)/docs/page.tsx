import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, LockKeyhole, Terminal, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
export const metadata: Metadata = { title: "Developers" };
const source="https://github.com/wulgresearch-spec/dataplane-gateway";
const resources=[
  { title:"Architecture", desc:"Read the Java Data Plane runtime execution sequence.", url:`${source}/blob/develop/docs/32-RuntimeExecutionSequence.md` },
  { title:"Repository README", desc:"Explore implemented features, limitations, and how to run the backend.", url:`${source}/blob/develop/README.md` },
  { title:"SchemaLock & StreamGuard", desc:"Understand structural output validation and streaming integrity.", url:`${source}/blob/develop/docs/17-SchemaLock.md` },
  { title:"GitHub source", desc:"Inspect source code, test suites and development activity.", url:source },
];
export default function DocsPage(){return <><section className="subpage-hero"><div className="container"><span className="eyebrow">DEVELOPERS</span><h1>Understand the system.<br/><span>Build with confidence.</span></h1><p>The backend is an actively developed Java 21 project. Start with its public documentation and use the operator console for local integration tests.</p><Link href={source} target="_blank" rel="noreferrer" className="btn btn-dark"><Github size={18}/> Browse backend repository <ArrowUpRight size={17}/></Link></div></section>
<section className="section section-white"><div className="container"><SectionHeading eyebrow="START HERE" title="Built for engineers who want the details."/><div className="resource-grid">{resources.map(({title,desc,url},i)=><a key={title} href={url} target="_blank" rel="noreferrer" className="resource-card"><span className="resource-index">{String(i+1).padStart(2,"0")} / RESOURCE</span><h3>{title}</h3><p>{desc}</p><span>Open resource <ArrowUpRight size={15}/></span></a>)}</div></div></section>
<section className="section section-ice"><div className="container"><SectionHeading eyebrow="CONNECT YOUR LOCAL BACKEND" title="A straightforward developer workflow." description="Start the existing Java gateway first, then point this frontend's private server-side API proxy at that instance."/><div className="docs-snippet"><div className="code-surface-bar"><i/><i/><i/><span>Terminal</span></div><pre>{`# In the Java repository\ncd backend\nmvn -B verify\n\n# Start the backend with your own provider configuration\n./run-gateway.sh\n\n# In the frontend repository\ncp .env.example .env.local\nnpm install\nnpm run dev`}</pre></div><div className="tip-line"><LockKeyhole size={19}/><p>Never put the provider API key or your Java gateway token in client-side variables or JavaScript bundles. The BFF sends credentials server-to-server.</p></div></div></section>
<section className="section section-white"><div className="container mini-links"><Link href="/login"><Terminal/> Open protected console <ArrowUpRight size={16}/></Link><Link href="/how-it-works"><Workflow/> Read the request flow <ArrowUpRight size={16}/></Link></div></section></>}
