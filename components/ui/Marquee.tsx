import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Renders the children twice so the -50% keyframe
 * loops seamlessly; pauses on hover (`group/marquee`). Edge-faded via mask.
 */
export function Marquee({
  children,
  className,
  speed = "normal",
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: "normal" | "slow";
  reverse?: boolean;
}) {
  return (
    <div className={cn("group/marquee mask-fade-x relative w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-4",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee",
        )}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex shrink-0 items-center gap-4">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
