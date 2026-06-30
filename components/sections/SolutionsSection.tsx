import { solutions } from "@/content/solutions";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionCard } from "./SolutionCard";

/** SECTION 4 — What We Build (arch §5 #4). */
export function SolutionsSection() {
  return (
    <Section id="solutions">
      <Reveal>
        <SectionHeading
          eyebrow="What We Build"
          title={solutions.heading}
          subtitle={solutions.intro}
          align="center"
        />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.solutions.map((s, i) => (
          <Reveal key={s.title} className="h-full" delay={i * 0.05}>
            <SolutionCard solution={s} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
