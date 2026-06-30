import { useCases } from "@/content/useCases";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { UseCaseCard } from "./UseCaseCard";

/**
 * SECTION 5 — Enterprise AI Use Cases (arch §5 #5, §7).
 * Responsive grid of expandable cards — collapsed teasers that expand inline to full detail.
 */
export function UseCasesSection() {
  return (
    <Section id="use-cases" className="bg-surface">
      <Reveal>
        <SectionHeading
          eyebrow="Use Cases"
          title={useCases.heading}
          subtitle={useCases.tagline}
          align="center"
        />
      </Reveal>

      <div className="mt-14 grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {useCases.useCases.map((uc) => (
          <UseCaseCard key={uc.id} useCase={uc} />
        ))}
      </div>
    </Section>
  );
}
