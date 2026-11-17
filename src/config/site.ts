export const siteConfig = {
  name: "gjyann",
  title: "gjyann — Portfolio",
  description: "Personal portfolio of gjyann.",
  nav: [
    { label: "Home", href: "/" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
