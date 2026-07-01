import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";
import type { EngagementModel } from "@/types";

/**
 * A single engagement model on the "scaling ladder" (arch §5 #8).
 * A 4-segment scale meter fills up to this step, visually implying escalating
 * scope from Assessment → Full-Scale. Later steps sit taller (stair-step).
 */
export function EngagementCard({
  model,
  index,
  total,
}: {
  model: EngagementModel;
  index: number;
  total: number;
}) {
  return (
    <SpotlightCard
      className={cn(
        "group flex h-full flex-col rounded-none border border-border bg-white p-6 transition-all duration-300 ease-nova",
        "hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(78,143,82,0.1)]",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
          <span className="rounded-none bg-accent/10 px-2 py-1 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
            Step {index + 1}
          </span>
        </span>
        <span className="font-mono text-xs text-muted/60">
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
        {model.title}
      </h3>
      <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">
        {model.description}
      </p>

      {/* Scale meter */}
      <div className="mt-6 flex items-center gap-1.5" aria-hidden>
        {Array.from({ length: total }).map((_, s) => (
          <span
            key={s}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              s <= index ? "bg-accent" : "bg-border",
            )}
            style={{ transitionDelay: `${s * 60}ms` }}
          />
        ))}
      </div>
    </SpotlightCard>
  );
}
