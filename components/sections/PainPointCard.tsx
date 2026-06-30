import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PainPoint } from "@/types";

/** A single enterprise AI pain point (arch §5 #2). */
export function PainPointCard({ painPoint }: { painPoint: PainPoint }) {
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

      <div className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
        <AlertTriangle aria-hidden className="size-5" />
      </div>

      <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
        {painPoint.title}
      </h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted font-normal">
        {painPoint.description}
      </p>
    </div>
  );
}
