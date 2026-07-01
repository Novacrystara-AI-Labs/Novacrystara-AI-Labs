import { cn } from "@/lib/utils";

/**
 * Technical eyebrow label — monospace, uppercase, accent-coloured.
 * `tone="dark"` inverts it for use on black signature sections.
 * (Index numbers + dash rules were removed per design direction.)
 */
export function Eyebrow({
  label,
  tone = "light",
  className,
}: {
  label: string;
  tone?: "light" | "dark";
  /** Accepted for backwards-compat; no longer rendered. */
  index?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-xs font-medium uppercase tracking-[0.25em]",
        tone === "dark" ? "text-[#7ed98d]" : "text-accent",
        className,
      )}
    >
      {label}
    </span>
  );
}
