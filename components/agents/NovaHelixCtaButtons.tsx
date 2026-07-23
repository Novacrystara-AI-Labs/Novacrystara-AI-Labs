"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNovaHelixDemo } from "./NovaHelixDemoProvider";

/** Final-CTA buttons — open the Nova Helix demo popup in place. */
export function NovaHelixCtaButtons({ ctas }: { ctas: { label: string; href: string }[] }) {
  const { open } = useNovaHelixDemo();

  return (
    <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
      {ctas.map((c, i) => (
        <button
          key={c.label}
          type="button"
          onClick={open}
          className={cn(
            "group inline-flex items-center justify-center gap-2 rounded-none px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed98d] focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
            i === 0
              ? "bg-accent text-white hover:bg-[#5fa863] hover:shadow-[0_10px_30px_rgba(78,143,82,0.4)]"
              : "border border-white/20 text-white hover:border-[#7ed98d] hover:text-[#7ed98d]",
          )}
        >
          {c.label}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      ))}
    </div>
  );
}
