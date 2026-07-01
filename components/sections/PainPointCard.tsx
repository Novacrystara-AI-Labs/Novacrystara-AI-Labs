import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PainPoint } from "@/types";

/**
 * A single enterprise AI pain point (arch §5 #2).
 * Sharp-edged bento cell: shares its borders with neighbours (no gaps) and uses
 * a color-change hover only — no scale/translate/shadow.
 */
export function PainPointCard({
  painPoint,
  className,
}: {
  painPoint: PainPoint;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col border-b border-r border-border bg-white p-6 transition-colors duration-300 hover:bg-accent/[0.06]",
        className
      )}
    >
      <div className="inline-flex size-9 items-center justify-center border border-border text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
        <AlertTriangle aria-hidden className="size-5" />
      </div>

      <h3 className="mt-4 text-base font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
        {painPoint.title}
      </h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
        {painPoint.description}
      </p>
    </div>
  );
}
