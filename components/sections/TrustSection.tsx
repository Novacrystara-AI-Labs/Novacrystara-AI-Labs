import { ShieldCheck } from "lucide-react";
import { trust } from "@/content/trust";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** OPTIONAL — Trust & Governance (arch §5 O2). */
export function TrustSection() {
  return (
    <Section id="trust">
      <Reveal className="max-w-3xl">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-surface-raised text-accent">
          <ShieldCheck aria-hidden className="size-7" />
        </span>
        <h2 className="mt-6 text-balance text-h2 font-semibold">{trust.heading}</h2>
        <p className="mt-4 text-pretty text-lg text-muted">{trust.body}</p>
      </Reveal>
    </Section>
  );
}
