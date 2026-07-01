import Image from "next/image";
import { differentiators } from "@/content/differentiators";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CodeParticles } from "@/components/ui/CodeParticles";
import { ScrollGrowPanel } from "@/components/ui/ScrollGrowPanel";
import { FeatureCard } from "./FeatureCard";

// Asymmetric bento spans: two wide lead cards, three equal cards beneath.
const spans = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

/**
 * SECTION 3 — Why NovaCrystara (arch §5 #3).
 * Signature DARK panel that scroll-scales into view: small → full-size on a
 * light backdrop, with the data-network artwork, faint code motion and spotlight
 * pillar cards. A deliberate contrast break right after the light Problem bento.
 */
export function DifferentiatorSection() {
  return (
    <section id="why" className="scroll-mt-24 bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <ScrollGrowPanel
          from={0.66}
          className="relative overflow-hidden border border-white/15 bg-ink text-white shadow-[0_50px_140px_-40px_rgba(78,143,82,0.35)]"
        >
          {/* Ambient background: data-network artwork + faint code motion + legibility gradient */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/images/data_network.png"
              alt=""
              fill
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
            <CodeParticles
              className="mask-radial-fade absolute inset-0 opacity-60"
              maxOpacity={0.07}
              density={0.001}
            />
          </div>

          <div className="relative z-10 px-6 py-16 sm:px-10 md:px-14 md:py-20">
            <div className="mx-auto max-w-7xl">
              <Reveal className="max-w-3xl">
                <Eyebrow label="Why NovaCrystara" tone="dark" />
                <h2 className="mt-5 text-balance text-h2 font-semibold text-white">
                  {differentiators.heading}
                </h2>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-white/90">
                  {differentiators.intro}
                </p>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {differentiators.pillars.map((pillar, i) => (
                  <Reveal key={pillar.title} className={`h-full ${spans[i]}`} delay={i * 0.06}>
                    <FeatureCard pillar={pillar} index={i} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollGrowPanel>
      </div>
    </section>
  );
}
