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
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
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

/** SECTION 7 — Technical Capabilities (arch §5 #7). */
export function CapabilitiesSection() {
  return (
    <Section id="capabilities" className="bg-surface">
      <Reveal>
        <SectionHeading
          eyebrow="Capabilities"
          title={capabilities.heading}
          subtitle={capabilities.intro}
          align="center"
        />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.capabilities.map((c, i) => (
          <Reveal key={c.title} className="h-full" delay={i * 0.05}>
            <CapabilityTile capability={c} icon={iconByTitle[c.title] ?? Blocks} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
