"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { methodology } from "@/content/methodology";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Phase } from "@/types";

const phases = methodology.phases;

/**
 * SECTION 6 — Methodology / Approach (arch §5 #6).
 * All phases visible at once: a vertical timeline with big green numbers, a
 * green "beam" that fills with scroll, and nodes that ignite as they enter view.
 */
export function MethodologySection() {
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 65%"],
  });
  const beamScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="approach" className="scroll-mt-24 py-16 md:py-24">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow label="Our Approach" />
          <h2 className="mt-5 text-balance text-h2 font-semibold">{methodology.heading}</h2>
          <p className="mt-4 text-pretty text-lg text-muted">{methodology.intro}</p>
        </Reveal>

        <ol ref={trackRef} className="relative mt-14">
          {/* Track + scroll-fill beam (aligned to the node column centre) */}
          <span
            aria-hidden
            className="absolute bottom-5 left-[5.25rem] top-5 w-px bg-border md:left-[7.5rem]"
          />
          <motion.span
            aria-hidden
            style={reduce ? { scaleY: 1 } : { scaleY: beamScale }}
            className="absolute left-[5.25rem] top-5 h-[calc(100%-2.5rem)] w-px origin-top bg-gradient-to-b from-accent to-accent/40 shadow-[0_0_10px_rgba(78,143,82,0.5)] md:left-[7.5rem]"
          />

          {phases.map((phase, i) => (
            <TimelineRow key={phase.title} phase={phase} index={i} last={i === phases.length - 1} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function TimelineRow({ phase, index, last }: { phase: Phase; index: number; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const active = reduce || inView;
  const num = String(index + 1).padStart(2, "0");

  return (
    <li
      ref={ref}
      className={cn(
        "grid grid-cols-[3.5rem_1.5rem_1fr] items-start gap-x-4 md:grid-cols-[5rem_2rem_1fr] md:gap-x-6",
        last ? "pb-0" : "pb-12 md:pb-16",
      )}
    >
      {/* Big green number */}
      <div className="pt-1 text-right font-mono text-4xl font-bold leading-none text-accent/35 md:text-6xl">
        {num}
      </div>

      {/* Node on the beam */}
      <div className="relative flex justify-center pt-3">
        <span
          className={cn(
            "relative z-10 size-3.5 rounded-full border-2 transition-all duration-500",
            active
              ? "border-accent bg-accent shadow-[0_0_0_5px_rgba(78,143,82,0.15)]"
              : "border-border bg-background",
          )}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={active ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pb-2"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {phase.title}
          </p>
          <span className="rounded-none border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted">
            Phase {num} / {String(phases.length).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-2 text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {phase.headline ?? phase.title}
        </h3>
        <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted">{phase.description}</p>
      </motion.div>
    </li>
  );
}
