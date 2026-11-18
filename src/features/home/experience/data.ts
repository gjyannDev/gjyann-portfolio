// TODO: replace placeholders with real values.
export const intro =
  "Building across AI engineering and full-stack development, from internal platforms to products shipped for startups.";

export type Role = {
  title: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM"; omit for a current role. */
  end?: string;
  summary: string;
  skills: string[];
};

export type Company = {
  name: string;
  /** Short label for the timeline badge, e.g. "C1". */
  badge: string;
  type: string;
  location?: string;
  roles: Role[];
};

/** Newest first, both companies and roles. */
export const companies: Company[] = [
  {
    name: "Company One",
    badge: "C1",
    type: "Full-time",
    roles: [
      {
        title: "Lead AI Engineer",
        start: "2025-08",
        summary:
          "Driving AI initiatives and system-level solutions across key areas of the business, focused on scalable and secure delivery.",
        skills: [
          "Generative AI",
          "LLM APIs",
          "Python",
          "FastAPI",
          "PostgreSQL",
        ],
      },
    ],
  },
  {
    name: "Company Two",
    badge: "C2",
    type: "Full-time",
    location: "Makati, Philippines · Hybrid",
    roles: [
      {
        title: "AI Ops Engineer",
        start: "2025-02",
        end: "2025-08",
        summary:
          "Pioneered the GenAI centre of excellence to deliver scalable AI solutions, with CI/CD pipelines and centralized observability.",
        skills: ["AWS", "Docker", "RAG"],
      },
      {
        title: "Software Engineer",
        start: "2024-06",
        end: "2025-02",
        summary:
          "Built internal tools and APIs used by support and operations teams.",
        skills: ["Next.js", "Node.js", "PostgreSQL"],
      },
    ],
  },
  {
    name: "Freelance",
    badge: "FL",
    type: "Self-employed",
    roles: [
      {
        title: "Full-stack Developer",
        start: "2020-01",
        end: "2024-05",
        summary:
          "Shipped products for startups, from landing pages to multi-tenant SaaS platforms.",
        skills: ["React", "Next.js", "Tailwind", "Supabase"],
      },
    ],
  },
];

/* ---------- date helpers ---------- */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parse(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return { y, m };
}

/** "2025-08" → "Aug 2025"; undefined → "Present". */
export function formatMonth(ym?: string) {
  if (!ym) return "Present";
  const { y, m } = parse(ym);
  return `${MONTHS[m - 1]} ${y}`;
}

function currentMonth(now: Date) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

/** Inclusive month count, LinkedIn-style: "4 mos", "1 yr 2 mos". */
export function formatDuration(
  start: string,
  end: string | undefined,
  now: Date,
) {
  const a = parse(start);
  const b = parse(end ?? currentMonth(now));
  const total = (b.y - a.y) * 12 + (b.m - a.m) + 1;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts = [
    yrs && `${yrs} yr${yrs > 1 ? "s" : ""}`,
    mos && `${mos} mo${mos > 1 ? "s" : ""}`,
  ].filter(Boolean);
  return parts.join(" ") || "1 mo";
}

/** Span of all roles: oldest start → newest end (or present). */
export function companySpan(roles: Role[]) {
  const start = roles.map((r) => r.start).sort()[0];
  const end = roles.some((r) => !r.end)
    ? undefined
    : roles
        .map((r) => r.end!)
        .sort()
        .at(-1);
  return { start, end };
}
