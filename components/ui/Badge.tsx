import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Eyebrow / pill label (arch §3.1 mono-label). */
export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-3 py-1",
        "font-mono text-xs uppercase tracking-widest text-accent",
        className,
      )}
      {...props}
    />
  );
}
