import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { plexSans, plexMono } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { Header, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-sans", plexSans.variable, plexMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
