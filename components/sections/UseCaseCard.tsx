import {
  Wrench,
  Building2,
  ShieldCheck,
  Server,
  HeartPulse,
  UserCheck,
  Target,
  Check,
  TrendingUp,
  ChevronDown,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UseCase } from "@/types";

// Map content icon keys → Lucide icons (arch §7.3).
const icons: Record<string, LucideIcon> = {
  wrench: Wrench,
  "building-2": Building2,
  "shield-check": ShieldCheck,
  server: Server,
  "heart-pulse": HeartPulse,
  "user-check": UserCheck,
  target: Target,
};

/**
 * Expandable use-case card (arch §7).
 * Built on native <details>: collapsed shows a teaser; expanding via the summary reveals the
 * full intro + all capabilities + all benefits. The `open:` / `group-open:` Tailwind variants
 * handle expand styling (incl. `col-span-full`) and label switching — so it works without JS,
 * is keyboard-operable, and exposes correct disclosure semantics to screen readers.
 * (Height animation is layered on in P7.)
 */
export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const Icon = icons[useCase.icon] ?? Sparkles;
  const panelId = `${useCase.id}-panel`;

  return (
    <details
      className={cn(
        "group rounded-2xl border border-border bg-surface p-6 transition-colors",
        "hover:border-accent/50 open:border-accent/60 open:col-span-full",
      )}
    >
      <summary
        aria-controls={panelId}
        className="cursor-pointer list-none rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden"
      >
        <div className="flex items-start gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-raised text-accent">
            <Icon aria-hidden className="size-6" />
          </span>
          <div>
            <h3 className="text-h3 font-semibold">{useCase.title}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{useCase.tagline}</p>
          </div>
        </div>

        {/* Teaser — only a small portion visible until expanded */}
        <p className="mt-4 line-clamp-3 text-pretty text-muted group-open:line-clamp-none">
          {useCase.intro[0]}
        </p>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
          <span className="group-open:hidden">Read more</span>
          <span className="hidden group-open:inline">Show less</span>
          <ChevronDown
            aria-hidden
            className="size-4 transition-transform duration-300 group-open:rotate-180"
          />
        </span>
      </summary>

      {/* Expanded content */}
      <div
        id={panelId}
        role="region"
        aria-label={useCase.title}
        className="details-reveal mt-6 border-t border-border pt-6"
      >
        {useCase.intro.slice(1).map((p) => (
          <p key={p} className="mb-4 text-pretty text-muted last:mb-0">
            {p}
          </p>
        ))}

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="font-mono text-sm uppercase tracking-widest text-accent">
              Key Capabilities
            </h4>
            <ul className="mt-4 space-y-2.5">
              {useCase.capabilities.map((c) => (
                <li key={c} className="flex gap-2.5 text-pretty text-muted">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm uppercase tracking-widest text-accent">
              Business Benefits
            </h4>
            <ul className="mt-4 space-y-2.5">
              {useCase.benefits.map((b) => (
                <li key={b} className="flex gap-2.5 text-pretty text-muted">
                  <TrendingUp aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </details>
  );
}
