"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { hero } from "@/content/hero";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { HeroVisual } from "./HeroVisual";

// Split the headline so the highlight phrase renders in the accent color.
const prefix = hero.headline.replace(hero.headlineHighlight, "");

function Headline() {
  return (
    <h1 className="text-balance text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-tight text-foreground">
      {prefix}
      <span className="text-accent">{hero.headlineHighlight}</span>
    </h1>
  );
}

function Actions({ stacked = true }: { stacked?: boolean }) {
  return (
    <div className={cn("flex gap-3", stacked ? "flex-col" : "flex-wrap justify-center")}>
      {hero.ctas.map((c, i) => (
        <Button
          key={c.label}
          href={c.href}
          variant={i === 0 ? "primary" : "secondary"}
          className={stacked ? "w-full" : undefined}
        >
          {c.label}
        </Button>
      ))}
    </div>
  );
}

/**
 * SECTION 1 — Hero (arch §5 #1).
 * Desktop: a pinned scroll stage. The four blocks fade fully OUT, then the description fades IN
 * centered on a plain background — a clean hand-off (no overlap), matching the design flow.
 * Mobile / reduced-motion: a clean static 4-block layout.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setAnimated(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!animated || reduce) return <HeroStatic />;
  return <HeroAnimated />;
}

/* ── Static layout (mobile / reduced-motion / SSR) ───────────────────────── */
function HeroStatic() {
  return (
    <section id="top" className="pt-16">
      <div className="grid grid-cols-1 border-b border-border lg:h-[calc(100svh-4rem)] lg:grid-cols-12 lg:grid-rows-2">
        <div className="flex items-end overflow-hidden border-b border-border p-8 sm:p-12 lg:col-span-8 lg:row-start-1 lg:border-b-0 lg:border-r lg:p-12">
          <Headline />
        </div>

        <div className="flex flex-col justify-end gap-5 overflow-hidden border-b border-border bg-surface-raised p-8 sm:p-12 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:p-10">
          <p className="text-pretty text-lg text-foreground lg:text-xl">{hero.summary}</p>
        </div>

        <div className="relative overflow-hidden border-b border-border lg:col-span-8 lg:row-start-2 lg:border-b-0 lg:border-r">
          <HeroVisual />
        </div>

        <div className="flex flex-col justify-end gap-5 overflow-hidden p-8 sm:p-12 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Get started</p>
          <p className="text-pretty text-foreground">{hero.actionNote}</p>
          <Actions />
        </div>
      </div>
    </section>
  );
}

/* ── Pinned scroll stage (desktop) ───────────────────────────────────────── */
function HeroAnimated() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Layer A (the 4 blocks) fully clears by 0.4. Layer B (centered statement) starts at 0.4.
  // They meet at 0 opacity → no overlap at any point.
  const blocksOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const blocksY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-8%"]);

  const focusOpacity = useTransform(scrollYProgress, [0.4, 0.75], [0, 1]);
  const focusY = useTransform(scrollYProgress, [0.4, 0.75], [28, 0]);

  const [focusActive, setFocusActive] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setFocusActive(v >= 0.4));

  return (
    <section id="top" ref={trackRef} className="relative h-[200vh]">
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden bg-surface-raised">
        {/* Layer A — the four blocks */}
        <motion.div
          style={{ opacity: blocksOpacity, y: blocksY }}
          className={cn(
            "grid h-full grid-cols-12 grid-rows-2",
            focusActive && "pointer-events-none",
          )}
        >
          <div className="col-span-8 row-start-1 flex items-end overflow-hidden border-b border-r border-border bg-background p-12">
            <Headline />
          </div>

          <div className="col-span-4 col-start-9 row-start-1 flex flex-col justify-center gap-5 overflow-hidden border-b border-border p-10">
            <p className="text-pretty text-lg text-foreground lg:text-xl">{hero.summary}</p>
          </div>

          <div className="col-span-8 row-start-2 overflow-hidden border-r border-border">
            <HeroVisual />
          </div>

          <div className="col-span-4 col-start-9 row-start-2 flex flex-col justify-center gap-5 overflow-hidden p-10">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Get started</p>
            <p className="text-pretty text-foreground">{hero.actionNote}</p>
            <Actions />
          </div>
        </motion.div>

        {/* Layer B — centered statement on the plain background */}
        <motion.div
          style={{ opacity: focusOpacity, y: focusY }}
          className={cn(
            "absolute inset-0 flex items-center justify-center px-8",
            focusActive ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <p className="max-w-4xl text-balance text-center text-3xl font-semibold leading-snug text-foreground sm:text-4xl">
            {hero.summary}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
