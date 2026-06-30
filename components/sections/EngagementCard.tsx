import { Card } from "@/components/ui/Card";
import type { EngagementModel } from "@/types";

/** A single engagement model on the ladder (arch §5 #8). */
export function EngagementCard({ model, index }: { model: EngagementModel; index: number }) {
  return (
    <Card className="flex h-full flex-col">
      <span className="font-mono text-sm text-accent">Step {index + 1}</span>
      <h3 className="mt-3 text-h3 font-semibold">{model.title}</h3>
      <p className="mt-2 text-pretty text-muted">{model.description}</p>
    </Card>
  );
}
