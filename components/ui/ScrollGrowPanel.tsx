"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-scale reveal: the panel starts small + slightly lowered + dimmed, then
 * grows to full size and full opacity as it scrolls up into view — settling
 * completely visible once centred. (Layout size is unaffected — `scale` is a
 * visual transform — so there's no reflow/jump.)
 *
 * Respects prefers-reduced-motion (renders static at full size).
 */
export function ScrollGrowPanel({
  children,
  className,
  from = 0.9,
}: {
  children: ReactNode;
  className?: string;
  /** Starting scale before it grows to 1. */
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 45%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [56, 0]);

  return (
    <div ref={ref}>
      <motion.div
        style={reduce ? undefined : { scale, opacity, y }}
        className={cn("origin-center will-change-transform", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
