import { faq } from "@/content/faq";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

/** OPTIONAL — FAQ (arch §5 O3). Native <details> accordion (no-JS friendly). */
export function FAQSection() {
  return (
    <Section id="faq" className="bg-surface">
      <Reveal>
        <SectionHeading eyebrow="FAQ" title={faq.heading} align="center" />
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-3xl">
        {faq.items.map((item) => (
          <Accordion key={item.question} summary={item.question}>
            {item.answer}
          </Accordion>
        ))}
      </Reveal>
    </Section>
  );
}
