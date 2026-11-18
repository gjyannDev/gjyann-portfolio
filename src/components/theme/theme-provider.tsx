"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Dark by default; light theme adds `class="light"` on <html> (see globals.css). */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
