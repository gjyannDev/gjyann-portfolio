import type { Metadata } from "next";
import { Projects } from "@/features/home/projects";
import { GitHubActivity } from "@/features/home/github";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="pt-12">
      <Projects titleAs="h1" />
      <GitHubActivity />
    </div>
  );
}
