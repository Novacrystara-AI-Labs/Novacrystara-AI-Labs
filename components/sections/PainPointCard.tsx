import { cn } from "@/lib/utils";
import type { PainPoint } from "@/types";

/**
 * A single enterprise AI pain point (arch §5 #2).
 * Sharp-edged blueprint bento cell: shares dotted borders with neighbours (no
 * gaps), a monospace index marker in the corner, and a green background that
 * slides up on hover while the content lifts and recolours.
 */
export function PainPointCard({
  painPoint,
  index,
  className,
}: {
  painPoint: PainPoint;
  index: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden border-b border-r border-dashed border-zinc-400 bg-white p-6 transition-all duration-300 md:p-7",
        className,
      )}
    >
      {/* Sliding-up green hover background overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 translate-y-full bg-[#e2f5e5] transition-transform duration-500 ease-nova group-hover:translate-y-0" />

      {/* Corner index marker + crosshair tick */}
      <span className="pointer-events-none absolute right-4 top-4 z-10 font-mono text-[11px] tracking-widest text-zinc-300 transition-colors duration-300 group-hover:text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full flex-col transition-transform duration-500 ease-nova group-hover:-translate-y-1">
        <span
          aria-hidden
          className="mb-4 h-1.5 w-1.5 rounded-full bg-zinc-300 transition-all duration-300 group-hover:w-6 group-hover:bg-accent"
        />
        <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
          {painPoint.title}
        </h3>
        <p className="mt-2 text-pretty text-base leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground">
          {painPoint.description}
        </p>
      </div>
    </div>
  );
}
