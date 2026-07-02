import { ArrowRight } from "lucide-react";
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
        <div className="mt-12 flex flex-col items-start gap-5 rounded-none border border-accent/25 bg-surface-raised p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-3xl text-pretty text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            {engagement.closing}
          </p>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-none bg-accent px-5 py-2.5 text-sm font-semibold text-snow transition-all duration-300 hover:gap-3 hover:bg-accent-strong"
          >
            Let&apos;s talk
            <ArrowRight aria-hidden className="size-4" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
