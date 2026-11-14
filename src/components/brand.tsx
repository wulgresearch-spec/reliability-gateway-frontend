import Link from "next/link";

export function Brand({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link href="/" aria-label="Reliability Gateway home" className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 36 36" fill="none" role="presentation">
          <path d="M4 20H11L16 10L22 27L27 18H32" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="20" r="2" fill="currentColor" />
          <circle cx="27" cy="18" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-wordmark"><strong>reliability</strong><span>gateway{compact ? "" : "."}</span></span>
    </Link>
  );
}
