import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/components/brand";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Brand />
      <p className="eyebrow">404 / PATH NOT FOUND</p>
      <h1>This route doesn’t exist.</h1>
      <p>Try the platform overview or return to the homepage.</p>
      <Link className="btn btn-dark" href="/"><ArrowLeft size={17} /> Back to home</Link>
    </main>
  );
}
