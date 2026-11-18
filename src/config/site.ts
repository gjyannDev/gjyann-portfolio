export const siteConfig = {
  name: "gjyann",
  title: "gjyann — Portfolio",
  description: "Personal portfolio of gjyann.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type NavItem = SiteConfig["nav"][number];

export type ProfileLink = { label: string; href: string; primary?: boolean };

export type Profile = {
  name: string;
  handle: string;
  /** Path in /public. Falls back to initials when unset. */
  avatar?: string;
  tags: string[];
  experience: string;
  projects: string;
  location: string;
  status: { label: string; available: boolean };
  links: ProfileLink[];
};

// TODO: replace placeholders with real values.
export const profile: Profile = {
  name: "Mark Ghian Francis",
  handle: "gjyannDev",
  tags: ["full-stack", "ai-engineer"],
  experience: "6 months",
  projects: "12 shipped · 4 industries",
  location: "Philippines · UTC+8",
  status: { label: "Open to work", available: true },
  links: [
    { label: "github", href: "https://github.com/gjyannDev" },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/in/gjyanndev/",
      primary: true,
    },
    { label: "resume", href: "/resume.pdf" },
  ],
};
