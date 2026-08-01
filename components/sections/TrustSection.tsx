import { ShieldCheck, Lock, Eye, Scale, FileCheck } from "lucide-react";
import { trust } from "@/content/trust";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

// Governance pillars — labels + descriptors drawn from the trust copy
// (security by design, data privacy, explainability, model risk & compliance).
const pillars = [
  {
    icon: Lock,
    label: "Security by design",
    desc: "Controls engineered in from day one — never retrofitted after the fact.",
  },
  {
    icon: FileCheck,
    label: "Data privacy",
    desc: "Sensitive data governed and protected end to end, by default.",
  },
  {
    icon: Eye,
    label: "Explainability",
    desc: "Decisions your teams can trace, audit, and defend with confidence.",
  },
  {
    icon: Scale,
    label: "Model risk & compliance",
    desc: "Built to withstand scrutiny from legal, security, and the board.",
  },
];

/** OPTIONAL — Trust & Governance (arch §5 O2). Dark accent band with governance pillars. */
export function TrustSection() {
  return (
    <Section id="trust">
      <Reveal className="relative overflow-hidden rounded-none border border-white/10 bg-ink p-8 text-white sm:p-12 lg:p-14">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.25),transparent_70%)] blur-2xl" />
        </div>

        {/* technical corner brackets */}
        <span aria-hidden className="pointer-events-none absolute left-4 top-4 size-6 border-l border-t border-[#7ed98d]/40" />
        <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 size-6 border-b border-r border-[#7ed98d]/40" />

        <div className="relative">
          {/* Header */}
          <div className="max-w-3xl">
            <span className="inline-flex size-12 items-center justify-center rounded-none bg-[#7ed98d]/15 text-[#7ed98d]">
              <ShieldCheck aria-hidden className="size-7" />
            </span>
            <Eyebrow label="Trust & Governance" tone="dark" className="mt-6" />
            <h2 className="mt-4 text-balance text-h2 font-semibold text-white">{trust.heading}</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-white/65">{trust.body}</p>
          </div>

          {/* Governance pillars */}
          <ul className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, label, desc }, i) => (
              <li
                key={label}
                className="group relative flex flex-col gap-4 bg-ink p-6 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center border border-[#7ed98d]/25 bg-[#7ed98d]/10 text-[#7ed98d] transition-colors duration-300 group-hover:border-[#7ed98d]/60">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
