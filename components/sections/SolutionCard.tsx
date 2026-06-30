import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Solution } from "@/types";

/** A single solution offering (arch §5 #4). */
export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Card className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-h3 font-semibold">{solution.title}</h3>
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-muted transition-colors group-hover:text-accent"
        />
      </div>
      <p className="mt-3 text-pretty text-muted">{solution.description}</p>
    </Card>
  );
}
