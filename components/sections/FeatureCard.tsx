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
        "group flex h-full flex-col rounded-none border border-white/20 bg-black/40 p-7 backdrop-blur-md transition-colors duration-300 hover:border-[#7ed98d]/60 hover:bg-black/50",
        className,
      )}
    >
      {/* Top hairline that lights up on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#7ed98d]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between">
        <span className="font-semibold leading-none tracking-tight text-[3.5rem] text-[#7ed98d]/25 transition-colors duration-300 group-hover:text-[#7ed98d]/40 sm:text-[4.5rem]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight
          aria-hidden
          className="mt-2 size-4 shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7ed98d]"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#a6e8b1]">
        {pillar.title}
      </h3>
      <p className="mt-2.5 text-pretty text-sm leading-relaxed text-white/55">
        {pillar.description}
      </p>
    </SpotlightCard>
  );
}
