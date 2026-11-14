import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

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
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
