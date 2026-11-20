import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { plexSans, plexMono } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { Header, Footer, Background, MoonSky } from "@/components/layout";
import { MotionProvider } from "@/components/motion";
import { ThemeProvider } from "@/components/theme";

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  icons: { icon: { url: "/image/web-icon.svg", type: "image/svg+xml" } },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // next-themes sets the theme class before hydration
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        plexSans.variable,
        plexMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Background />
          <MotionProvider>
            <Header />
            {/* Shared night sky; stays mounted across page navigation. */}
            <MoonSky />
            <main className="flex-1">{children}</main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
