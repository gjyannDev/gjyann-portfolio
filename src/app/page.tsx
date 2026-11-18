import { Hero } from "@/features/home/hero";
import { About } from "@/features/home/about";
import { Experience } from "@/features/home/experience";
import { Projects } from "@/features/home/projects";
import { GitHubActivity } from "@/features/home/github";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects limit={4} />
      <GitHubActivity />
    </>
  );
}
