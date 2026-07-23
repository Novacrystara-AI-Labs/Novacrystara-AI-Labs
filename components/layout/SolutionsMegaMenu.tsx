"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronRight,
  Compass,
  Headphones,
  Layers,
  Lock,
  Puzzle,
  Receipt,
  RefreshCw,
  ShieldCheck,
  Users,
  Workflow,
  X,
  type LucideProps,
} from "lucide-react";
import { agents, agentsIntro } from "@/content/agents";
import { solutions } from "@/content/solutions";
import { useCases } from "@/content/useCases";
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

const solutionIcons: Record<string, Icon> = {
  "AI Agents": Bot,
  "Enterprise AI Platforms": Layers,
  "Intelligent Automation": Workflow,
  "AI Integration": Puzzle,
  "AI Modernization": RefreshCw,
};

/** Signature easing — fast pickup, long settle. */
const EASE = [0.16, 1, 0.3, 1] as const;

type CategoryId = "agents" | "solutions" | "use-cases";

const categories: { id: CategoryId; label: string }[] = [
  { id: "agents", label: "Autonomous AI Employees" },
  { id: "solutions", label: "By solution" },
  { id: "use-cases", label: "By use case" },
];

/**
 * Full-width "Solutions" mega-menu (AWS-style): a category rail on the left and
 * a content pane on the right. The default pane lists our autonomous agents —
 * Nova Helix links through to its landing page, the unreleased agents render as
 * locked glassmorphism tiles.
 */
