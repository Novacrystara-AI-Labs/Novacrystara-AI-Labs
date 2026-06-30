import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accordion item built on native <details>/<summary> (arch §6.3).
 * Works without JS and is keyboard/screen-reader accessible out of the box;
 * open/close animation is layered on in P7.
 */
export function Accordion({
  summary,
  children,
  className,
}: {
  summary: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <details className={cn("group border-b border-border", className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded py-5 text-left text-h3 font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
        <span>{summary}</span>
        <Plus
          aria-hidden
          className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
        />
      </summary>
      <div className="details-reveal pb-6 pr-8 text-pretty text-muted">{children}</div>
    </details>
  );
}
