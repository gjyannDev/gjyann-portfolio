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
  location: string;
  /** IANA zone for the live clock in the location row, plus its short label. */
  timeZone: { id: string; label: string };
  status: { label: string; available: boolean };
  links: ProfileLink[];
};

export const profile: Profile = {
  name: "Mark Ghian Francis",
  handle: "gjyannDev",
  avatar: "/image/avatar_profile.png",
  tags: ["full-stack", "ai-engineer"],
  location: "Philippines",
  timeZone: { id: "Asia/Manila", label: "UTC+8" },
  status: { label: "Open to work", available: true },
  links: [
    { label: "github", href: "https://github.com/gjyannDev" },
    { label: "linkedin", href: "https://www.linkedin.com/in/gjyanndev/" },
    { label: "resume", href: "/pdf/mark-ghian-resume.pdf", primary: true },
  ],
};
