import Link from "next/link";
import { ArrowRight, Bot, Layers, Workflow, Puzzle, RefreshCw, type LucideIcon } from "lucide-react";
import { solutions } from "@/content/solutions";
import { liveAgents } from "@/content/agents";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionCard } from "./SolutionCard";

// Map each solution (by title) to a Lucide icon.
const iconByTitle: Record<string, LucideIcon> = {
  "AI Agents": Bot,
  "Enterprise AI Platforms": Layers,
  "Intelligent Automation": Workflow,
  "AI Integration": Puzzle,
  "AI Modernization": RefreshCw,
};

// First card is featured (spans two columns of the bento).
const spans = ["sm:col-span-2 lg:col-span-2", "", "", "", ""];

/** SECTION 4 — What We Build (arch §5 #4). Blueprint bento of solution offerings. */
export function SolutionsSection() {
  return (
    <Section id="solutions" className="relative overflow-hidden">
      {/* Faint blueprint grid wash */}
      <div
        aria-hidden
        className="bg-blueprint mask-fade-b pointer-events-none absolute inset-0 -z-10 opacity-60"
      />

      <Reveal className="max-w-3xl">
        <Eyebrow label="What We Build" />
        <h2 className="mt-5 text-balance text-h2 font-semibold">{solutions.heading}</h2>
        <p className="mt-4 text-pretty text-lg text-muted">{solutions.intro}</p>
      </Reveal>

      {/* Shared dashed borders (no gaps), varied sizes — the featured lead card spans two cells. */}
      <Reveal>
        <div className="mt-10 grid grid-cols-1 border-l border-t border-dashed border-zinc-400 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.solutions.map((s, i) => (
            <SolutionCard
              key={s.title}
              solution={s}
              icon={iconByTitle[s.title] ?? Bot}
              index={i}
              featured={i === 0}
              className={spans[i]}
            />
          ))}
        </div>
      </Reveal>

      {/* Shipped autonomous employees — route into their landing pages. */}
      <Reveal>
        <div className="mt-8 flex flex-col gap-5 border border-white/10 bg-ink px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#7ed98d]">
              Autonomous AI employees
            </p>
            <p className="mt-2 text-pretty text-lg font-semibold">
              Meet the agents already doing the work — starting with Nova Helix.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {liveAgents.map((agent) => (
              <Link
                key={agent.slug}
                href={`/agents/${agent.slug}`}
                className="group inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5fa863] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed98d] focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {agent.name}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
