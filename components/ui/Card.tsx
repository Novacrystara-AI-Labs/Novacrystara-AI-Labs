import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Surface card with subtle ring + hover accent (arch §3.3). */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 transition-colors duration-300",
        "hover:border-accent/50",
        className,
      )}
      {...props}
    />
  );
}
