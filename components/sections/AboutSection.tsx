import { Check } from "lucide-react";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

// Operating principles — pulled verbatim from the About copy's ethos.
const principles = ["Architecture discipline", "Honest scoping", "Relentless production readiness"];

/** OPTIONAL — About Us (arch §5 O1). Editorial narrative + a premium stat panel. */
export function AboutSection() {
  return (
    <Section id="about" className="bg-surface">
      <Reveal className="max-w-3xl">
        <Eyebrow label="About Us" />
        <h2 className="mt-5 text-balance text-h2 font-semibold">{about.heading}</h2>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        {/* Left — narrative + operating principles */}
        <Reveal>
          <div>
            {/* Lead paragraph — accent bar + emphasis */}
            <div className="relative pl-6">
              <span
                aria-hidden
                className="absolute inset-y-1 left-0 w-[3px] bg-gradient-to-b from-accent to-accent/0"
              />
              <p className="text-pretty text-xl font-medium leading-relaxed text-foreground">
                {about.paragraphs[0]}
              </p>
            </div>

            {/* Supporting paragraph */}
            <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground/90">
              {about.paragraphs[1]}
            </p>

            {/* Operating principles */}
            <div className="mt-10 border-t border-border pt-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
                How we operate
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {principles.map((pr) => (
                  <li
                    key={pr}
                    className="group flex items-start gap-3 border border-border bg-surface-raised/60 p-4 transition-colors hover:border-accent/40"
                  >
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center bg-accent text-white">
                      <Check aria-hidden className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium leading-snug text-foreground">{pr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Right — premium stat panel */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden border border-white/10 bg-ink p-8 text-white shadow-[0_30px_90px_-30px_rgba(78,143,82,0.35)] sm:p-10">
            {/* ambient glow + blueprint */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="bg-blueprint-dark absolute inset-0 opacity-40" />
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.35),transparent_70%)] blur-2xl" />
            </div>

            {/* technical corner brackets */}
            <span aria-hidden className="pointer-events-none absolute left-3 top-3 size-5 border-l border-t border-[#7ed98d]/50" />
            <span aria-hidden className="pointer-events-none absolute right-3 top-3 size-5 border-r border-t border-[#7ed98d]/50" />
            <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 size-5 border-b border-l border-[#7ed98d]/50" />
            <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 size-5 border-b border-r border-[#7ed98d]/50" />

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#7ed98d]">
                Combined delivery
              </p>
              <p className="mt-4 text-7xl font-semibold leading-none tracking-tight">
                <CountUp value={30} suffix="+" />
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Years leading large-scale enterprise IT programs — for organizations that
                couldn&apos;t afford failure.
              </p>

              <p className="mt-8 border-t border-white/10 pt-6 font-mono text-sm uppercase tracking-[0.22em] text-[#a6e8b1]">
                {site.footer.tagline}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
