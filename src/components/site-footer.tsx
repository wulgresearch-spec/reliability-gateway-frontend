import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <Brand light />
          <p>The reliability layer between enterprise applications and AI models.</p>
          <div className="footer-status"><span className="status-dot" /> Engineering preview · Active development</div>
        </div>
        <div><h3>Explore</h3><Link href="/platform">Platform</Link><Link href="/how-it-works">How it works</Link><Link href="/solutions">Solutions</Link></div>
        <div><h3>Developers</h3><Link href="/docs">Documentation</Link><Link href="/login">Console</Link><a href="https://github.com/wulgresearch-spec/dataplane-gateway" target="_blank" rel="noreferrer">Java backend <ArrowUpRight size={13}/></a></div>
        <div><h3>Company</h3><Link href="/contact">Contact & contributions</Link><a href="https://github.com/wulgresearch-spec" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Reliability Gateway. Built for accountable AI.</span><span>Designed for clarity. Engineered for control.</span></div>
    </footer>
  );
}