export function SolutionsMegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [category, setCategory] = useState<CategoryId>("agents");
  const reduce = useReducedMotion();

  // Everything that must dismiss the panel. Route changes alone aren't enough:
  // most of our nav is same-page anchors (#approach), which never change the
  // pathname — so the panel would sit open over the section you just jumped to.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Any link click anywhere (nav, panel, logo, footer) dismisses it. Bubble
    // phase, so Next's <Link> still performs the navigation.
    const onDocClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest?.("a[href]")) onClose();
    };

    // Hash jumps + browser back/forward.
    const onHashChange = () => onClose();
    const onPopState = () => onClose();

    // The panel is desktop-only (`hidden lg:block`). Without this, shrinking the
    // window would hide it while leaving the page scroll-locked — a dead site.
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

    // `scrollbar-gutter: stable` (globals.css) keeps the gutter reserved, so
    // freezing the page here causes no layout shift.
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

  // Always reopen on the default pane. Kept separate from the effect above so a
  // parent re-render (which recreates `onClose`) can't reset the active tab.
  useEffect(() => {
    if (!open) setCategory("agents");
  }, [open]);

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

          {/* Curtain drop: the panel is wiped in from its top edge rather than
              popped, so it reads as the page unfolding downward. */}
          <motion.div
            id="solutions-mega-menu"
            initial={reduce ? undefined : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? undefined : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.62, ease: EASE }}
            className="fixed inset-x-0 top-16 z-50 flex h-[min(34rem,calc(100vh-8rem))] flex-col overflow-hidden border-b border-border bg-background shadow-[0_40px_100px_-30px_rgba(0,0,0,0.35)]"
          >
            <div
              aria-hidden
              className="bg-blueprint pointer-events-none absolute inset-0 opacity-50"
            />

            {/* Close — pinned to the panel, never scrolls away */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-4 top-5 z-10 inline-flex size-9 items-center justify-center border border-border bg-background text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6"
            >
              <X aria-hidden className="size-4" />
            </button>

            <div className="relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 overflow-hidden lg:grid-cols-[16rem_1fr]">
              {/* Category rail — fixed; only the content pane scrolls */}
              <motion.div
                data-lenis-prevent
                initial={reduce ? undefined : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
                className="shrink-0 overflow-y-auto overscroll-contain border-border px-4 py-6 lg:border-r lg:px-6 lg:py-8"
              >
                <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
                  {categories.map((c) => {
                    const active = c.id === category;
                    return (
                      <li key={c.id} className="shrink-0 lg:shrink">
                        <button
                          type="button"
                          onClick={() => setCategory(c.id)}
                          aria-current={active}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors duration-200",
                            active
                              ? "bg-ink text-white"
                              : "text-foreground/70 hover:bg-surface-raised hover:text-foreground",
                          )}
                        >
                          {c.label}
                          <ChevronRight
                            aria-hidden
                            className={cn(
                              "size-4 shrink-0 transition-opacity",
                              active ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>

              {/* Content pane — scrolls inside the panel */}
              <div
                data-lenis-prevent
                className="relative overflow-y-auto overscroll-contain px-4 py-6 sm:px-8 lg:py-10"
              >
                <motion.div
                  key={category}
                  initial={reduce ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                  className="pb-2"
                >
                  {category === "agents" ? <AgentsPane onNavigate={onClose} /> : null}
                  {category === "solutions" ? <SolutionsPane onNavigate={onClose} /> : null}
                  {category === "use-cases" ? <UseCasesPane onNavigate={onClose} /> : null}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* ── Panes ─────────────────────────────────────────────────────────────── */

function PaneHeader({
  eyebrow,
  title,
  body,
  href,
  linkLabel,
  onNavigate,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  onNavigate: () => void;
}) {
  return (
    <div className="max-w-2xl pr-12">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      <p className="mt-3 text-pretty leading-relaxed text-muted">{body}</p>
      <Link
        href={href}
        onClick={onNavigate}
        className="group mt-4 inline-flex items-center gap-2 border-b border-accent pb-0.5 text-sm font-semibold text-accent transition-colors hover:border-accent-strong hover:text-accent-strong"
      >
        {linkLabel}
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

function AgentsPane({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div>
      <PaneHeader
        eyebrow="Autonomous agents"
        title={agentsIntro.heading}
        body={agentsIntro.body}
        href={agentsIntro.hubHref}
        linkLabel={agentsIntro.hubLabel}
        onNavigate={onNavigate}
      />

      <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <AgentTile key={agent.name} agent={agent} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function AgentTile({ agent, onNavigate }: { agent: Agent; onNavigate: () => void }) {
  const Icon = agentIcons[agent.icon] ?? Bot;

  if (agent.status === "live") {
    return (
      <Link
        href={`/agents/${agent.slug}`}
        onClick={onNavigate}
        className="group relative flex flex-col overflow-hidden bg-white p-5 transition-colors duration-300 hover:bg-[#e2f5e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
            <Icon aria-hidden className="size-5" />
          </span>
          <span className="inline-flex items-center gap-1.5 border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-strong">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Live
          </span>
        </div>

        <h3 className="mt-4 flex items-center gap-1.5 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-strong">
          {agent.name}
          <ArrowRight
            aria-hidden
            className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </h3>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted/70">
          {agent.role}
        </p>
        <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted">{agent.description}</p>
      </Link>
    );
  }

  // Locked / unreleased — frosted glass tile.
  return (
    <div
      aria-disabled
      className="relative flex select-none flex-col overflow-hidden bg-white/60 p-5 backdrop-blur-md"
    >
      {/* Frost sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-accent/5"
      />
      <div className="relative flex items-center gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center border border-white/70 bg-white/50 text-muted/40 shadow-inner backdrop-blur">
          <Icon aria-hidden className="size-5" />
        </span>
        <span className="inline-flex items-center gap-1.5 border border-black/10 bg-white/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted/60 backdrop-blur">
          <Lock aria-hidden className="size-2.5" />
          {agent.eta ?? "Coming soon"}
        </span>
      </div>

      <h3 className="relative mt-4 text-base font-bold tracking-tight text-foreground/45">
        {agent.name}
      </h3>
      <p className="relative mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted/40">
        {agent.role}
      </p>
      <p className="relative mt-2.5 text-pretty text-sm leading-relaxed text-muted/45">
        {agent.description}
      </p>
    </div>
  );
}

function SolutionsPane({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div>
      <PaneHeader
        eyebrow="What we build"
        title={solutions.heading}
        body={solutions.intro}
        href="/#solutions"
        linkLabel="Go to solutions"
        onNavigate={onNavigate}
      />

      <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
        {solutions.solutions.map((s) => {
          const Icon = solutionIcons[s.title] ?? Bot;
          return (
            <Link
              key={s.title}
              href="/#solutions"
              onClick={onNavigate}
              className="group flex gap-3 focus-visible:outline-none"
            >
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Icon aria-hidden className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-bold text-foreground transition-colors group-hover:text-accent-strong">
                  {s.title}
                </span>
                <span className="mt-1 block text-pretty text-sm leading-relaxed text-muted line-clamp-3">
                  {s.description}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function UseCasesPane({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div>
      <PaneHeader
        eyebrow="In production"
        title={useCases.heading}
        body={useCases.tagline}
        href="/#use-cases"
        linkLabel="Go to use cases"
        onNavigate={onNavigate}
      />

      <div className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
        {useCases.useCases.map((u) => (
          <Link
            key={u.id}
            href="/#use-cases"
            onClick={onNavigate}
            className="group border-l-2 border-border pl-4 transition-colors hover:border-accent focus-visible:outline-none"
          >
            <span className="block text-sm font-bold text-foreground transition-colors group-hover:text-accent-strong">
              {u.title}
            </span>
            <span className="mt-1 block text-pretty text-sm leading-relaxed text-muted">
              {u.tagline}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
