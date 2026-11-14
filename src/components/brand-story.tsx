import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="section section-white brand-story-section">
      <div className="container brand-story-grid">
        <div className="brand-story-media">
          <Image
            src="/media/team-strategy.jpg"
            alt="Cross-functional professionals discussing product strategy together at a meeting table"
            fill
            sizes="(max-width: 900px) 100vw, 56vw"
            className="brand-story-photo"
          />
          <span className="brand-story-photo-note">Strong AI operations start with shared context.</span>
        </div>
        <div className="brand-story-content">
          <span className="eyebrow">REAL TEAMS. REAL RESPONSIBILITY.</span>
          <h2>When an AI response fails, your team deserves a clear answer.</h2>
          <p>
            Product, engineering, and security need to see the same request outcome.
            Reliability Gateway is built around a consistent execution boundary, so
            teams can investigate errors without guessing where the check happened.
          </p>
          <div className="brand-signature">
            <Image
              src="/brand/reliability-gateway-wordmark.png"
              alt="Reliability Gateway official wordmark"
              width={1000}
              height={344}
              sizes="(max-width: 900px) 70vw, 310px"
            />
          </div>
          <Link className="text-link" href="/how-it-works">
            See how the execution path works <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TrustBanner() {
  return (
    <section className="trust-banner" aria-labelledby="trust-banner-title">
      <div className="container trust-banner-content">
        <span className="eyebrow">BUILT FOR LONG-TERM TRUST</span>
        <h2 id="trust-banner-title">Confidence comes from the checks behind every response.</h2>
        <p>
          Your application owns the customer experience. The gateway provides an
          enforceable place for provider access, response integrity, and operational evidence.
        </p>
        <Link href="/platform" className="btn btn-light">
          Explore the platform <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
