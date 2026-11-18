"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, type NavItem } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn(
        "h-9 rounded-full px-3 text-[13px] sm:px-4 sm:text-sm",
        // Simple CSS fade between links; no measured/sliding pill.
        "transition-colors duration-200",
        // Cancel the base Button's 1px press-down nudge.
        "active:not-aria-[haspopup]:translate-y-0",
        "focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:border-transparent",
        active
          ? "bg-brand/12 text-brand hover:bg-brand/12 hover:text-brand"
          : "text-muted hover:bg-hover hover:text-text",
      )}
    >
      <Link href={item.href} aria-current={active ? "page" : undefined}>
        {item.label}
      </Link>
    </Button>
  );
}

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {siteConfig.nav.map((item) => (
        <li key={item.href}>
          <NavLink item={item} active={isActive(pathname, item.href)} />
        </li>
      ))}
    </ul>
  );
}
