// TODO: replace placeholders with real values.
export const about = {
  summary:
    "I'm a full-stack engineer who loves building AI and SaaS products end to end, from frontend and backend to DevOps. I care about reliable systems and intuitive user experiences, and I thrive in fast-moving teams.",
  focus: "Generative AI, multi-tenant SaaS",
  currently: "Building an AI-powered platform",
  basedIn: "Philippines · open to remote",
};

export type StackItem = { name: string; primary?: boolean };
export type StackGroup = { label: string; items: StackItem[] };

/** `primary` = main tools, shown highlighted. */
export const stack: StackGroup[] = [
  {
    label: "languages",
    items: [
      { name: "TypeScript", primary: true },
      { name: "Python", primary: true },
      { name: "SQL" },
    ],
  },
  {
    label: "frontend",
    items: [
      { name: "Next.js", primary: true },
      { name: "React" },
      { name: "Tailwind" },
      { name: "Three.js" },
    ],
  },
  {
    label: "backend",
    items: [
      { name: "Node.js" },
      { name: "FastAPI", primary: true },
      { name: "Prisma" },
      { name: "tRPC" },
    ],
  },
  {
    label: "ai",
    items: [
      { name: "LLM APIs", primary: true },
      { name: "RAG" },
      { name: "Agents" },
      { name: "Vector DBs" },
    ],
  },
  {
    label: "data",
    items: [{ name: "PostgreSQL" }, { name: "Redis" }, { name: "Supabase" }],
  },
  {
    label: "infra",
    items: [
      { name: "Docker" },
      { name: "GitHub Actions" },
      { name: "Cloudflare" },
      { name: "GCP" },
    ],
  },
];
