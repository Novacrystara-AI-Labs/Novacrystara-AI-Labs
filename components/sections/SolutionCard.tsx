import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Solution } from "@/types";

/**
 * A single solution offering — sharp-edged blueprint bento cell that shares its
 * dashed borders with neighbours (no gaps). Icon + big watermark index, with a
 * green wash that slides up on hover while the content lifts. Featured variant
 * is larger and adds a ghost-icon watermark.
 */
export function SolutionCard({
  solution,
  icon: Icon,
  index,
  featured = false,
  className,
}: {
  solution: Solution;
  icon: LucideIcon;
  index: number;
  featured?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden border-b border-r border-dashed border-zinc-400 bg-white transition-all duration-300",
        featured ? "p-8 md:p-10" : "p-6 md:p-7",
        className,
      )}
    >
      {/* Green wash slides up on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 translate-y-full bg-[#e2f5e5] transition-transform duration-500 ease-nova group-hover:translate-y-0"
      />

      {/* Ghost-icon watermark (featured only) */}
      {featured ? (
        <Icon
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-6 z-[1] size-44 text-accent/[0.06] transition-all duration-500 group-hover:scale-105 group-hover:text-accent/[0.1]"
        />
      ) : null}

      {/* Big watermark index (top-right) */}
      <span
        className={cn(
          "pointer-events-none absolute right-4 top-2 z-[1] font-semibold leading-none tracking-tight text-zinc-300 transition-colors duration-300 group-hover:text-accent/50",
          featured ? "text-[4rem] sm:text-[5rem]" : "text-[3rem] sm:text-[3.5rem]",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col transition-transform duration-500 ease-nova group-hover:-translate-y-1">
        <span
          className={cn(
            "inline-flex items-center justify-center bg-accent/10 text-accent shadow-sm transition-all duration-300 group-hover:bg-accent group-hover:text-white",
            featured ? "size-14" : "size-12",
          )}
        >
          <Icon aria-hidden className={featured ? "size-7" : "size-6"} />
        </span>
        <h3
          className={cn(
            "mt-5 font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent",
            featured ? "text-2xl" : "text-lg",
          )}
        >
          {solution.title}
        </h3>
        <p
          className={cn(
            "mt-2 text-pretty leading-relaxed text-muted",
            featured ? "max-w-md text-base" : "text-sm",
          )}
        >
          {solution.description}
        </p>
      </div>
    </div>
  );
}
