"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Green-only palette for the pixel grid (no gradients).
const shades = ["#4e8f52", "#3e7242", "#2c5331", "#6fae73", "#bfd8c1", "#f4f7f4"];

// Deterministic pattern (8 cols × 4 rows) — fixed so SSR and client match.
const pattern = [
  [0, 1, 0, 4, 3, 0, 1, 2],
  [3, 0, 4, 1, 0, 2, 0, 1],
  [1, 2, 0, 0, 5, 1, 3, 0],
  [0, 3, 1, 5, 0, 0, 1, 4],
];

const cols = pattern[0].length;
const rows = pattern.length;

/**
 * Bottom-left hero visual: a flat green "pixel" mosaic with a subtle, contained
 * scroll parallax (never overflows its block). Respects reduced motion.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative h-full min-h-[34vh] w-full overflow-hidden bg-[#2c5331]">
      <motion.div
        className="absolute inset-x-0 -top-[8%] grid h-[116%]"
        style={{
          y,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {pattern.flatMap((row, r) =>
          row.map((s, c) => <div key={`${r}-${c}`} style={{ backgroundColor: shades[s] }} />),
        )}
      </motion.div>

      {/* Decorative diamond */}
      <div
        aria-hidden
        className="absolute right-[12%] top-[14%] size-12 rotate-45 bg-[#3e7242] shadow-sm"
      />

      {/* Technical labels — mix-blend keeps them legible over any tile */}
      <span className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-white mix-blend-difference">
        Enterprise AI
      </span>
      <span className="absolute right-4 top-4 font-mono text-xs uppercase tracking-widest text-white mix-blend-difference">
        In production
      </span>

      {/* Brand mark */}
      <Image
        src="/images/logo-icon.png"
        alt=""
        width={235}
        height={225}
        className="absolute bottom-4 right-4 h-9 w-auto drop-shadow"
      />
    </div>
  );
}
