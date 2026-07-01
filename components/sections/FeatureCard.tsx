import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/types";

/**
 * A single differentiator pillar (arch §5 #3), rendered on the dark signature
 * section. Cursor-follow green spotlight, a monospace index, and a top hairline
 * that ignites green on hover.
 */
export function FeatureCard({
  pillar,
  index,
  className,
}: {
  pillar: Pillar;
  index: number;
  className?: string;
}) {
  return (
    <SpotlightCard
      tone="dark"
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-[#7ed98d]/40",
        className,
      )}
    >
      {/* Top hairline that lights up on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#7ed98d]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-sm tracking-widest text-[#7ed98d]/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight
          aria-hidden
          className="size-4 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7ed98d]"
        />
      </div>

      <h3 className="mt-6 text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#a6e8b1]">
        {pillar.title}
      </h3>
      <p className="mt-2.5 text-pretty text-sm leading-relaxed text-white/55">
        {pillar.description}
      </p>
    </SpotlightCard>
  );
}
