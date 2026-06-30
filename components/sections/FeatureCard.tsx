import { Card } from "@/components/ui/Card";
import type { Pillar } from "@/types";

/** A single differentiator pillar (arch §5 #3). */
export function FeatureCard({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <Card className="h-full">
      <span className="font-mono text-sm text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-h3 font-semibold">{pillar.title}</h3>
      <p className="mt-2 text-pretty text-muted">{pillar.description}</p>
    </Card>
  );
}
