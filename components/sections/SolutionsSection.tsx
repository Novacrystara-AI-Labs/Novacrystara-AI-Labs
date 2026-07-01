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

// First card is featured (wide); the rest fill a tidy 3-col bento.
const spans = ["sm:col-span-2 lg:col-span-2", "", "", "", ""];

/** SECTION 4 — What We Build (arch §5 #4). Asymmetric bento of solution offerings. */
export function SolutionsSection() {
  return (
    <Section id="solutions">
      <Reveal className="max-w-3xl">
        <Eyebrow label="What We Build" index={4} />
        <h2 className="mt-5 text-balance text-h2 font-semibold">{solutions.heading}</h2>
        <p className="mt-4 text-pretty text-lg text-muted">{solutions.intro}</p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.solutions.map((s, i) => (
          <Reveal key={s.title} className={`h-full ${spans[i]}`} delay={i * 0.05}>
            <SolutionCard
              solution={s}
              icon={iconByTitle[s.title] ?? Bot}
              featured={i === 0}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
