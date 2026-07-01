import { ArrowRight } from "lucide-react";
import { problem } from "@/content/problem";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PainPointCard } from "./PainPointCard";

// Bento sizes per card (index matches content order). Each row is 7.5rem tall;
// the two lead cards span 2 rows, the trailing rows pair a small + wide cell.
const cardSpans = [
  "md:col-span-2 md:row-span-2", // Pilot
  "md:col-span-2 md:row-span-2", // Architecture
  "md:col-span-1", //              Talent
  "md:col-span-3", //              ROI
  "md:col-span-1", //              Vendor
  "md:col-span-3", //              Governance
];

/** SECTION 2 — The Problem (arch §5 #2). Blueprint bento of enterprise AI pain points. */
export function ProblemSection() {
  return (
    <Section id="problem" className="relative overflow-hidden">
      {/* Faint blueprint grid wash behind the section */}
      <div
        aria-hidden
        className="bg-blueprint mask-fade-b pointer-events-none absolute inset-0 -z-10 opacity-60"
      />

      <Reveal className="max-w-3xl">
        <Eyebrow label="The Reality" index={2} />
        <h2 className="mt-5 text-balance text-h2 font-semibold">{problem.heading}</h2>
        <p className="mt-4 text-pretty text-lg text-muted">{problem.intro}</p>
      </Reveal>

      {/* Editorial bento: sharp edges, shared dotted borders (no gaps), varied sizes.
          Order: Pilot · Architecture · Talent · ROI · Vendor · Governance. */}
      <Reveal>
        <div className="mt-10 grid grid-cols-1 border-l border-t border-dashed border-zinc-400 md:grid-cols-4 md:[grid-template-rows:repeat(4,minmax(7.5rem,auto))]">
          {problem.painPoints.map((p, i) => (
            <PainPointCard key={p.title} painPoint={p} index={i} className={cardSpans[i]} />
          ))}
        </div>
      </Reveal>

      {/* Closing callout — reframes the pain points as a reason to choose a partner. */}
      <Reveal>
        <div className="group mt-8 flex flex-col items-start gap-5 rounded-none border border-accent/25 bg-surface-raised p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-3xl text-pretty text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            {problem.closing}
          </p>
          <a
            href="#why"
            className="inline-flex shrink-0 items-center gap-2 rounded-none bg-accent px-5 py-2.5 text-sm font-semibold text-snow transition-all duration-300 hover:gap-3 hover:bg-accent-strong"
          >
            See how
            <ArrowRight aria-hidden className="size-4" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
