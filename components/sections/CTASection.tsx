import { cta } from "@/content/cta";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";

/** SECTION 9 — Final CTA / Contact (arch §5 #9). */
export function CTASection() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-16 text-center sm:px-12">
          <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent" />

          <h2 className="mx-auto max-w-3xl text-balance text-h1 font-semibold">{cta.heading}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted">{cta.body}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {cta.ctas.map((c, i) => (
              <Button key={c.label} href={c.href} variant={i === 0 ? "primary" : "secondary"}>
                {c.label}
              </Button>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-sm text-muted">{cta.reassurance}</p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
