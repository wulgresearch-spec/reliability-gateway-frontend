import type { Metadata } from "next";
import { HealthDetail } from "@/components/health-detail";
export const metadata: Metadata = { title: "Gateway health", robots: { index: false } };
export default function HealthPage(){return <HealthDetail/>}
