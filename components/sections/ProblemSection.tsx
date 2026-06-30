import { problem } from "@/content/problem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PainPointCard } from "./PainPointCard";

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

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {problem.painPoints.map((p, i) => (
          <Reveal key={p.title} className="h-full" delay={i * 0.05}>
            <PainPointCard painPoint={p} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mx-auto mt-12 max-w-3xl text-balance text-center text-lg font-medium">
          {problem.closing}
        </p>
      </Reveal>
    </Section>
  );
}
