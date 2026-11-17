import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "./container";

export function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-medium">
          {siteConfig.name}
        </Link>
        <nav className="flex gap-6 text-sm text-muted">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
