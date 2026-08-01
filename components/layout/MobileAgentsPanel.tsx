"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, Lock } from "lucide-react";
import { agents } from "@/content/agents";
import { cn } from "@/lib/utils";

/**
 * Mobile counterpart to the desktop "AI Employees" mega-menu — a disclosure that
 * expands into the autonomous-agent roster: live agents link to their page,
 * unreleased ones stay locked.
 */
export function MobileAgentsPanel({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-2 py-3 text-base text-white/85 transition-colors hover:text-white"
      >
        AI Employees
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-300", expanded && "rotate-180")}
        />
      </button>

      {expanded ? (
        <div className="details-reveal space-y-2 pb-4 pl-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7ed98d]">
            Meet the team
          </p>

          {agents.map((agent) =>
            agent.status === "live" ? (
              <Link
                key={agent.name}
                href={`/agents/${agent.slug}`}
                onClick={onNavigate}
                className="group flex items-center justify-between gap-3 border border-white/10 bg-white/5 px-3 py-2.5 transition-colors hover:border-accent hover:bg-accent/15"
              >
                <span>
                  <span className="block text-sm font-semibold text-white">{agent.name}</span>
                  <span className="block text-xs text-white/50">{agent.role}</span>
                </span>
                <span className="inline-flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-[#7ed98d]">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7ed98d]/70" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-[#7ed98d]" />
                    </span>
                    Live
                  </span>
                  <ArrowRight aria-hidden className="size-4 text-[#7ed98d]" />
                </span>
              </Link>
            ) : (
              <div
                key={agent.name}
                aria-disabled
                className="flex items-center justify-between gap-3 border border-white/5 bg-white/[0.03] px-3 py-2.5 backdrop-blur"
              >
                <span>
                  <span className="block text-sm font-semibold text-white/40">{agent.name}</span>
                  <span className="block text-xs text-white/25">{agent.role}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
                  <Lock aria-hidden className="size-3" />
                  Soon
                </span>
              </div>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}
