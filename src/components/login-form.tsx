"use client";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (!response.ok) {
        const body: unknown = await response.json().catch(() => ({}));
        const message = typeof body === "object" && body !== null && "error" in body && typeof body.error === "string" ? body.error : "Unable to sign in";
        throw new Error(message);
      }
      router.replace("/console"); router.refresh();
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Could not sign in"); setBusy(false); }
  }
  return <form onSubmit={submit} className="login-form"><label htmlFor="password">Operator access password</label><div className="password-field"><LockKeyhole size={18}/><input id="password" autoComplete="current-password" value={password} onChange={event=>setPassword(event.target.value)} type={showPassword ? "text":"password"} placeholder="Enter your access password" minLength={1} required/><button type="button" aria-label={showPassword?"Hide password":"Show password"} onClick={()=>setShowPassword(s=>!s)}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>{error && <p className="inline-error" role="alert">{error}</p>}<button type="submit" disabled={busy} className="btn btn-dark login-submit">{busy?"Verifying...":"Access console"}<ArrowRight size={17}/></button><p className="login-hint">This preview uses a server-side single-operator password. Configure <code>DASHBOARD_ACCESS_PASSWORD</code> and <code>DASHBOARD_SESSION_SECRET</code> in your local environment.</p></form>;
}
