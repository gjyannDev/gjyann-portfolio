import type { Metadata } from "next";
import { Experience } from "@/features/home/experience";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return <Experience titleAs="h1" />;
}
