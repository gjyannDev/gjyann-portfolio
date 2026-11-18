"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
};

/** Fade + rise. Use alone, or as a child of <Stagger> (it inherits the timing). */
export function Reveal({ inView, ...props }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      {...(inView
        ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : {})}
      {...props}
    />
  );
}

type StaggerProps = HTMLMotionProps<"div"> & {
  delay?: number;
  gap?: number;
  inView?: boolean;
};

/** Container that staggers its <Reveal> children. */
export function Stagger({ delay = 0, gap = 0.08, inView, ...props }: StaggerProps) {
  return (
    <motion.div
      variants={stagger(delay, gap)}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : { animate: "show" })}
      {...props}
    />
  );
}
