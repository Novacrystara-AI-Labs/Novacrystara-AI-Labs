"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronDown, Briefcase, Bot, Globe } from "lucide-react";
import { hero } from "@/content/hero";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { HeroVisual } from "./HeroVisual";

// Split the headline so the highlight phrase renders in the accent color.
const prefix = hero.headline.replace(hero.headlineHighlight, "");

// Header margin height (4rem = 64px) to ensure no scroll overlap.
function Headline() {
  return (
    <h1 className="text-balance text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.1] tracking-tight text-foreground animate-fade-in text-left">
      AI Solutions
      <br />
      Delivered for
      <br />
      <span className="text-accent">Speed, Scale & ROI.</span>
    </h1>
  );
}

function Actions({ stacked = true }: { stacked?: boolean }) {
  return (
    <div className={cn("flex gap-3", stacked ? "flex-col w-full" : "flex-wrap justify-center")}>
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
  return (
    <section id="top" className="pt-16 bg-background">
      <div className="grid grid-cols-1 border-b border-border lg:h-[calc(100svh-4rem)] lg:grid-cols-12 lg:grid-rows-2">
        
        {/* Block 1: Headline */}
        <div className="flex items-end overflow-hidden border-b border-border p-8 sm:p-12 lg:col-span-8 lg:row-start-1 lg:border-b-0 lg:border-r lg:p-12 bg-background">
          <Headline />
        </div>

        {/* Block 2: Summary */}
        <div className="flex flex-col justify-end overflow-hidden border-b border-border bg-surface-raised p-8 sm:p-12 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:p-10 min-h-[280px]">
          {/* 3 Tech Icons stacked on top */}
          <div className="flex gap-3 mb-4 justify-start">
            <div className="size-8 bg-[#c27629]/15 rounded-lg text-[#c27629] flex items-center justify-center">
              <Briefcase className="size-4 lg:size-5" />
            </div>
            <div className="size-8 bg-[#1b73e8]/15 rounded-lg text-[#1b73e8] flex items-center justify-center">
              <Bot className="size-4 lg:size-5" />
            </div>
            <div className="size-8 bg-[#0f9d58]/15 rounded-lg text-[#0f9d58] flex items-center justify-center">
              <Globe className="size-4 lg:size-5" />
            </div>
          </div>
          <p className="text-pretty text-lg text-foreground lg:text-xl font-normal leading-normal text-left">{hero.summary}</p>
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
          
          {/* CTA Content */}
          <div className="flex flex-col gap-4 w-full max-w-sm mt-auto">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">Get started</p>
            <p className="text-pretty text-foreground text-xs lg:text-sm font-medium leading-relaxed">{hero.actionNote}</p>
            <div className="w-full mt-1">
              <Actions stacked={true} />
            </div>
          </div>
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

  // Block 2 Text Wrapper dynamic layout coordinates:
  // - Stage 2 (scroll 0.30): moves slightly up and right (from 2.5rem to 4rem) to take a gap
  // - Stage 6 (scroll 0.70): centers completely (50%, translateX -50%, translateY 50%)
  const textLeft = useTransform(scrollYProgress, [0, 0.30, 0.70], ["2.5rem", "4rem", "50%"]);
  const textBottom = useTransform(scrollYProgress, [0, 0.30, 0.70], ["2.5rem", "4rem", "50%"]);
  const textTranslateX = useTransform(scrollYProgress, [0, 0.30, 0.70], ["0%", "0%", "-50%"]);
  const textTranslateY = useTransform(scrollYProgress, [0, 0.30, 0.70], ["0%", "0%", "50%"]);
  const textMaxWidth = useTransform(scrollYProgress, [0, 0.30, 0.70], ["360px", "360px", "1100px"]);

  // Tech Icons slide up and fade in above the text as scroll progresses
  const iconsOpacity = useTransform(scrollYProgress, [0.15, 0.40], [0, 1]);
  const iconsTranslateY = useTransform(scrollYProgress, [0.15, 0.40], [20, 0]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isBorderVisible, setIsBorderVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsExpanded(latest >= 0.45);
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

        {/* Block 3 (Bottom-Left) - Brain Visual */}
        <motion.div
          style={{ width: leftWidth }}
          className="absolute left-0 top-1/2 h-1/2 overflow-hidden bg-black"
        >
          <motion.div 
            style={{ x: block3X, y: block3Y, opacity: block3Opacity }}
            className="w-full h-full"
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

            {/* CTA Content */}
            <div className="flex flex-col gap-4 w-full max-w-sm mt-auto">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">Get started</p>
              <p className="text-pretty text-foreground text-xs lg:text-sm font-medium leading-relaxed">{hero.actionNote}</p>
              <div className="w-full mt-1">
                <Actions stacked={true} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Block 2 (Top-Right -> Expanded Full Viewport) - Summary Statement */}
        <motion.div
          style={{ left: rightLeft, width: rightWidth, height: rightHeight, backgroundColor: block2Bg }}
          className="absolute top-0 overflow-hidden"
        >
          <div className="w-full h-full relative bg-transparent">
            {/* Continuous animation of text box layout positioning */}
            <motion.div
              style={{
                left: textLeft,
                bottom: textBottom,
                translateX: textTranslateX,
                translateY: textTranslateY,
                maxWidth: textMaxWidth,
              }}
              className="absolute top-auto right-auto w-full flex flex-col items-start justify-end px-6 md:px-12"
            >
              {/* Tech Icons sliding up and fading in */}
              <motion.div
                style={{ opacity: iconsOpacity, y: iconsTranslateY }}
                className={cn(
                  "flex gap-4 mb-6 transition-all duration-700 ease-nova w-full",
                  isExpanded ? "justify-center" : "justify-start"
                )}
              >
                <div className={cn(
                  "bg-[#c27629]/15 text-[#c27629] flex items-center justify-center transition-all duration-700 ease-nova shadow-sm",
                  isExpanded ? "size-14 md:size-20 rounded-2xl" : "size-8 rounded-lg"
                )}>
                  <Briefcase className={cn("transition-all duration-700 ease-nova", isExpanded ? "size-6 md:size-10" : "size-4 lg:size-5")} />
                </div>
                <div className={cn(
                  "bg-[#1b73e8]/15 text-[#1b73e8] flex items-center justify-center transition-all duration-700 ease-nova shadow-sm",
                  isExpanded ? "size-14 md:size-20 rounded-2xl" : "size-8 rounded-lg"
                )}>
                  <Bot className={cn("transition-all duration-700 ease-nova", isExpanded ? "size-6 md:size-10" : "size-4 lg:size-5")} />
                </div>
                <div className={cn(
                  "bg-[#0f9d58]/15 text-[#0f9d58] flex items-center justify-center transition-all duration-700 ease-nova shadow-sm",
                  isExpanded ? "size-14 md:size-20 rounded-2xl" : "size-8 rounded-lg"
                )}>
                  <Globe className={cn("transition-all duration-700 ease-nova", isExpanded ? "size-6 md:size-10" : "size-4 lg:size-5")} />
                </div>
              </motion.div>

              <p
                className={cn(
                  "text-foreground transition-all duration-700 ease-nova text-pretty w-full leading-tight",
                  isExpanded
                    ? "text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-center tracking-tight"
                    : "text-lg lg:text-xl font-normal text-left leading-relaxed"
                )}
              >
                {hero.summary}
              </p>
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
