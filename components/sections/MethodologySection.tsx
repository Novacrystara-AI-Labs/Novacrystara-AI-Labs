import { methodology } from "@/content/methodology";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TimelineStep } from "./TimelineStep";

/** SECTION 6 — Methodology / Approach (arch §5 #6). */
export function MethodologySection() {
  return (
    <Section id="approach">
      <Reveal>
        <SectionHeading
          eyebrow="Our Approach"
          title={methodology.heading}
          subtitle={methodology.intro}
        />
      </Reveal>

      <Reveal>
        <ol className="mt-14 max-w-3xl">
          {methodology.phases.map((phase, i) => (
            <TimelineStep
              key={phase.title}
              phase={phase}
              index={i}
              isLast={i === methodology.phases.length - 1}
            />
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
