import type { Metadata } from "next";
import { Playground } from "@/components/playground";
export const metadata: Metadata = { title: "API Playground", robots: { index: false } };
export default function PlaygroundPage(){return <Playground/>}
