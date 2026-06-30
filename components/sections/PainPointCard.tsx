import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { PainPoint } from "@/types";

/** A single enterprise AI pain point (arch §5 #2). */
export function PainPointCard({ painPoint }: { painPoint: PainPoint }) {
  return (
    <Card className="h-full">
      <AlertTriangle aria-hidden className="size-6 text-accent" />
      <h3 className="mt-4 text-h3 font-semibold">{painPoint.title}</h3>
      <p className="mt-2 text-pretty text-muted">{painPoint.description}</p>
    </Card>
  );
}
