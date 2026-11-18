import type { Transition, Variants } from "motion/react";

/** Shared easing/timing so every animation on the site feels the same. */
export const ease = [0.22, 1, 0.36, 1] as const; // easeOutExpo-ish

export const transition: Transition = { duration: 0.6, ease };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});
