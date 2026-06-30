import { differentiators } from "@/content/differentiators";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureCard } from "./FeatureCard";

/** SECTION 3 — Why NovaCrystara (arch §5 #3). */
export function DifferentiatorSection() {
  return (
    <Section id="why" className="bg-surface">
      <Reveal>
        <SectionHeading
          eyebrow="Why NovaCrystara"
          title={differentiators.heading}
          subtitle={differentiators.intro}
          align="center"
        />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.pillars.map((pillar, i) => (
          <Reveal key={pillar.title} className="h-full" delay={i * 0.05}>
            <FeatureCard pillar={pillar} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
