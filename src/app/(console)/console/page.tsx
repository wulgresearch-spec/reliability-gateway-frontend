import type { Metadata } from "next";
import { GatewayOverview } from "@/components/gateway-status";
export const metadata: Metadata = { title: "Console overview", robots: { index: false } };
export default function OverviewPage(){return <GatewayOverview/>}
