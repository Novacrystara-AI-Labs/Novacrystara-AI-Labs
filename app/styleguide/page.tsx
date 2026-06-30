import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Guide — NovaCrystara Design System",
  robots: { index: false, follow: false },
};

const brandSwatches = [
  { name: "Snow / White", token: "bg-snow", hex: "#FFFFFF" },
  { name: "Verdant (accent)", token: "bg-verdant", hex: "#4E8F52" },
  { name: "Verdant-600", token: "bg-verdant-600", hex: "#3E7242" },
  { name: "Verdant-200", token: "bg-verdant-200", hex: "#BFD8C1" },
  { name: "Mist (muted)", token: "bg-mist", hex: "#6B776D" },
  { name: "Ink / Black", token: "bg-ink", hex: "#000000" },
];

const typeScale = [
  { name: "display", cls: "text-display" },
  { name: "h1", cls: "text-h1" },
  { name: "h2", cls: "text-h2" },
  { name: "h3", cls: "text-h3" },
  { name: "body", cls: "text-base" },
  { name: "mono-label", cls: "font-mono text-sm tracking-widest uppercase" },
];

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-28 lg:px-8">
      <header className="mb-12">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">Design System</p>
        <h1 className="text-h1 font-semibold">White · Black · #4E8F52</h1>
      </header>

      {/* Palette */}
      <section className="mb-16">
        <h2 className="text-h2 mb-6 font-semibold">Palette</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {brandSwatches.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-2xl border border-border">
              <div className={`${s.token} h-20 w-full`} />
              <div className="bg-surface-raised p-3">
                <p className="text-sm font-medium">{s.name}</p>
                <p className="font-mono text-xs text-muted">{s.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-h2 mb-6 font-semibold">Type Scale (Geist → Arial → sans-serif)</h2>
        <div className="space-y-4">
          {typeScale.map((t) => (
            <div key={t.name} className="border-b border-border pb-4">
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted">
                {t.name}
              </p>
              <p className={t.cls}>NovaCrystara AI Labs</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
