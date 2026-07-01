"use client";

import { useRef, useState, type KeyboardEvent } from "react";
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
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useCases } from "@/content/useCases";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  wrench: Wrench,
  "building-2": Building2,
  "shield-check": ShieldCheck,
  server: Server,
  "heart-pulse": HeartPulse,
  "user-check": UserCheck,
  target: Target,
};

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};
const listItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * SECTION 5 — Enterprise AI Use Cases (arch §5 #5, §7).
 * Interactive explorer: a vertical rail of the seven use cases (horizontal chip
 * scroller on mobile) drives an animated detail panel with full intro,
 * capabilities and benefits. Full ARIA tab semantics + arrow-key navigation.
 */
export function UseCasesSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const items = useCases.useCases;
  const uc = items[active];
  const Icon = icons[uc.icon] ?? Sparkles;

  function onKeyDown(e: KeyboardEvent) {
    const last = items.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <Section id="use-cases" className="relative overflow-hidden bg-surface">
      <div
        aria-hidden
        className="bg-dotgrid mask-fade-b pointer-events-none absolute inset-0 -z-10 opacity-40"
      />

      <Reveal className="max-w-3xl">
        <Eyebrow label="Use Cases" index={5} />
        <h2 className="mt-5 text-balance text-h2 font-semibold">{useCases.heading}</h2>
        <p className="mt-4 text-pretty text-lg text-muted">{useCases.tagline}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
        {/* Rail / chip scroller */}
        <div
          role="tablist"
          aria-label="Enterprise AI use cases"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => {
            const TabIcon = icons[item.icon] ?? Sparkles;
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
                aria-controls={`uc-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:w-full",
                  selected
                    ? "border-accent/40 bg-white shadow-[0_8px_28px_rgba(78,143,82,0.1)]"
                    : "border-transparent bg-white/40 hover:border-border hover:bg-white",
                )}
              >
                {/* Active left bar (desktop) */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-1/2 hidden h-7 w-1 -translate-y-1/2 rounded-r-full bg-accent transition-all duration-300 lg:block",
                    selected ? "opacity-100" : "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                    selected
                      ? "bg-accent text-white"
                      : "bg-accent/10 text-accent group-hover:bg-accent/20",
                  )}
                >
                  <TabIcon aria-hidden className="size-5" />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block whitespace-nowrap text-sm font-semibold tracking-tight transition-colors lg:whitespace-normal",
                      selected ? "text-accent" : "text-foreground",
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="mt-0.5 hidden text-xs text-muted lg:line-clamp-1 lg:block">
                    {item.tagline}
                  </span>
                </span>
                <ChevronRight
                  aria-hidden
                  className={cn(
                    "ml-auto hidden size-4 shrink-0 text-accent transition-all duration-300 lg:block",
                    selected ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="relative min-h-[26rem] rounded-2xl border border-border bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.03)] sm:p-8">
          {/* Corner watermark index */}
          <span className="pointer-events-none absolute right-6 top-5 font-mono text-xs tracking-widest text-muted/60">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={uc.id}
              id={`uc-panel-${uc.id}`}
              role="tabpanel"
              aria-labelledby={`uc-tab-${uc.id}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent shadow-sm">
                  <Icon aria-hidden className="size-7" />
                </span>
                <div className="pr-16">
                  <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {uc.tagline}
                  </span>
                  <h3 className="mt-2 text-balance text-2xl font-bold tracking-tight text-foreground">
                    {uc.title}
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-l-2 border-accent/20 pl-5">
                {uc.intro.map((p) => (
                  <p key={p} className="text-pretty leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent">
                    Key Capabilities
                  </h4>
                  <motion.ul
                    variants={reduce ? undefined : listStagger}
                    initial={reduce ? undefined : "hidden"}
                    animate={reduce ? undefined : "show"}
                    className="mt-4 space-y-2.5"
                  >
                    {uc.capabilities.map((c) => (
                      <motion.li
                        key={c}
                        variants={reduce ? undefined : listItem}
                        className="flex gap-2.5 text-pretty text-sm leading-relaxed text-muted"
                      >
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span>{c}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent">
                    Business Benefits
                  </h4>
                  <motion.ul
                    variants={reduce ? undefined : listStagger}
                    initial={reduce ? undefined : "hidden"}
                    animate={reduce ? undefined : "show"}
                    className="mt-4 space-y-2.5"
                  >
                    {uc.benefits.map((b) => (
                      <motion.li
                        key={b}
                        variants={reduce ? undefined : listItem}
                        className="flex items-center gap-2.5 rounded-lg bg-surface-raised px-3 py-2 text-pretty text-sm font-medium text-foreground"
                      >
                        <TrendingUp aria-hidden className="size-4 shrink-0 text-accent" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
