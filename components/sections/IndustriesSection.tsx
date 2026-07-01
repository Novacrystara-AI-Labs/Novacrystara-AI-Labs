import { industries } from "@/content/industries";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";

/** A single industry cell — dashed left divider + green fill that slides up on hover. */
function Cell({ label }: { label: string }) {
  return (
    <div className="group relative flex min-w-[190px] shrink-0 items-center justify-center overflow-hidden border-l border-dashed border-zinc-300 px-10 py-7 sm:min-w-[230px]">
      {/* Full brand-green fill slides bottom → top on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-y-full bg-accent transition-transform duration-[600ms] ease-nova group-hover:translate-y-0"
      />
      <span className="relative z-10 whitespace-nowrap font-mono text-[13px] font-medium uppercase tracking-[0.22em] text-mist transition-all duration-300 group-hover:-translate-y-0.5 group-hover:font-semibold group-hover:text-white">
        {label}
      </span>
    </div>
  );
}

/**
 * INDUSTRIES — post-hero strip.
 * Two rows scroll in opposite directions (a parallax feel); each row pauses when
 * hovered, and every cell reveals a green wash sliding up from the bottom.
 */
export function IndustriesSection() {
  return (
    <section id="industries" className="scroll-mt-24 border-b border-border bg-surface">
      <Container className="pb-8 pt-16 text-center md:pt-20">
        <Eyebrow label={industries.eyebrow} />
        <h2 className="mx-auto mt-5 max-w-2xl text-balance text-h2 font-semibold">
          {industries.heading}
        </h2>
      </Container>

      <div className="border-t border-dashed border-zinc-300">
        <Marquee gapClass="gap-0">
          {industries.rows[0].map((label) => (
            <Cell key={label} label={label} />
          ))}
        </Marquee>
        <div className="border-t border-dashed border-zinc-300" />
        <Marquee gapClass="gap-0" reverse speed="slow">
          {industries.rows[1].map((label) => (
            <Cell key={label} label={label} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
