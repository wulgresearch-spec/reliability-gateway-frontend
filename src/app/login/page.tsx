import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Brand } from "@/components/brand";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = { title: "Console login", robots: { index: false, follow: false } };
export default function LoginPage(){return <main className="login-layout"><section className="login-brand-panel"><Brand light/><div className="login-brand-message"><span className="eyebrow">YOUR AI CONTROL CENTER</span><h1>Govern the path.<br/>Trust the process.</h1><p>See your gateway status and test real requests from one deliberate, secure surface.</p><div className="login-brand-foot"><ShieldCheck size={17}/> Enterprise-minded by design</div></div><span className="login-brand-graphic" aria-hidden="true" /></section><section className="login-form-panel"><div className="login-form-wrap"><Link className="back-link" href="/"><ArrowLeft size={17}/> Back to website</Link><div className="login-heading"><span className="eyebrow">OPERATOR CONSOLE</span><h2>Welcome back.</h2><p>Sign in to access your gateway workspace.</p></div><LoginForm/><div className="login-footer"><ShieldCheck size={17}/> Session-only access • Credentials stay server-side</div></div></section></main>}
