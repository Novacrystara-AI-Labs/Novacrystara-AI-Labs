import { ArrowRight } from "lucide-react";
import { engagement } from "@/content/engagement";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { EngagementCard } from "./EngagementCard";

/** SECTION 8 — Engagement Models (arch §5 #8). A connected "scaling ladder". */
export function EngagementSection() {
  const total = engagement.models.length;
  return (
    <Section id="engage">
      <Reveal className="max-w-3xl">
        <Eyebrow label="Engagement Models" index={8} />
        <h2 className="mt-5 text-balance text-h2 font-semibold">{engagement.heading}</h2>
        <p className="mt-4 text-pretty text-lg text-muted">{engagement.intro}</p>
      </Reveal>

      <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {engagement.models.map((m, i) => (
          <div key={m.title} className="relative">
            <Reveal className="h-full" delay={i * 0.06}>
              <EngagementCard model={m} index={i} total={total} />
            </Reveal>
            {/* Connector arrow between steps (desktop) */}
            {i < total - 1 ? (
              <span
                aria-hidden
                className="absolute -right-3.5 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-accent lg:flex lg:size-7"
              >
                <ArrowRight className="size-4" />
              </span>
            ) : null}
          </div>
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
