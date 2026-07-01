import { engagement } from "@/content/engagement";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { EngagementCard } from "./EngagementCard";

/** SECTION 8 — Engagement Models (arch §5 #8). A scaling ladder (no carousel controls). */
export function EngagementSection() {
  const total = engagement.models.length;
  return (
    <Section id="engage">
      <Reveal className="max-w-3xl">
        <Eyebrow label="Engagement Models" />
        <h2 className="mt-5 text-balance text-h2 font-semibold">{engagement.heading}</h2>
        <p className="mt-4 text-pretty text-lg text-muted">{engagement.intro}</p>
      </Reveal>

      <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {engagement.models.map((m, i) => (
          <Reveal key={m.title} className="h-full" delay={i * 0.06}>
            <EngagementCard model={m} index={i} total={total} />
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
