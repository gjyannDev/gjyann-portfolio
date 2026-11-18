"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { siteConfig, type NavItem } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { transition } from "@/lib/motion";

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
        "relative h-9 rounded-full px-3 text-[13px] sm:px-4 sm:text-sm",
        "focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:border-transparent",
        active
          ? "text-brand hover:bg-transparent hover:text-brand"
          : "text-muted hover:bg-hover hover:text-text",
      )}
    >
      <Link href={item.href} aria-current={active ? "page" : undefined}>
        {active && (
          // Shared layoutId: the pill slides between links on navigation.
          <motion.span
            layoutId="nav-active"
            transition={transition}
            className="absolute inset-0 -z-10 rounded-full bg-brand/12"
          />
        )}
        {item.label}
      </Link>
    </Button>
  );
}

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="isolate flex items-center gap-1">
      {siteConfig.nav.map((item) => (
        <li key={item.href}>
          <NavLink item={item} active={isActive(pathname, item.href)} />
        </li>
      ))}
    </ul>
  );
}
