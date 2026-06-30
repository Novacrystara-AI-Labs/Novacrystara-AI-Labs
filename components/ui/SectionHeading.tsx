import { cn } from "@/lib/utils";

/** Eyebrow + title + subtitle block (arch §6.3). */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-h2 font-semibold">{title}</h2>
      {subtitle ? <p className="mt-4 text-pretty text-lg text-muted">{subtitle}</p> : null}
    </div>
  );
}
