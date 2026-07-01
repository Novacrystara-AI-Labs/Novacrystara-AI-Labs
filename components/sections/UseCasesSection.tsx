"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Wrench,
  Building2,
  ShieldCheck,
  Server,
  HeartPulse,
  UserCheck,
  Target,
  Check,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useCases } from "@/content/useCases";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CodeParticles } from "@/components/ui/CodeParticles";
import { cn } from "@/lib/utils";

// Per-use-case hero artwork (right panel), matched by use-case id.
const useCaseImages: Record<string, string> = {
  "autonomous-maintenance-agent": "/images/use_cases/Autonomous_agent_1.png",
  "autonomous-facility-maintenance-agent": "/images/use_cases/Autonomous_facility_agent.png",
  "ai-security-operations-center": "/images/use_cases/Autonomous_security.png",
  "autonomous-colocation-b2b-sales-agent": "/images/use_cases/Autonomous_sales.png",
  "virtual-healthcare-assistant": "/images/use_cases/Virtual_Healthcare_Assistant.png",
  "autonomous-hiring-agent": "/images/use_cases/Autonomous_hiring_agent.png",
  "autonomous-sales-qualification-agent": "/images/use_cases/Autonomous_sales_qualification.png",
};

const icons: Record<string, LucideIcon> = {
  wrench: Wrench,
  "building-2": Building2,
  "shield-check": ShieldCheck,
  server: Server,
  "heart-pulse": HeartPulse,
  "user-check": UserCheck,
  target: Target,
};

const leftV: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};
const rightV: Variants = {
  initial: { opacity: 0, x: 28, scale: 0.985 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -18, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};
const listStagger: Variants = {
  animate: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } },
};
const listItem: Variants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * SECTION 5 — Enterprise AI Use Cases (arch §5 #5, §7).
 * Product-style explorer: a horizontal tab bar (sliding accent underline) drives
 * a two-column stage — left = narrative + capabilities + CTA, right = a dark
 * visual panel with a floating "Business Outcomes" card. Everything crossfades
 * smoothly on tab change. Full ARIA tab semantics + arrow-key navigation.
 */
export function UseCasesSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const items = useCases.useCases;
  const uc = items[active];
  const Icon = icons[uc.icon] ?? Sparkles;
  const image = useCaseImages[uc.id];

  function select(i: number) {
    setActive(i);
    tabsRef.current[i]?.focus();
    tabsRef.current[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  function onKeyDown(e: KeyboardEvent) {
    const last = items.length - 1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(active === last ? 0 : active + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(active === 0 ? last : active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(last);
    }
  }

  return (
    <Section id="use-cases" className="relative overflow-hidden bg-surface">
      <div
        aria-hidden
        className="bg-dotgrid mask-fade-b pointer-events-none absolute inset-0 z-0 opacity-40"
      />

      <div className="relative z-10">
        <Reveal className="max-w-3xl">
          <Eyebrow label="Use Cases" />
          <h2 className="mt-5 text-balance text-h2 font-semibold">{useCases.heading}</h2>
          <p className="mt-4 text-pretty text-lg text-muted">{useCases.tagline}</p>
        </Reveal>

        {/* Tab bar with prev/next controls (works across mobile · tablet · desktop) */}
        <div className="mt-10 flex items-center gap-1 border-b border-border">
          <button
            type="button"
            aria-label="Previous use case"
            onClick={() => select(active === 0 ? items.length - 1 : active - 1)}
            className="flex size-9 shrink-0 items-center justify-center border border-border text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronLeft aria-hidden className="size-4" />
          </button>

          <div
            role="tablist"
            aria-label="Enterprise AI use cases"
            onKeyDown={onKeyDown}
            className="flex flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`uc-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="uc-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "relative shrink-0 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  selected ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {item.title}
                {selected ? (
                  <motion.span
                    layoutId="uc-underline"
                    className="absolute inset-x-2 -bottom-px h-0.5 bg-accent"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
              </button>
            );
          })}
          </div>

          <button
            type="button"
            aria-label="Next use case"
            onClick={() => select(active === items.length - 1 ? 0 : active + 1)}
            className="flex size-9 shrink-0 items-center justify-center border border-border text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronRight aria-hidden className="size-4" />
          </button>
        </div>

        {/* Stage */}
        <div
          id="uc-panel"
          role="tabpanel"
          aria-labelledby={`uc-tab-${uc.id}`}
          className="mt-10 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Left — narrative */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={uc.id}
              variants={reduce ? undefined : leftV}
              initial={reduce ? undefined : "initial"}
              animate={reduce ? undefined : "animate"}
              exit={reduce ? undefined : "exit"}
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {uc.tagline}
              </p>
              <h3 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {uc.title}
              </h3>

              <div className="mt-5 space-y-3 border-l-2 border-accent/25 pl-5">
                {uc.intro.map((p) => (
                  <p key={p} className="text-pretty leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>

              <h4 className="mt-8 font-mono text-xs uppercase tracking-widest text-accent">
                Key Capabilities
              </h4>
              <motion.ul
                variants={reduce ? undefined : listStagger}
                initial={reduce ? undefined : "initial"}
                animate={reduce ? undefined : "animate"}
                className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2"
              >
                {uc.capabilities.map((c) => (
                  <motion.li
                    key={c}
                    variants={reduce ? undefined : listItem}
                    className="flex gap-2 text-pretty text-sm leading-relaxed text-muted"
                  >
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{c}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <Link
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-none bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-strong"
              >
                Book a discovery session
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right — visual panel */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={uc.id}
              variants={reduce ? undefined : rightV}
              initial={reduce ? undefined : "initial"}
              animate={reduce ? undefined : "animate"}
              exit={reduce ? undefined : "exit"}
              className={cn(
                "relative overflow-hidden",
                image
                  ? "min-h-[460px] w-full bg-ink"
                  : "flex min-h-[460px] flex-col justify-between border border-white/10 bg-[#0b1d11] p-8",
              )}
            >
              {image ? (
                <Image
                  src={image}
                  alt={uc.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-center"
                />
              ) : (
                <>
                  {/* Ambient */}
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="bg-blueprint-dark absolute inset-0 opacity-50" />
                    <CodeParticles
                      className="mask-radial-fade absolute inset-0"
                      maxOpacity={0.08}
                      density={0.0009}
                    />
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.35),transparent_70%)] blur-2xl" />
                  </div>

                  {/* Top: icon + label */}
                  <div className="relative">
                    <span className="inline-flex size-16 items-center justify-center border border-[#7ed98d]/40 bg-[#7ed98d]/10 text-[#7ed98d] shadow-[0_0_30px_rgba(78,143,82,0.25)]">
                      <Icon aria-hidden className="size-8" />
                    </span>
                    <p className="mt-6 max-w-xs font-mono text-xs uppercase tracking-[0.2em] text-white/45">
                      Enterprise-grade · production-ready
                    </p>
                  </div>

                  {/* Floating outcomes card */}
                  <div className="relative mt-8 border border-black/5 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    <div className="flex items-center gap-2">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/60" />
                        <span className="relative inline-flex size-2 rounded-full bg-accent" />
                      </span>
                      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
                        Business Outcomes
                      </p>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {uc.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-3 text-sm font-medium text-foreground"
                        >
                          <TrendingUp aria-hidden className="size-4 shrink-0 text-accent" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
