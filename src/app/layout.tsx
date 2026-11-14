import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Reliability Gateway | Enterprise AI Infrastructure",
    template: "%s | Reliability Gateway",
  },
  description:
    "One reliable boundary for model access, policy enforcement, resilient execution, output integrity, and accountable AI usage.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Reliability Gateway | Enterprise AI Infrastructure",
    description: "One reliable boundary for model access, policy enforcement, resilient execution and accountable AI usage.",
    images: [{ url: "/media/team-strategy.jpg", width: 1672, height: 941, alt: "Reliability Gateway: business and technical teams planning together" }],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
