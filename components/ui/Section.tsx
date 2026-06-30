import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * Standard section wrapper — rhythmic vertical padding + scroll offset for the sticky nav (arch §3.3).
 */
export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-24 md:py-32", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
