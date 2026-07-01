import { faq } from "@/content/faq";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

/** OPTIONAL — FAQ (arch §5 O3). Two-column editorial + native <details> accordion. */
export function FAQSection() {
  return (
    <Section id="faq" className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow label="FAQ" index={10} />
          <h2 className="mt-5 text-balance text-h2 font-semibold">{faq.heading}</h2>
          <p className="mt-4 text-pretty text-muted">
            Straight answers on how we work, integrate, and de-risk enterprise AI.
          </p>
        </Reveal>

        <Reveal className="rounded-none border border-border bg-white px-6 sm:px-8">
          {faq.items.map((item) => (
            <Accordion key={item.question} summary={item.question}>
              {item.answer}
            </Accordion>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
