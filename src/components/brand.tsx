import Image from "next/image";
import Link from "next/link";

export function Brand({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link href="/" aria-label="Reliability Gateway home" className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark brand-mark-image" aria-hidden="true">
        <Image src="/brand/rg-icon.png" alt="" width={42} height={42} priority />
      </span>
      <span className="brand-wordmark">
        <strong>Reliability</strong><span>Gateway{compact ? "" : "."}</span>
      </span>
    </Link>
  );
}
