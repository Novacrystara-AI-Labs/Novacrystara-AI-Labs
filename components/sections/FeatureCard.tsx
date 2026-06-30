import { cn } from "@/lib/utils";
import type { Pillar } from "@/types";

/** A single differentiator pillar (arch §5 #3). */
export function FeatureCard({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-[#e3eae3] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]",
        "transition-all duration-300 ease-nova hover:-translate-y-1.5",
        "hover:border-accent hover:shadow-[0_12px_30px_rgba(78,143,82,0.08)]"
      )}
    >
      {/* Dynamic top corner light source blur */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-accent/5 rounded-tl-2xl filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <span className="inline-flex items-center justify-center font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md transition-all duration-300 group-hover:bg-accent group-hover:text-white">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
        {pillar.title}
      </h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted font-normal">
        {pillar.description}
      </p>
    </div>
  );
}
