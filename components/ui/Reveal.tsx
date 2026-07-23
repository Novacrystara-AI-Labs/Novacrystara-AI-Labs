"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-in reveal wrapper (arch §6.3, §7).
 *
 * Deliberately understated: a short lift and a long, decelerating fade, so
 * content *settles* into place instead of popping. Use it for a section's
 * heading and for one composed content block — not for every child. Stacking
 * many small reveals is what makes a page feel busy rather than premium.
 *
 * Fires once; respects `prefers-reduced-motion` (renders statically).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
