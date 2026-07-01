import { about } from "@/content/about";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

/** OPTIONAL — About Us (arch §5 O1). Editorial split with a grounding stat card. */
export function AboutSection() {
  return (
    <Section id="about" className="bg-surface">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        {/* Left rail: eyebrow + stat card */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow label="About Us" index={9} />
          <div className="mt-6 overflow-hidden rounded-2xl border border-accent/25 bg-ink p-7 text-white">
            <p className="font-mono text-xs uppercase tracking-widest text-[#7ed98d]">
              Combined delivery
            </p>
            <p className="mt-3 text-6xl font-semibold tracking-tight">
              <CountUp value={30} suffix="+" />
            </p>
            <p className="mt-2 text-sm text-white/60">
              Years leading large-scale enterprise IT programs — for organizations that couldn&apos;t
              afford failure.
            </p>
            <p className="mt-6 border-t border-white/10 pt-5 text-pretty font-medium text-[#a6e8b1]">
              {site.footer.tagline}
            </p>
          </div>
        </Reveal>

        {/* Right: heading + paragraphs */}
        <Reveal>
          <h2 className="max-w-2xl text-balance text-h2 font-semibold">{about.heading}</h2>
          <div className="mt-8 max-w-2xl space-y-5 border-l-2 border-accent/20 pl-6">
            {about.paragraphs.map((p) => (
              <p key={p} className="text-pretty text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
