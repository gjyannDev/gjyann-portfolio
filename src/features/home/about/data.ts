// TODO: replace placeholders with real values.
export const about = {
  summary:
    "Full-stack engineer who enjoys the whole product lifecycle: designing intuitive UIs, building robust and scalable APIs, and writing clean, readable, well-tested code that holds up in production. I'm drawn to AI and SaaS, and I work best in fast-moving teams that value ownership.",
  focus: "Generative AI, LLM Applications, Multi-Tenant SaaS",
  currently: "Going deeper into LLM applications and agentic AI",
  basedIn: "Philippines · open to remote",
};

export type StackItem = { name: string; primary?: boolean };
export type StackGroup = { label: string; items: StackItem[] };

/** `primary` = main tools, shown highlighted. */
export const stack: StackGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "TypeScript", primary: true },
      { name: "JavaScript" },
      { name: "Next.js", primary: true },
      { name: "React" },
      { name: "React Native", primary: true },
      { name: "Expo" },
      { name: "NativeWind" },
      { name: "React Native Reusables" },
      { name: "Vue" },
      { name: "Tailwind CSS" },
      { name: "SCSS" },
      { name: "Styled Components" },
      { name: "shadcn/ui" },
      { name: "Framer Motion" },
      { name: "Vite" },
      { name: "Webpack" },
      { name: "ESLint" },
      { name: "Prettier" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Python", primary: true },
      { name: "PHP" },
      { name: "SQL" },
      { name: "FastAPI", primary: true },
      { name: "Laravel" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "JWT" },
      { name: "Redis" },
      { name: "Agenda" },
    ],
  },
  {
    label: "AI & LLM",
    items: [
      { name: "LLM Integration", primary: true },
      { name: "RAG" },
      { name: "AI Agents" },
      { name: "MCP" },
      { name: "Langfuse" },
      { name: "Deepgram" },
      { name: "Claude Code" },
      { name: "Codex" },
      { name: "Google AI Studio" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Supabase" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Docker" },
      { name: "GitHub Actions" },
      { name: "CI/CD" },
      { name: "Vercel" },
      { name: "Cloudflare" },
      { name: "VPS" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "WordPress" },
      { name: "Payload CMS" },
      { name: "Figma" },
      { name: "Postman" },
      { name: "Swagger" },
      { name: "k6" },
      { name: "Zeplin" },
    ],
  },
];
