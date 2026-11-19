export const intro =
  "Building across full-stack web, mobile and AI, from internal business systems to an AI-powered CRM shipped on iOS and Android.";

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
    name: "Appquant Technologies Inc.",
    badge: "AQ",
    type: "Full-time",
    location: "Makati City, Philippines",
    roles: [
      {
        title: "Software Developer",
        start: "2026-09",
        end: "2026-11",
        summary:
          "Built Moonbreak's React Native app end to end, an AI-powered CRM with RevenueCat payments and an AI agent chat, extended its mobile API layer, and shipped release builds to TestFlight and Google Play internal testing.",
        skills: ["React Native", "Expo", "Next.js", "RevenueCat", "AI Agents"],
      },
    ],
  },
  {
    name: "Richtek Solutions Inc.",
    badge: "RS",
    type: "Full-time",
    location: "San Juan City, Philippines",
    roles: [
      {
        title: "Junior Full Stack Developer",
        start: "2026-06",
        end: "2026-08",
        summary:
          "Developed full-stack features with Laravel, Next.js and MySQL, and built Docker dev environments and CI/CD pipelines automating unit, integration, end-to-end, performance, SAST and AI security testing.",
        skills: [
          "Laravel",
          "Next.js",
          "Tailwind CSS",
          "MySQL",
          "Docker",
          "CI/CD",
        ],
      },
      {
        title: "Full Stack Developer Intern",
        start: "2026-03",
        end: "2026-05",
        summary:
          "Built full-stack features with Laravel, Next.js and MySQL, created responsive sites and content workflows with WordPress, Elementor and Payload CMS, and debugged application issues to improve stability and user experience.",
        skills: [
          "Laravel",
          "Next.js",
          "Tailwind CSS",
          "MySQL",
          "WordPress",
          "Payload CMS",
        ],
      },
    ],
  },
  {
    name: "JFE Techno Manila Inc.",
    badge: "JFE",
    type: "Internship",
    location: "Ortigas City, Philippines",
    roles: [
      {
        title: "Software Engineer Intern",
        start: "2025-02",
        end: "2025-11",
        summary:
          "Built core workflows, backend logic and database integration for the company's internal MBI system, working in an Agile team through sprint planning, stand-ups and backlog refinement.",
        skills: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
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

/** Inclusive month count from start to end (or the current month). */
function monthsBetween(start: string, end: string | undefined, now: Date) {
  const a = parse(start);
  const b = parse(end ?? currentMonth(now));
  return (b.y - a.y) * 12 + (b.m - a.m) + 1;
}

/** Months worked across every role; gaps between roles don't count. */
export function totalExperienceMonths(now: Date) {
  return companies
    .flatMap((c) => c.roles)
    .reduce((sum, r) => sum + monthsBetween(r.start, r.end, now), 0);
}

/** Month count, LinkedIn-style: "4 mos", "1 yr 2 mos". */
export function formatMonths(total: number) {
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts = [
    yrs && `${yrs} yr${yrs > 1 ? "s" : ""}`,
    mos && `${mos} mo${mos > 1 ? "s" : ""}`,
  ].filter(Boolean);
  return parts.join(" ") || "1 mo";
}

/** Inclusive duration of one role, e.g. "3 mos". */
export function formatDuration(
  start: string,
  end: string | undefined,
  now: Date,
) {
  return formatMonths(monthsBetween(start, end, now));
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
