"use client";

import Link from "next/link";
import { useEffect, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Compass,
  Headphones,
  Lock,
  Receipt,
  ShieldCheck,
  Users,
  X,
  type LucideProps,
} from "lucide-react";
import { agents, agentsIntro, liveAgents } from "@/content/agents";
import { cn } from "@/lib/utils";
import type { Agent } from "@/types";

type Icon = ComponentType<LucideProps>;

const agentIcons: Record<string, Icon> = {
  Users,
  Receipt,
  ShieldCheck,
  Compass,
  Headphones,
};

/** Signature easing — fast pickup, long settle. */
const EASE = [0.16, 1, 0.3, 1] as const;

const liveCount = liveAgents.length;
const comingSoon = agents.filter((a) => a.status !== "live");

/**
 * "AI Employees" mega-menu — a dedicated roster showcase, distinct from the
 * general Solutions menu. A dark editorial intro panel on the left frames the
 * idea; the right pane leads with the one live employee (Nova Helix, bold and
 * clickable) and stages the rest as locked "in build" tiles beneath it.
 */
export function AgentsMegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();

  // Dismissal wiring — mirrors the Solutions menu: escape, any link click, hash
  // jumps, back/forward, and shrinking below the desktop breakpoint all close
  // it. Page scroll is frozen while open (the gutter is reserved in globals.css,
  // so there's no layout shift).
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onDocClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest?.("a[href]")) onClose();
    };
    const onHashChange = () => onClose();
    const onPopState = () => onClose();

    const mq = window.matchMedia("(max-width: 1023px)");
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    if (mq.matches) onClose();

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onPopState);
    mq.addEventListener("change", onBreakpoint);

    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onPopState);
      mq.removeEventListener("change", onBreakpoint);
      body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* Scrim over the page below the header */}
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 top-16 z-40 cursor-default bg-black/40 backdrop-blur-[2px]"
          />

          {/* Curtain drop — the panel unfolds downward from its top edge */}
          <motion.div
            id="ai-employees-mega-menu"
            initial={reduce ? undefined : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? undefined : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.62, ease: EASE }}
            className="fixed inset-x-0 top-16 z-50 flex h-[min(36rem,calc(100vh-8rem))] flex-col overflow-hidden border-b border-border bg-background shadow-[0_40px_100px_-30px_rgba(0,0,0,0.35)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-4 top-5 z-20 inline-flex size-9 items-center justify-center border border-white/20 bg-black/30 text-white/80 backdrop-blur transition-colors hover:border-[#7ed98d] hover:text-[#7ed98d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed98d] sm:right-6 lg:border-border lg:bg-background lg:text-muted lg:hover:border-accent lg:hover:text-accent"
            >
              <X aria-hidden className="size-4" />
            </button>

            <div className="relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 overflow-hidden lg:grid-cols-[22rem_1fr]">
              {/* ── Intro rail — dark editorial framing ─────────────────── */}
              <motion.div
                data-lenis-prevent
                initial={reduce ? undefined : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
                className="relative hidden overflow-hidden bg-ink px-8 py-9 text-white lg:flex lg:flex-col"
              >
                {/* Ambient glow + dotted field for depth */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <div className="bg-dotgrid-dark mask-radial-fade absolute inset-0 opacity-40" />
                  <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.35),transparent_70%)] blur-2xl animate-glow-pulse" />
                </div>

                <div className="relative flex h-full flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#7ed98d]">
                    AI Employees
                  </p>
                  <h2 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight">
                    One hire runs the whole function.
                  </h2>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-white/70">
                    {agentsIntro.body}
                  </p>

                  {/* Roster tally */}
                  <dl className="mt-7 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
                    <div className="bg-ink px-4 py-3.5">
                      <dt className="sr-only">Live now</dt>
                      <dd>
                        <span className="block text-2xl font-bold tracking-tight text-[#7ed98d]">
                          {String(liveCount).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                          Live now
                        </span>
                      </dd>
                    </div>
                    <div className="bg-ink px-4 py-3.5">
                      <dt className="sr-only">In build</dt>
                      <dd>
                        <span className="block text-2xl font-bold tracking-tight text-white">
                          {String(comingSoon.length).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                          In build
                        </span>
                      </dd>
                    </div>
                  </dl>

                  <Link
                    href={agentsIntro.hubHref}
                    onClick={onClose}
                    className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-[#7ed98d] transition-colors hover:text-white"
                  >
                    {agentsIntro.hubLabel}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>

              {/* ── Roster pane ─────────────────────────────────────────── */}
              <div
                data-lenis-prevent
                className="relative overflow-y-auto overscroll-contain px-4 py-6 sm:px-8 lg:py-9"
              >
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
                >
                  {/* Editorial header — kicker + tagline, hairline-separated */}
                  <div className="flex items-end justify-between gap-4 border-b border-border pb-4 pr-10 lg:pr-0">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                        Meet the team
                      </p>
                      <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">
                        Employees, not tools.
                      </h3>
                    </div>
                    <p className="shrink-0 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/55">
                      {String(liveCount).padStart(2, "0")} live ·{" "}
                      {String(comingSoon.length).padStart(2, "0")} in build
                    </p>
                  </div>

                  {/* Featured live employees */}
                  <div className="mt-6 grid gap-4">
                    {liveAgents.map((agent) => (
                      <FeaturedAgent
                        key={agent.slug}
                        agent={agent}
                        index={agents.indexOf(agent)}
                        onNavigate={onClose}
                      />
                    ))}
                  </div>

                  {/* In-build roster — staggers in beneath the live employee */}
                  <p className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/55">
                    <span aria-hidden className="h-px w-6 bg-accent" />
                    Joining the team soon
                  </p>
                  <motion.div
                    className="mt-4 grid gap-3 sm:grid-cols-2"
                    initial={reduce ? undefined : "hidden"}
                    animate={reduce ? undefined : "show"}
                    variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } } }}
                  >
                    {comingSoon.map((agent) => (
                      <LockedAgent key={agent.slug} agent={agent} index={agents.indexOf(agent)} />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* ── Dossier entries ───────────────────────────────────────────────────── */

/** Small technical corner ticks — two-sided L-brackets at each corner. */
function CornerBrackets({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className="absolute left-0 top-0 size-3.5 border-l border-t border-accent/50" />
      <span className="absolute right-0 top-0 size-3.5 border-r border-t border-accent/50" />
      <span className="absolute bottom-0 left-0 size-3.5 border-b border-l border-accent/50" />
      <span className="absolute bottom-0 right-0 size-3.5 border-b border-r border-accent/50" />
    </span>
  );
}

function FeaturedAgent({
  agent,
  index,
  onNavigate,
}: {
  agent: Agent;
  index: number;
  onNavigate: () => void;
}) {
  const Icon = agentIcons[agent.icon] ?? Bot;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/agents/${agent.slug}`}
      onClick={onNavigate}
      className="spotlight spotlight-dark group relative block overflow-hidden border border-white/10 bg-ink p-6 text-white transition-colors duration-300 hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:p-8"
    >
      {/* Ambient corner glow + technical framing */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.35),transparent_70%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-70"
      />
      <CornerBrackets className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Oversized index watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 right-3 select-none font-mono text-[7rem] font-bold leading-none tracking-tight text-white/[0.04]"
      >
        {num}
      </span>

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        {/* Emblem */}
        <span className="inline-flex size-14 shrink-0 items-center justify-center bg-accent/15 text-[#7ed98d] transition-colors duration-300 group-hover:bg-accent group-hover:text-white sm:size-16">
          <Icon aria-hidden className="size-7 sm:size-8" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Employee {num}
              </p>
              <h3 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight">
                {agent.name}
                <ArrowRight
                  aria-hidden
                  className="size-5 -translate-x-1 text-[#7ed98d] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#7ed98d]/80">
                {agent.role}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 border border-[#7ed98d]/30 bg-[#7ed98d]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#7ed98d]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7ed98d]/70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#7ed98d]" />
              </span>
              Live now
            </span>
          </div>

          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-white/70">
            {agent.description}
          </p>

          {agent.highlights ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {agent.highlights.map((h) => (
                <li
                  key={h}
                  className="border border-white/10 bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60"
                >
                  {h}
                </li>
              ))}
            </ul>
          ) : null}

          <span className="mt-5 inline-flex items-center gap-2 border-b border-[#7ed98d]/40 pb-0.5 text-sm font-semibold text-white transition-colors group-hover:border-[#7ed98d]">
            Explore {agent.name}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

function LockedAgent({ agent, index }: { agent: Agent; index: number }) {
  const Icon = agentIcons[agent.icon] ?? Bot;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.45, ease: EASE }}
      aria-disabled
      className="relative flex select-none flex-col overflow-hidden border border-border bg-white/60 p-5 backdrop-blur-md"
    >
      {/* Frost sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-accent/5"
      />
      <div className="relative flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] tabular-nums tracking-widest text-muted/35">
            {num}
          </span>
          <span className="inline-flex size-9 shrink-0 items-center justify-center border border-white/70 bg-white/50 text-muted/40 shadow-inner backdrop-blur">
            <Icon aria-hidden className="size-4" />
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 border border-black/10 bg-white/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted/60 backdrop-blur">
          <Lock aria-hidden className="size-2.5" />
          {agent.eta ?? "Coming soon"}
        </span>
      </div>

      <h3 className="relative mt-4 text-base font-bold tracking-tight text-foreground/50">
        {agent.name}
      </h3>
      <p className="relative mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted/40">
        {agent.role}
      </p>
      <p className="relative mt-2 text-pretty text-sm leading-relaxed text-muted/45 line-clamp-2">
        {agent.description}
      </p>
    </motion.div>
  );
}
