import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Capability } from "@/types";

/** A single technical capability tile (arch §5 #7). */
export function CapabilityTile({
  capability,
  icon: Icon,
}: {
  capability: Capability;
  icon: LucideIcon;
}) {
  return (
    <Card className="h-full">
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-surface-raised text-accent">
        <Icon aria-hidden className="size-6" />
      </span>
      <h3 className="mt-4 text-h3 font-semibold">{capability.title}</h3>
      <p className="mt-2 text-pretty text-muted">{capability.description}</p>
    </Card>
  );
}
