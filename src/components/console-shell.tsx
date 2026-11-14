"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, ArrowUpRight, BookOpen, ChevronDown, CircleHelp, Gauge, Layers3, LogOut, MessageSquareText, ShieldCheck, Waypoints } from "lucide-react";
import { Brand } from "@/components/brand";
import { useState } from "react";

const nav = [
  { href: "/console", title: "Overview", icon: Gauge },
  { href: "/console/playground", title: "API Playground", icon: MessageSquareText },
  { href: "/console/health", title: "Gateway Health", icon: Activity },
  { href: "/console/roadmap", title: "Upcoming modules", icon: Layers3 },
];

export function ConsoleShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    try { await fetch("/api/auth/logout", { method: "POST" }); } finally { router.replace("/login"); router.refresh(); setBusy(false); }
  }
  return (
    <div className="console-layout">
      <aside className="console-sidebar">
        <div className="console-brand"><Brand light /></div>
        <div className="workspace-switch"><span className="workspace-avatar">RG</span><div><strong>Local workspace</strong><span>Operator preview</span></div><ChevronDown size={17}/></div>
        <p className="sidebar-label">WORKSPACE</p>
        <nav className="sidebar-menu" aria-label="Console navigation">
          {nav.map(({ href, title, icon: Icon }) => <Link key={href} className={pathname === href ? "active" : ""} href={href}><Icon size={18}/>{title}{pathname === href && <span className="nav-active-dot" />}</Link>)}
        </nav>
        <p className="sidebar-label sidebar-secondary-label">RESOURCES</p>
        <nav className="sidebar-menu" aria-label="Console resources">
          <Link href="/docs"><BookOpen size={18}/> Documentation <ArrowUpRight size={13}/></Link>
          <a href="https://github.com/wulgresearch-spec/dataplane-gateway" target="_blank" rel="noreferrer"><Waypoints size={18}/> Java backend <ArrowUpRight size={13}/></a>
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-help"><span><CircleHelp size={19}/></span><strong>Need a hand?</strong><p>Read the setup and integration guide.</p><Link href="/docs">Open docs <ArrowUpRight size={14}/></Link></div>
        <button type="button" className="sidebar-logout" onClick={logout} disabled={busy}><LogOut size={17}/>{busy ? "Signing out..." : "Sign out"}</button>
      </aside>
      <div className="console-main"><header className="console-topbar"><div><span className="console-breadcrumb">Workspace</span><span className="console-breadcrumb-divider">/</span><span className="console-breadcrumb-current">{nav.find(x=>x.href===pathname)?.title ?? "Console"}</span></div><div className="console-top-actions"><span className="operator-badge"><ShieldCheck size={15}/> Operator session</span><Link href="/" target="_blank" className="console-view-site">View website <ArrowUpRight size={15}/></Link></div></header><div className="console-content">{children}</div></div>
    </div>
  );
}
