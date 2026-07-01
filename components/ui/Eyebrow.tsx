import { cn } from "@/lib/utils";

/**
 * Technical eyebrow label — monospace, uppercase, with an index marker and a
 * short accent rule. Inspired by Baseten's precise section labelling.
 * `tone="dark"` inverts it for use on black signature sections.
 */
export function Eyebrow({
  label,
  index,
  tone = "light",
  className,
}: {
  label: string;
  /** Optional zero-padded section index, e.g. 2 → "02". */
  index?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]",
        tone === "dark" ? "text-[#7ed98d]" : "text-accent",
        className,
      )}
    >
      {typeof index === "number" ? (
        <span className={cn(tone === "dark" ? "text-white/35" : "text-mist")}>
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <span
        aria-hidden
        className={cn(
          "h-px w-8",
          tone === "dark"
            ? "bg-gradient-to-r from-[#7ed98d] to-transparent"
            : "bg-gradient-to-r from-accent to-transparent",
        )}
      />
      <span>{label}</span>
    </span>
  );
}
