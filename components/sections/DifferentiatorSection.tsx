import { differentiators } from "@/content/differentiators";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
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
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-white md:py-32"
    >
      {/* Ambient background: blueprint grid + radial green core glow + top/bottom fades */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-blueprint-dark mask-radial-fade absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.22),transparent_70%)] blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow label="Why NovaCrystara" index={3} tone="dark" />
          <h2 className="mt-5 text-balance text-h2 font-semibold text-white">
            {differentiators.heading}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-white/60">
            {differentiators.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
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
