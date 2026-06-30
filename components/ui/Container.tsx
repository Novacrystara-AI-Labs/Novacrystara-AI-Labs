import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Centered max-width content wrapper (arch §3.3). */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)} {...props} />;
}
