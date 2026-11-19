"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { flushSync } from "react-dom";
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

  /** Switch theme with a circular reveal from the button (View Transitions API). */
  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next = isLight ? "dark" : "light";
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    // Distance to the farthest corner, so the circle covers the viewport.
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() =>
      flushSync(() => setTheme(next)),
    );
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${r}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

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
      onClick={toggle}
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
