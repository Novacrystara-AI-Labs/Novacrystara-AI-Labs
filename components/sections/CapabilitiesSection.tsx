import {
  Workflow,
  BookOpenText,
  Database,
  Plug,
  Blocks,
  Cloud,
  ShieldCheck,
  Share2,
  Brain,
  Building2,
  Users,
  Eye,
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

// Tech-stack keywords — all drawn from the capabilities copy (§7), each iconised.
type Tech = { label: string; icon: LucideIcon };
const stackTop: Tech[] = [
  { label: "Agentic AI", icon: Workflow },
  { label: "Multi-Agent Systems", icon: Share2 },
  { label: "RAG", icon: BookOpenText },
  { label: "Vector Databases", icon: Database },
  { label: "Knowledge Engineering", icon: Brain },
  { label: "Model Context Protocol", icon: Plug },
  { label: "Explainability", icon: Eye },
];
const stackBottom: Tech[] = [
  { label: "AWS", icon: Cloud },
  { label: "Azure", icon: Cloud },
  { label: "Google Cloud", icon: Cloud },
  { label: "ERP", icon: Building2 },
  { label: "CRM", icon: Users },
  { label: "Responsible AI", icon: ShieldCheck },
];

function TechTile({ label, icon: Icon }: Tech) {
  return (
    <span className="group flex shrink-0 items-center gap-3 whitespace-nowrap border border-border bg-white px-5 py-3.5 text-base font-semibold text-foreground transition-colors duration-300 hover:border-accent">
      <span className="inline-flex size-8 items-center justify-center bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        <Icon aria-hidden className="size-4" />
      </span>
      {label}
    </span>
  );
}

/** SECTION 7 — Technical Capabilities (arch §5 #7). Code-file tiles + a dual-row tech ticker. */
export function CapabilitiesSection() {
  return (
    <Section id="capabilities" className="relative overflow-hidden bg-surface">
      <Reveal className="max-w-3xl">
        <Eyebrow label="Capabilities" />
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

      {/* Tech-stack ticker — two rows drifting in opposite directions */}
      <Reveal className="mt-16">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-accent" />
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Fluent across the modern AI stack
          </p>
          <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-accent" />
        </div>

        <div className="space-y-3 border-y border-dashed border-zinc-300 bg-surface-raised/50 py-6">
          <Marquee gapClass="gap-3">
            {stackTop.map((t) => (
              <TechTile key={t.label} {...t} />
            ))}
          </Marquee>
          <Marquee gapClass="gap-3" reverse speed="slow">
            {stackBottom.map((t) => (
              <TechTile key={t.label} {...t} />
            ))}
          </Marquee>
        </div>
      </Reveal>
    </Section>
  );
}
