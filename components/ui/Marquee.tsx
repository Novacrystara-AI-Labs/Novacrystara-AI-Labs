import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Renders the children twice so the -50% keyframe
 * loops seamlessly; pauses on hover (`group/marquee`). Edge-faded via mask.
 * `gapClass="gap-0"` lets cells sit flush (e.g. dashed-divider strips) while
 * keeping the loop seamless.
 */
export function Marquee({
  children,
  className,
  speed = "normal",
  reverse = false,
  gapClass = "gap-4",
}: {
  children: ReactNode;
  className?: string;
  speed?: "normal" | "slow";
  reverse?: boolean;
  gapClass?: string;
}) {
  return (
    <div className={cn("group/marquee mask-fade-x relative w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          gapClass,
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee",
        )}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className={cn("flex shrink-0 items-center", gapClass)}>{children}</div>
        <div aria-hidden className={cn("flex shrink-0 items-center", gapClass)}>
          {children}
        </div>
      </div>
    </div>
  );
}
