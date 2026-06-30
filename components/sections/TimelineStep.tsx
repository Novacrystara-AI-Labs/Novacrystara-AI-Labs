import { cn } from "@/lib/utils";
import type { Phase } from "@/types";

/** A single methodology phase on the vertical timeline (arch §5 #6). */
export function TimelineStep({
  phase,
  index,
  isLast,
}: {
  phase: Phase;
  index: number;
  isLast: boolean;
}) {
  return (
    <li className="relative flex gap-6 pb-10 last:pb-0">
      {/* Connector line */}
      {!isLast ? (
        <span aria-hidden className="absolute left-5 top-12 h-[calc(100%-2.5rem)] w-px bg-border" />
      ) : null}

      {/* Node */}
      <span
        className={cn(
          "z-10 flex size-10 shrink-0 items-center justify-center rounded-full",
          "border border-accent/40 bg-surface font-mono text-sm text-accent",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="pt-1">
        <h3 className="text-h3 font-semibold">{phase.title}</h3>
        <p className="mt-2 max-w-2xl text-pretty text-muted">{phase.description}</p>
      </div>
    </li>
  );
}
