import { ShieldCheck, Lock, Eye, Scale, FileCheck } from "lucide-react";
import { trust } from "@/content/trust";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

// Governance pillars — all drawn from the trust copy (security, privacy,
// responsible AI, model risk, explainability, compliance).
const pillars = [
  { icon: Lock, label: "Security by design" },
  { icon: FileCheck, label: "Data privacy" },
  { icon: Eye, label: "Explainability" },
  { icon: Scale, label: "Model risk & compliance" },
];

/** OPTIONAL — Trust & Governance (arch §5 O2). Dark accent band with governance pillars. */
export function TrustSection() {
  return (
    <Section id="trust">
      <Reveal className="relative overflow-hidden rounded-none border border-white/10 bg-ink p-8 text-white sm:p-12">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-blueprint-dark mask-radial-fade absolute inset-0 opacity-60" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.25),transparent_70%)] blur-2xl" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <span className="inline-flex size-12 items-center justify-center rounded-none bg-[#7ed98d]/15 text-[#7ed98d]">
              <ShieldCheck aria-hidden className="size-7" />
            </span>
            <Eyebrow label="Trust & Governance" tone="dark" className="mt-6" />
            <h2 className="mt-4 text-balance text-h2 font-semibold text-white">{trust.heading}</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-white/65">{trust.body}</p>
          </div>

          {/* Governance pillars */}
          <ul className="grid w-full grid-cols-2 gap-3 lg:w-72">
            {pillars.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="group flex flex-col gap-3 rounded-none border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-[#7ed98d]/40"
              >
                <Icon
                  aria-hidden
                  className="size-5 text-[#7ed98d] transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-sm font-medium text-white/85">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
