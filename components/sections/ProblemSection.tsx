import { problem } from "@/content/problem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

/** SECTION 2 — The Problem (arch §5 #2). */
export function ProblemSection() {
  return (
    <Section id="problem">
      <Reveal>
        <SectionHeading
          eyebrow="The Reality"
          title={problem.heading}
          subtitle={problem.intro}
          align="center"
        />
      </Reveal>

      {/* Editorial bento: sharp edges, shared borders (no gaps), varied sizes.
          Order: Pilot · Architecture · Talent · ROI · Vendor · Governance. */}
      <Reveal>
        <div className="mt-14 grid grid-cols-1 border-l border-t border-border md:grid-cols-4 md:[grid-template-rows:repeat(4,minmax(7.5rem,auto))]">
          {problem.painPoints.map((p, i) => (
            <PainPointCard key={p.title} painPoint={p} className={cardSpans[i]} />
          ))}
        </div>
      </Reveal>

      <Reveal>
        <p className="mx-auto mt-12 max-w-3xl text-balance text-center text-lg font-medium">
          {problem.closing}
        </p>
      </Reveal>
    </Section>
  );
}
