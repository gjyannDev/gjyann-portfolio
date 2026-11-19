import type { Metadata } from "next";
import { About } from "@/features/home/about";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <About titleAs="h1" />;
}
