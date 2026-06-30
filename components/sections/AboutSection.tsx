import { about } from "@/content/about";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** OPTIONAL — About Us (arch §5 O1). */
export function AboutSection() {
  return (
    <Section id="about" className="bg-surface">
      <Reveal>
        <SectionHeading eyebrow="About Us" title={about.heading} />

        <div className="mt-8 max-w-3xl space-y-5">
          {about.paragraphs.map((p) => (
            <p key={p} className="text-pretty text-lg text-muted">
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
