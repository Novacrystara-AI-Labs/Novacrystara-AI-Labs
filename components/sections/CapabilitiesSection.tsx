import {
  Workflow,
  BookOpenText,
  Database,
  Plug,
  Blocks,
  Cloud,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { capabilities } from "@/content/capabilities";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { CapabilityTile } from "./CapabilityTile";

// Map each capability (by title) to a Lucide icon (arch §5 #7).
const iconByTitle: Record<string, LucideIcon> = {
  "Agentic AI & Multi-Agent Systems": Workflow,
  "Retrieval-Augmented Generation (RAG)": BookOpenText,
  "Vector Databases & Knowledge Engineering": Database,
  "Model Context Protocol (MCP)": Plug,
  "Enterprise Integrations": Blocks,
  "Cloud Platforms": Cloud,
  "AI Governance & Responsible AI": ShieldCheck,
};

// Tech-stack keywords — all drawn from the capabilities copy (§7).
const stack = [
  "Agentic AI",
  "Multi-Agent Systems",
  "RAG",
  "Vector Databases",
  "Knowledge Engineering",
  "Model Context Protocol",
  "AWS",
  "Azure",
  "Google Cloud",
  "ERP",
  "CRM",
  "Explainability",
  "Responsible AI",
];

/** SECTION 7 — Technical Capabilities (arch §5 #7). Code-file tiles + a live tech-stack ticker. */
export function CapabilitiesSection() {
  return (
    <Section id="capabilities" className="relative overflow-hidden bg-surface">
      <Reveal className="max-w-3xl">
        <Eyebrow label="Capabilities" index={7} />
        <h2 className="mt-5 text-balance text-h2 font-semibold">{capabilities.heading}</h2>
        <p className="mt-4 text-pretty text-lg text-muted">{capabilities.intro}</p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.capabilities.map((c, i) => (
          <Reveal key={c.title} className="h-full" delay={i * 0.05}>
            <CapabilityTile capability={c} icon={iconByTitle[c.title] ?? Blocks} index={i} />
          </Reveal>
        ))}
      </div>

      {/* Tech-stack ticker */}
      <Reveal className="mt-10">
        <p className="mb-5 text-center font-mono text-xs uppercase tracking-widest text-muted">
          Fluent across the modern AI stack
        </p>
        <Marquee>
          {stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-none border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {tech}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </Section>
  );
}
