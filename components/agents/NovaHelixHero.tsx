import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { novaHelix } from "@/content/novaHelix";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { NovaHelixWordmark } from "./NovaHelixWordmark";

const { hero } = novaHelix;

/**
 * Nova Helix hero — light blueprint canvas with the pitch on the left and a
 * dark founder-pricing card on the right (the site's signature black block).
 */
export function NovaHelixHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-16">
      <div aria-hidden className="bg-blueprint mask-fade-b pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-24 h-96 w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.16),transparent_70%)] blur-2xl"
      />

      <Container className="relative py-14 md:py-20">
        {/* Breadcrumb back to the agent roster */}
        <Link
          href="/#solutions"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted/60 transition-colors hover:text-accent"
        >
          <ArrowLeft
            aria-hidden
            className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
          />
          NovaCrystara AI Labs / Autonomous agents
        </Link>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Pitch */}
          <Reveal>
            <span className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-strong">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              Live now
            </span>

            <div className="mt-6">
              <NovaHelixWordmark />
            </div>

            <p className="mt-4 text-pretty text-[clamp(1.1rem,2vw,1.5rem)] font-semibold leading-snug text-accent-strong">
              {hero.trademark}
            </p>

            <p className="mt-6 text-lg font-bold leading-snug text-foreground">
              {hero.punch[0]}
              <br />
              {hero.punch[1]}
            </p>

            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted">{hero.lead}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#book-demo"
                className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-strong hover:shadow-[0_12px_32px_rgba(78,143,82,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Book Your Live Demo
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                See How It Works
              </Link>
            </div>

            <p className="mt-4 text-sm text-muted/70">{hero.note}</p>

            {/* Stat strip */}
            <dl className="mt-10 grid max-w-xl grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
              {hero.stats.map((s) => (
                <div key={s.label} className="bg-white px-5 py-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-2xl font-bold tracking-tight text-accent-strong">
                      {s.value}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-widest text-muted/70">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Founder pricing — dark signature card */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden border border-white/10 bg-ink p-6 text-white shadow-[0_40px_100px_-30px_rgba(78,143,82,0.45)] sm:p-8">
              {/* Signature helix field — ambient green glow + dotted wave lines.
                  The artwork carries both on its right side, so the crop is
                  anchored right; centring it showed only empty black. */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <Image
                  src="/images/helix_cost_background.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-cover object-right brightness-[1.6] saturate-[1.25]"
                />
                {/* Scrim is anchored to the copy edge, not the whole card, so the
                    glow and the dotted wave survive instead of washing to black. */}
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_38%,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.74)_40%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0.05)_100%)]" />
              </div>

              <div className="relative">
                <Eyebrow label={hero.price.badge} tone="dark" />

                <p className="mt-5 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    {hero.price.amount}
                  </span>
                  <span className="font-mono text-sm uppercase tracking-widest text-white/50">
                    {hero.price.unit}
                  </span>
                </p>

                <ul className="mt-7 space-y-4 border-t border-white/10 pt-6">
                  {hero.price.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/80">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center bg-[#7ed98d]/15 text-[#7ed98d]">
                        <Check aria-hidden className="size-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#book-demo"
                  className="group mt-8 flex w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5fa863] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed98d] focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Book Live Demo
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <p className="mt-5 flex items-center gap-2 text-xs text-white/45">
                  <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#7ed98d]" />
                  Founder beta seats are limited.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
