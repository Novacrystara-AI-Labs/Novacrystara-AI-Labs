import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Solution } from "@/types";

/** A single solution offering (arch §5 #4). */
export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-[#e3eae3] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]",
        "transition-all duration-300 ease-nova hover:-translate-y-1.5",
        "hover:border-accent hover:shadow-[0_12px_30px_rgba(78,143,82,0.08)]"
      )}
    >
      {/* Dynamic top corner light source blur */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-accent/5 rounded-tl-2xl filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
          {solution.title}
        </h3>
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </div>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted font-normal">
        {solution.description}
      </p>
    </div>
  );
}
