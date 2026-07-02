import { cta } from "@/content/cta";
import { Container } from "@/components/ui/Container";
import { ScrollGrowPanel } from "@/components/ui/ScrollGrowPanel";
import { NeuralNet } from "@/components/ui/NeuralNet";
import { ContactDialog } from "./ContactDialog";

/** SECTION 9 — Final CTA / Contact (arch §5 #9). Dark aurora banner + capture form. */
export function CTASection() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 md:py-24">
      <Container>
        <ScrollGrowPanel
          from={0.7}
          className="relative overflow-hidden rounded-none border border-white/10 bg-ink px-6 py-16 text-center text-white shadow-[0_50px_140px_-40px_rgba(78,143,82,0.4)] sm:px-12 sm:py-20"
        >
          {/* Ambient: dotted grid + live neural network (cursor-linked) + green aurora glows */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="bg-dotgrid-dark mask-radial-fade absolute inset-0 opacity-40" />
            <NeuralNet className="absolute inset-0" />
            <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.35),transparent_70%)] blur-2xl animate-glow-pulse" />
            <div className="absolute -bottom-32 left-1/4 h-64 w-96 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.18),transparent_70%)] blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-none border border-[#7ed98d]/30 bg-[#7ed98d]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#7ed98d]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7ed98d]/70" />
                <span className="relative inline-flex size-2 rounded-full bg-[#7ed98d]" />
              </span>
              Let&apos;s build
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-h1 font-semibold text-white">
              {cta.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-white/90">{cta.body}</p>

            <ContactDialog ctas={cta.ctas} />

            <p className="mx-auto mt-6 max-w-xl text-pretty text-sm text-white/80">
              {cta.reassurance}
            </p>
          </div>
        </ScrollGrowPanel>
      </Container>
    </section>
  );
}
