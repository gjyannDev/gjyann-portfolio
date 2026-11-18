"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Both icons render; CSS picks one via the `.light` class, so there is no
 * hydration flash and no mounted-state check.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className={cn(
        "rounded-full border-line text-muted hover:bg-hover hover:text-text",
        "focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:border-transparent",
        className,
      )}
    >
      <Moon className="in-[.light]:hidden" />
      <Sun className="hidden in-[.light]:block" />
    </Button>
  );
}
