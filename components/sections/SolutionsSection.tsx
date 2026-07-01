import { Bot, Layers, Workflow, Puzzle, RefreshCw, type LucideIcon } from "lucide-react";
import { solutions } from "@/content/solutions";
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
    </Section>
  );
}
