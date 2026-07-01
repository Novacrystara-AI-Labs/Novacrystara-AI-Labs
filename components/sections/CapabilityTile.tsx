import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Capability } from "@/types";

// Short mono "slug" per capability title — gives each tile a code-file identity.
const slugByTitle: Record<string, string> = {
  "Agentic AI & Multi-Agent Systems": "agentic-systems",
  "Retrieval-Augmented Generation (RAG)": "rag-pipeline",
  "Vector Databases & Knowledge Engineering": "vector-store",
  "Model Context Protocol (MCP)": "mcp-connect",
  "Enterprise Integrations": "integrations",
  "Cloud Platforms": "cloud-deploy",
  "AI Governance & Responsible AI": "governance",
};

/** A single technical capability tile (arch §5 #7), styled as a code-file card. */
export function CapabilityTile({
  capability,
  icon: Icon,
  index,
}: {
  capability: Capability;
  icon: LucideIcon;
  index: number;
}) {
  const slug = slugByTitle[capability.title] ?? "capability";
  return (
    <SpotlightCard className="group flex h-full flex-col rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_16px_40px_rgba(78,143,82,0.08)]">
      {/* Terminal titlebar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-accent/25 transition-colors duration-300 group-hover:bg-accent/40" />
          <span className="size-2.5 rounded-full bg-accent/40 transition-colors duration-300 group-hover:bg-accent/60" />
          <span className="size-2.5 rounded-full bg-accent/70 transition-colors duration-300 group-hover:bg-accent" />
        </span>
        <span className="ml-1 font-mono text-xs text-muted">
          {slug}
          <span className="text-muted/50">.ai</span>
        </span>
        <span className="ml-auto font-mono text-[11px] tracking-widest text-muted/50">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
          <Icon aria-hidden className="size-6" />
        </span>
        <h3 className="mt-4 text-h3 font-semibold">{capability.title}</h3>
        <p className="mt-2 text-pretty text-muted">{capability.description}</p>
      </div>
    </SpotlightCard>
  );
}
