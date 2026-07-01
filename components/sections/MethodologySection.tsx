"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { methodology } from "@/content/methodology";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Phase } from "@/types";

const phases = methodology.phases;

/**
 * SECTION 6 — Methodology / Approach (arch §5 #6).
 * Desktop: a pinned scroll-stage — a large active phase number + label on the
 * left, a centered timeline node on the divider, and the active phase detail on
 * the right; all crossfade as you scroll through the phases.
 * Mobile / reduced-motion: a clean static stack.
 */
export function MethodologySection() {
  const reduce = useReducedMotion();

  return (
    <section id="approach" className="scroll-mt-24">
      {/* Intro */}
      <Container className="py-24 md:pt-32 md:pb-16">
        <Reveal className="max-w-3xl">
          <Eyebrow label="Our Approach" index={6} />
          <h2 className="mt-5 text-balance text-h2 font-semibold">{methodology.heading}</h2>
          <p className="mt-4 text-pretty text-lg text-muted">{methodology.intro}</p>
        </Reveal>
      </Container>

      {!reduce ? <PinnedStepper /> : null}
      <StaticStack className={reduce ? "" : "lg:hidden"} />
    </section>
  );
}

/* ── Desktop pinned scroll-stage ─────────────────────────────────────────── */

const swap: Variants = {
  enter: (d: number) => ({ opacity: 0, y: d > 0 ? 34 : -34 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: (d: number) => ({ opacity: 0, y: d > 0 ? -28 : 28, transition: { duration: 0.28 } }),
};

function PinnedStepper() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prev = useRef(0);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const count = phases.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    if (i !== prev.current) {
      setDir(i > prev.current ? 1 : -1);
      prev.current = i;
      setActive(i);
    }
  });

  const phase = phases[active];
  const num = String(active + 1).padStart(2, "0");

  return (
    <div
      ref={trackRef}
      className="relative hidden lg:block"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden">
        {/* Faint blueprint wash */}
        <div
          aria-hidden
          className="bg-blueprint mask-radial-fade pointer-events-none absolute inset-0 opacity-50"
        />

        {/* Central divider + node (aligned to viewport center = container center) */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[68vh] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-border to-transparent"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="relative flex size-4 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/50" />
            <span className="relative size-4 rounded-full border-2 border-background bg-accent shadow-[0_0_0_5px_rgba(78,143,82,0.15)]" />
          </span>
        </div>

        <Container className="relative w-full">
          <div className="grid grid-cols-2 items-center gap-16">
            {/* Left — big number + label + progress */}
            <div className="pr-12 xl:pr-20">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={active}
                  custom={dir}
                  variants={swap}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="text-[clamp(6rem,13vw,11rem)] font-semibold leading-none tracking-tight text-accent">
                    {num}
                  </div>
                  <div className="mt-2 text-4xl font-bold tracking-tight text-foreground xl:text-5xl">
                    {phase.title}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Segmented progress */}
              <div className="mt-10 flex max-w-md gap-2">
                {phases.map((p, i) => (
                  <span
                    key={p.title}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-500",
                      i <= active ? "bg-accent" : "bg-border",
                    )}
                  />
                ))}
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
                Phase {num} / {String(count).padStart(2, "0")}
              </p>
            </div>

            {/* Right — active phase detail */}
            <div className="pl-12 xl:pl-20">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={active}
                  custom={dir}
                  variants={swap}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <p className="font-mono text-sm tracking-wide text-accent">
                    {num} — {phase.title}
                  </p>
                  <h3 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground xl:text-4xl">
                    {phase.headline ?? phase.title}
                  </h3>
                  <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted">
                    {phase.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

/* ── Mobile / reduced-motion static stack ────────────────────────────────── */

function StaticStack({ className }: { className?: string }) {
  return (
    <Container className={cn("pb-24 md:pb-32", className)}>
      <ol className="relative border-l border-border pl-8">
        {phases.map((phase, i) => (
          <StaticRow key={phase.title} phase={phase} index={i} last={i === phases.length - 1} />
        ))}
      </ol>
    </Container>
  );
}

function StaticRow({ phase, index, last }: { phase: Phase; index: number; last: boolean }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <li className={cn("relative", last ? "" : "pb-12")}>
      <span className="absolute -left-[2.55rem] top-1 flex size-6 items-center justify-center rounded-full border border-accent bg-background font-mono text-[10px] text-accent">
        {num}
      </span>
      <span className="font-mono text-5xl font-semibold leading-none text-accent/90">{num}</span>
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{phase.title}</h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">
        {phase.headline ?? phase.title}
      </p>
      <p className="mt-3 max-w-xl text-pretty text-muted">{phase.description}</p>
    </li>
  );
}
