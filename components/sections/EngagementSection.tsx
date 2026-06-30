import { engagement } from "@/content/engagement";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EngagementCard } from "./EngagementCard";

/** SECTION 8 — Engagement Models (arch §5 #8). */
export function EngagementSection() {
  return (
    <Section id="engage">
      <Reveal>
        <SectionHeading
          eyebrow="Engagement Models"
          title={engagement.heading}
          subtitle={engagement.intro}
          align="center"
        />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {engagement.models.map((m, i) => (
          <Reveal key={m.title} className="h-full" delay={i * 0.05}>
            <EngagementCard model={m} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mx-auto mt-12 max-w-2xl text-balance text-center text-lg font-medium">
          {engagement.closing}
        </p>
      </Reveal>
    </Section>
  );
}
