import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";
import type { Solution } from "@/types";

/** A single solution offering (arch §5 #4). Featured variant is larger + typographically louder. */
export function SolutionCard({
  solution,
  icon: Icon,
  featured = false,
  className,
}: {
  solution: Solution;
  icon: LucideIcon;
  featured?: boolean;
  className?: string;
}) {
  return (
    <SpotlightCard
      className={cn(
        "group flex h-full flex-col rounded-none border border-border bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]",
        "transition-all duration-300 ease-nova hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(78,143,82,0.1)]",
        featured && "sm:p-8",
        className,
      )}
    >
      {/* Decorative watermark icon in the featured cell */}
      {featured ? (
        <Icon
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 size-40 text-accent/[0.06] transition-transform duration-500 group-hover:scale-110 group-hover:text-accent/[0.09]"
        />
      ) : null}

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-none bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white",
            featured ? "size-14" : "size-11",
          )}
        >
          <Icon aria-hidden className={featured ? "size-7" : "size-5"} />
        </span>
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>

      <h3
        className={cn(
          "relative mt-5 font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent",
          featured ? "text-2xl" : "text-lg",
        )}
      >
        {solution.title}
      </h3>
      <p
        className={cn(
          "relative mt-2 text-pretty leading-relaxed text-muted",
          featured ? "max-w-xl text-base" : "text-sm",
        )}
      >
        {solution.description}
      </p>
    </SpotlightCard>
  );
}
