import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cta } from "@/content/cta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

/** SECTION 9 — Final CTA / Contact (arch §5 #9). Dark aurora banner + capture form. */
export function CTASection() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          {/* Ambient: dotted grid + green aurora glows */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="bg-dotgrid-dark mask-radial-fade absolute inset-0 opacity-50" />
            <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.35),transparent_70%)] blur-2xl animate-glow-pulse" />
            <div className="absolute -bottom-32 left-1/4 h-64 w-96 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.18),transparent_70%)] blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7ed98d]/30 bg-[#7ed98d]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#7ed98d]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7ed98d]/70" />
                <span className="relative inline-flex size-2 rounded-full bg-[#7ed98d]" />
              </span>
              Let&apos;s build
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-h1 font-semibold text-white">
              {cta.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-white/65">{cta.body}</p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {cta.ctas.map((c, i) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className={cn(
                    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed98d] focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                    i === 0
                      ? "bg-accent text-white hover:bg-[#5fa863] hover:shadow-[0_10px_30px_rgba(78,143,82,0.4)]"
                      : "border border-white/20 text-white hover:border-[#7ed98d] hover:text-[#7ed98d]",
                  )}
                >
                  {c.label}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-sm text-white/45">
              {cta.reassurance}
            </p>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
