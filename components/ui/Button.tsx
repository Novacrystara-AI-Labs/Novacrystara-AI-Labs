import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-snow hover:bg-accent-strong",
  secondary: "border border-border text-foreground hover:border-accent hover:text-accent",
  ghost: "text-accent underline-offset-4 hover:underline",
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

/** CTA button (arch §6.3). Renders a Link when `href` is provided, otherwise a `<button>`. */
export function Button({
  href,
  variant = "primary",
  className,
  children,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
