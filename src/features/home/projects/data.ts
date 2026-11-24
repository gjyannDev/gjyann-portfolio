export const intro =
  "Products and platforms I've built and shipped, spanning AI tools, mobile apps and e-commerce.";

export const PROJECT_TYPES = ["company", "personal", "academic"] as const;
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
    title: "Cuewise – AI Mock Interviewer",
    year: 2026,
    type: "personal",
    image: "/image/cuewise_image.png",
    summary:
      "A voice-enabled AI mock interviewer that uses RAG to run resume-aware interviews tailored to a target job, with Deepgram speech-to-text and text-to-speech and Langfuse for LLM evaluation and tracing.",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "RAG",
      "Deepgram",
      "Langfuse",
      "AI Elements",
    ],
    links: [
      { label: "source", href: "https://github.com/gjyannDev/cuewise-be" },
    ],
  },
  {
    title: "Moonbreak – AI Powered CRM (Web)",
    year: 2026,
    type: "company",
    featured: true,
    image: "/image/moonbreak_web_image.png",
    summary:
      "The Moonbreak web platform, an AI-powered CRM where an AI agent handles everyday sales work: AI-assisted calls, AI chat over customer data, quotation generation, and contact and deal management, with Langfuse tracing to monitor agent behavior.",
    stack: [
      "Next.js",
      "TypeScript",
      "AI Agents",
      "LLM Integration",
      "Langfuse",
      "ElevenLabs",
      "Stripe",
      "Vercel",
    ],
    links: [{ label: "live", href: "https://www.moonbreak.com/" }],
  },
  {
    title: "Moonbreak – AI Powered CRM (Mobile)",
    year: 2026,
    type: "company",
    image: "/image/moonbreak_app_image.png",
    summary:
      "The Moonbreak mobile app, built end to end in React Native, bringing the CRM's AI agent chat to iOS and Android with RevenueCat in-app payments and builds shipped to TestFlight and Google Play.",
    stack: ["React Native", "Expo", "RevenueCat", "AI Agents", "Langfuse"],
    links: [{ label: "live", href: "https://www.moonbreak.com/" }],
  },
  {
    title: "MTG Rider Mobile Application",
    year: 2025,
    type: "academic",
    image: "/image/mtg_app_image.png",
    summary:
      "A mobile app for delivery riders to scan orders, view assigned deliveries and manage order status on the go.",
    stack: [
      "React Native",
      "NativeWind",
      "React Native Reusables",
      "Express.js",
    ],
    links: [
      { label: "source", href: "https://github.com/gjyannDev/mtgmeal-mobile" },
    ],
  },
  {
    title: "Full-Stack Meal Plan E-commerce Platform",
    year: 2025,
    type: "academic",
    image: "/image/mtg_web_image.png",
    summary:
      "A meal plan ordering platform with a customer storefront and an admin dashboard for managing subscriptions, orders, inventory and rider tracking, with payments through PayMongo.",
    stack: [
      "React",
      "TanStack",
      "Zustand",
      "Express.js",
      "MongoDB",
      "Agenda",
      "DigitalOcean",
      "PayMongo",
    ],
    links: [
      {
        label: "source",
        href: "https://github.com/gjyannDev/mtgmeal-backend",
      },
    ],
  },
  {
    title: "ReliefX – Volunteer Management System UI/UX Design",
    year: 2025,
    type: "personal",
    image: "/image/reliefx_image.png",
    summary:
      "A UI/UX design for a volunteer management system, built in Figma, where I sharpened my skills in user flows, wireframing, prototyping and interface design.",
    stack: ["Figma", "UI/UX Design", "Prototyping"],
    links: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/217078153/ReliefX-Volunteer-Management-System-UI-UX-Design",
      },
    ],
  },
];
