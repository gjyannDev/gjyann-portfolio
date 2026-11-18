import type { Metadata } from "next";
import { About } from "@/features/home/about";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="pt-12">
      <About titleAs="h1" />
    </div>
  );
}
