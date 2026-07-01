import Image from "next/image";
import { differentiators } from "@/content/differentiators";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CodeParticles } from "@/components/ui/CodeParticles";
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
 * Signature DARK section: black canvas, green glow + blueprint grid, spotlight
 * pillar cards. A deliberate contrast break right after the light Problem bento.
 */
export function DifferentiatorSection() {
  return (
    <section
      id="why"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-16 text-white md:py-24"
    >
      {/* Ambient background: data-network artwork + faint code motion + legibility gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/data_network.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Darken the left/centre so the heading + cards stay legible; keep the
            top-right city art visible. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
        {/* Faint drifting glyphs, confined to the empty centre for subtle motion */}
        <CodeParticles
          className="mask-radial-fade absolute inset-0 opacity-60"
          maxOpacity={0.07}
          density={0.001}
        />
        {/* Blend edges into the neighbouring light sections */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      </div>

      <Container className="relative z-10">
        <Reveal className="max-w-3xl">
          <Eyebrow label="Why NovaCrystara" index={3} tone="dark" />
          <h2 className="mt-5 text-balance text-h2 font-semibold text-white">
            {differentiators.heading}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-white/60">
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
      </Container>
    </section>
  );
}
