import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/solutions", label: "Solutions" },
  { href: "/docs", label: "Developers" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link href="/login" className="header-signin">Console login</Link>
          <Link href="/platform" className="btn btn-dark btn-sm">Explore platform <ArrowUpRight size={16} /></Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><Menu size={22} /></summary>
          <div className="mobile-menu-panel">
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            <Link href="/login">Console login</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
