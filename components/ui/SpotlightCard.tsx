"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Card surface with a cursor-following green spotlight glow (see `.spotlight`
 * utility). Purely CSS-driven glow updated via CSS custom properties, so it is
 * cheap and respects reduced-motion (the glow simply doesn't track — still fine).
 */
export function SpotlightCard({
  children,
  className,
  tone = "light",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "spotlight relative overflow-hidden",
        tone === "dark" && "spotlight-dark",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
