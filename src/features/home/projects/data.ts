// TODO: replace placeholders with real projects.
export const intro =
  "Products and platforms I've designed and shipped, spanning AI tools, SaaS and consumer apps.";

export const PROJECT_TYPES = ["company", "personal"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export type Project = {
  title: string;
  year: number;
  type: ProjectType;
  featured?: boolean;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
  /** Path in /public. Falls back to a placeholder tile when unset. */
  image?: string;
};

/** Newest first. Numbers (01, 02…) follow this order. */
export const projects: Project[] = [
  {
    title: "Career AI Platform",
    year: 2025,
    type: "company",
    summary:
      "An AI-powered career and education platform with interactive work simulations, voice interview practice and automated job discovery.",
    stack: ["Next.js", "Prisma", "Inngest", "Voice AI", "LLM"],
    links: [{ label: "live", href: "https://example.com" }],
  },
  {
    title: "Creative Studio",
    year: 2025,
    type: "company",
    featured: true,
    summary:
      "An AI creative studio with guided workflows for generating images, video and audio, with centralized prompt and asset management.",
    stack: ["Next.js", "Supabase", "Trigger.dev", "Cloudflare"],
    links: [{ label: "live", href: "https://example.com" }],
  },
  {
    title: "All-in-one Toolkit",
    year: 2024,
    type: "personal",
    summary:
      "A personal toolkit that brings together the tools I use daily for life and work.",
    stack: ["React", "Tailwind", "Supabase"],
    links: [
      { label: "live", href: "https://example.com" },
      { label: "source", href: "https://github.com/" },
    ],
  },
  {
    title: "Support Copilot",
    year: 2024,
    type: "company",
    summary:
      "An internal assistant that drafts replies for support agents using RAG over the help center and past tickets.",
    stack: ["FastAPI", "PostgreSQL", "RAG", "LLM APIs"],
    links: [{ label: "live", href: "https://example.com" }],
  },
  {
    title: "Habit Tracker",
    year: 2023,
    type: "personal",
    summary:
      "A minimal habit tracker with streaks, reminders and an offline-first sync engine.",
    stack: ["Next.js", "Drizzle", "SQLite"],
    links: [{ label: "source", href: "https://github.com/" }],
  },
];
