import type { Metadata } from "next";
import { PageIntro } from "@/components/sections";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return <PageIntro title="Projects" description="Content coming soon." />;
}
