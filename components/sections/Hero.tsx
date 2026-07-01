"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { hero } from "@/content/hero";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { HeroVisual } from "./HeroVisual";

// Summary-block feature icons (PNG illustrations) shown as circular badges.
const summaryIcons = [
  { src: "/images/bag.png", alt: "Enterprise platforms" },
  { src: "/images/bot.png", alt: "AI agents" },
  { src: "/images/automation.png", alt: "Intelligent automation" },
];

// Headline lines (accent flag colours the final line green).
const headlineLines: { words: string[]; accent?: boolean }[] = [
  { words: ["AI", "Solutions"] },
  { words: ["Delivered", "for"] },
  { words: ["Speed,", "Scale", "&", "ROI."], accent: true },
];

// Container staggers each word; each word does a quick glitch-flicker as it
// resolves smoothly into place.
const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const wordGlitch: Variants = {
  hidden: { opacity: 0, x: -8, filter: "blur(5px)" },
  show: {
    opacity: [0, 1, 0.5, 1],
    x: [-8, 3, -1, 0],
    filter: ["blur(5px)", "blur(0px)", "blur(1.5px)", "blur(0px)"],
    transition: { duration: 0.5, ease: "easeOut", times: [0, 0.55, 0.78, 1] },
  },
};

// Header margin height (4rem = 64px) to ensure no scroll overlap.
function Headline() {
  const reduce = useReducedMotion();
  const cls =
    "text-balance text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.1] tracking-tight text-foreground text-left";

  if (reduce) {
    return (
      <h1 className={cls}>
        AI Solutions
        <br />
        Delivered for
        <br />
        <span className="text-accent">Speed, Scale &amp; ROI.</span>
      </h1>
    );
  }

  return (
    <motion.h1 variants={headlineContainer} initial="hidden" animate="show" className={cls}>
      {headlineLines.map((line, li) => (
        <span key={li} className="block">
          {line.words.map((w, wi) => (
            <motion.span
              key={wi}
              variants={wordGlitch}
              className={cn(
                "inline-block will-change-[transform,opacity,filter]",
                line.accent && "text-accent",
              )}
            >
              {w}
              {wi < line.words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

function Actions({ stacked = true }: { stacked?: boolean }) {
  // Sharp-edged CTAs with a hard offset-shadow "lift" hover (suits the square corners).
  const sharp =
    "rounded-none transition-all duration-200 ease-nova hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none";
  const hover = [
    // Primary: button STAYS green; the offset block behind it goes BLACK on hover.
    "hover:bg-accent hover:shadow-[6px_6px_0_0_#000]",
    "hover:shadow-[6px_6px_0_0_#000] hover:bg-accent/[0.06]",
  ];
  return (
    <div className={cn("flex gap-3", stacked ? "flex-col w-full" : "flex-wrap justify-center")}>
      {hero.ctas.map((c, i) => (
        <Button
          key={c.label}
          href={c.href}
          variant={i === 0 ? "primary" : "secondary"}
          className={cn(sharp, hover[i] ?? hover[1], stacked && "w-full")}
        >
          {c.label}
        </Button>
      ))}
    </div>
  );
}

/**
 * SECTION 1 — Hero (arch §5 #1).
 * Desktop: a pinned scroll stage. The four blocks transition smoothly based on scroll progress:
 * - Block 1 slides UP out of viewport.
 * - Block 3 slides LEFT and slightly UP out of viewport.
 * - Block 4 slides DOWN out of viewport.
 * - Block 2 (summary statement) expands to fill the entire viewport, background turns white, and centers its text.
 * Mobile / reduced-motion: a clean static 4-block layout matching the visual style.
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
  const reduce = useReducedMotion();
  return (
    <section id="top" className="pt-16 bg-background">
      <div className="grid grid-cols-1 border-b border-border lg:h-[calc(100svh-4rem)] lg:grid-cols-12 lg:grid-rows-2">
        
        {/* Block 1: Headline */}
        <div className="flex items-end overflow-hidden border-b border-border p-8 sm:p-12 lg:col-span-8 lg:row-start-1 lg:border-b-0 lg:border-r lg:p-12 bg-background">
          <Headline />
        </div>

        {/* Block 2: Summary */}
        <div className="flex flex-col justify-end overflow-hidden border-b border-border bg-surface-raised p-8 sm:p-12 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:p-10 min-h-[280px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
          {/* 3 Feature icons (circular badges) stacked on top */}
          <div className="flex gap-3 mb-4 justify-start">
            {summaryIcons.map((ic) => (
              <div
                key={ic.src}
                className="flex size-11 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.05]"
              >
                <Image src={ic.src} alt={ic.alt} width={32} height={32} className="size-8 object-contain [filter:saturate(1.15)]" />
              </div>
            ))}
          </div>
          <p className="text-pretty text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.25] tracking-tight text-foreground text-left whitespace-pre-line">{hero.summary}</p>
          </motion.div>
        </div>

        {/* Block 3: Visual (Brain + Hexagons) */}
        <div className="relative overflow-hidden border-b border-border lg:col-span-8 lg:row-start-2 lg:border-b-0 lg:border-r bg-black">
          <HeroVisual />
        </div>

        {/* Block 4: Scroll chevrons and Actions */}
        <div className="flex flex-col justify-between items-start gap-8 overflow-hidden bg-background p-8 sm:p-12 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:p-10 min-h-[300px]">
          {/* Scroll Chevrons */}
          <div className="flex flex-col gap-1 items-start text-accent/50 animate-pulse">
            <ChevronDown className="size-4 -mb-2" />
            <ChevronDown className="size-4 -mb-2" />
            <ChevronDown className="size-4" />
          </div>
          
          {/* CTA Content — slides UP (bottom → top) on first render */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col gap-4 w-full max-w-sm mt-auto"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">Get started</p>
            <p className="text-pretty text-foreground text-xs lg:text-sm font-medium leading-relaxed">{hero.actionNote}</p>
            <div className="w-full mt-1">
              <Actions stacked={true} />
            </div>
          </motion.div>
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

  // Calculate widths and coordinates as scroll progress goes from 0 to 0.70
  const leftWidth = useTransform(scrollYProgress, [0, 0.70], ["66.666%", "0%"]);
  const rightLeft = useTransform(scrollYProgress, [0, 0.70], ["66.666%", "0%"]);
  const rightWidth = useTransform(scrollYProgress, [0, 0.70], ["33.333%", "100%"]);
  const rightHeight = useTransform(scrollYProgress, [0, 0.70], ["50%", "100%"]);

  // Block 1 (Headline) slides UP
  const block1Y = useTransform(scrollYProgress, [0, 0.70], ["0%", "-120%"]);
  const block1Opacity = useTransform(scrollYProgress, [0, 0.50], [1, 0]);

  // Block 3 (Brain) slides LEFT and slightly UP ("moving little up and left sliding")
  const block3X = useTransform(scrollYProgress, [0, 0.70], ["0%", "-120%"]);
  const block3Y = useTransform(scrollYProgress, [0, 0.70], ["0%", "-25%"]);
  const block3Opacity = useTransform(scrollYProgress, [0, 0.50], [1, 0]);

  // Block 4 (CTA) slides DOWN
  const block4Y = useTransform(scrollYProgress, [0, 0.70], ["0%", "120%"]);
  const block4Opacity = useTransform(scrollYProgress, [0, 0.50], [1, 0]);

  // Border overlay opacity (fades out early in the scroll)
  const borderOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Block 2 background color transition: light grey to white
  const block2Bg = useTransform(scrollYProgress, [0, 0.70], ["#f4f7f4", "#ffffff"]);

  // Block 2 text wrapper is kept PERFECTLY centered inside its container at all
  // times (top:50% / left:50% / translate(-50%,-50%)). Because the container
  // itself animates from the top-right quadrant out to the full viewport, the
  // centered content glides smoothly to the exact viewport center — no
  // unit-mixing, no discrete jumps, guaranteed perfect final alignment.
  // We only interpolate the readable max-width (single unit → smooth).
  const textMaxWidth = useTransform(scrollYProgress, [0, 0.70], [440, 880]);

  // Font-size grows smoothly from a small column-fit size to the large centered
  // headline size as the block expands (matches the reference behaviour).
  const textFontSize = useTransform(scrollYProgress, [0, 0.70], [20, 40]);

  // Feature icons fade + scale in as you scroll, then stay fully bright. The
  // ranges complete early (by ~0.3) and framer clamps the output, so once the
  // icons are in they DON'T fade back out as you continue toward the centered
  // resting state.
  const iconsOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const iconsScale = useTransform(scrollYProgress, [0.1, 0.45], [0.8, 1]);
  const iconsTranslateY = useTransform(scrollYProgress, [0.1, 0.3], [16, 0]);

  const [isBorderVisible, setIsBorderVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsBorderVisible(latest < 0.15);
  });

  return (
    <section id="top" ref={trackRef} className="relative h-[300vh]">
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden bg-background">
        
        {/* Block 1 (Top-Left) - Headline */}
        <motion.div
          style={{ width: leftWidth }}
          className="absolute left-0 top-0 h-1/2 overflow-hidden bg-background"
        >
          <motion.div 
            style={{ y: block1Y, opacity: block1Opacity }}
            className="w-full h-full flex items-end p-12 border-b-0 border-r-0"
          >
            <Headline />
          </motion.div>
        </motion.div>

        {/* Block 3 (Bottom-Left) - Code Globe Visual.
            The outer block animates its WIDTH (the reveal "window"), but the
            inner content keeps a FIXED width (= the initial 2/3 viewport) so it
            never reflows/compresses while scrolling — the shrinking window just
            clips it. This prevents the tiles from sliding over the globe. */}
        <motion.div
          style={{ width: leftWidth }}
          className="absolute left-0 top-1/2 h-1/2 overflow-hidden bg-black"
        >
          <motion.div
            style={{ x: block3X, y: block3Y, opacity: block3Opacity, width: "66.6667vw" }}
            className="h-full"
          >
            <HeroVisual />
          </motion.div>
        </motion.div>

        {/* Block 4 (Bottom-Right) - Get Started / Chevrons / Card */}
        <motion.div
          style={{ left: rightLeft, width: rightWidth }}
          className="absolute top-1/2 h-1/2 overflow-hidden bg-background"
        >
          <motion.div 
            style={{ y: block4Y, opacity: block4Opacity }}
            className="w-full h-full flex flex-col justify-between items-start p-10 min-h-[300px]"
          >
            {/* Scroll Chevrons */}
            <div className="flex flex-col gap-1 items-start text-accent/50 animate-pulse">
              <ChevronDown className="size-4 -mb-2" />
              <ChevronDown className="size-4 -mb-2" />
              <ChevronDown className="size-4" />
            </div>

            {/* CTA Content — slides UP (bottom → top) on first render */}
            <motion.div
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="flex flex-col gap-4 w-full max-w-sm mt-auto"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">Get started</p>
              <p className="text-pretty text-foreground text-xs lg:text-sm font-medium leading-relaxed">{hero.actionNote}</p>
              <div className="w-full mt-1">
                <Actions stacked={true} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Block 2 (Top-Right -> Expanded Full Viewport) - Summary Statement */}
        <motion.div
          style={{ left: rightLeft, width: rightWidth, height: rightHeight, backgroundColor: block2Bg }}
          className="absolute top-0 overflow-hidden"
        >
          <div className="w-full h-full relative bg-transparent">
            {/* Text wrapper stays perfectly centered inside this container the
                entire time; the container's own expansion carries it smoothly
                to the exact viewport center. */}
            <motion.div
              style={{ maxWidth: textMaxWidth }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 flex flex-col items-center"
            >
              {/* Text + icons slide in from the RIGHT on first render */}
              <motion.div
                initial={{ opacity: 0, x: 70 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex w-full flex-col items-center"
              >
                {/* Feature icons (circular badges) — scroll in once, then stay bright */}
                <motion.div
                  style={{ opacity: iconsOpacity, scale: iconsScale, y: iconsTranslateY }}
                  className="flex gap-4 mb-6 justify-center origin-bottom"
                >
                {summaryIcons.map((ic) => (
                  <div
                    key={ic.src}
                    className="flex size-14 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.05] md:size-16"
                  >
                    <Image
                      src={ic.src}
                      alt={ic.alt}
                      width={52}
                      height={52}
                      className="size-10 object-contain md:size-12 [filter:saturate(1.15)]"
                    />
                  </div>
                ))}
              </motion.div>

                <motion.p
                  style={{ fontSize: textFontSize }}
                  className="text-foreground text-pretty w-full text-center leading-[1.25] tracking-tight whitespace-pre-line font-semibold"
                >
                  {hero.summary}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic Borders */}
        {/* Vertical divider line */}
        <motion.div
          style={{ left: rightLeft, opacity: borderOpacity, display: isBorderVisible ? "block" : "none" }}
          className="absolute top-0 bottom-0 w-[1px] bg-border pointer-events-none z-20"
        />
        {/* Horizontal divider line (left side) */}
        <motion.div
          style={{ width: leftWidth, opacity: borderOpacity, display: isBorderVisible ? "block" : "none" }}
          className="absolute top-1/2 left-0 h-[1px] bg-border pointer-events-none z-20"
        />
        {/* Horizontal divider line (right side) */}
        <motion.div
          style={{ left: rightLeft, width: rightWidth, opacity: borderOpacity, display: isBorderVisible ? "block" : "none" }}
          className="absolute top-1/2 h-[1px] bg-border pointer-events-none z-20"
        />

      </div>
    </section>
  );
}
