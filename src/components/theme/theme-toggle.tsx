"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

const noop = () => () => {};
/** false during SSR + hydration, true after; avoids a theme mismatch. */
const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isLight = resolvedTheme === "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      // Theme is unknown on the server; use a neutral label until mounted.
      aria-label={
        !mounted
          ? "Toggle theme"
          : isLight
            ? "Switch to dark theme"
            : "Switch to light theme"
      }
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={cn(
        "relative overflow-hidden rounded-full border-line text-muted hover:bg-hover hover:text-text",
        "focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:border-transparent",
        className,
      )}
    >
      {mounted ? (
        // initial={false}: no animation on first paint, only on toggle.
        // Both icons share one grid cell while crossfading.
        <span className="grid">
          <AnimatePresence initial={false}>
            <motion.span
              key={isLight ? "sun" : "moon"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease }}
              className="col-start-1 row-start-1 flex"
            >
              {isLight ? <Sun /> : <Moon />}
            </motion.span>
          </AnimatePresence>
        </span>
      ) : (
        // Pre-hydration: CSS picks the icon from the `.light` class, so no flash.
        <>
          <Moon className="in-[.light]:hidden" />
          <Sun className="hidden in-[.light]:block" />
        </>
      )}
    </Button>
  );
}
