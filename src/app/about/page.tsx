import type { Metadata } from "next";
import { PageIntro } from "@/components/sections";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <PageIntro title="About" description="Content coming soon." />;
}
