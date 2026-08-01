import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AudioLines, Check, ShieldCheck, X } from "lucide-react";
import { novaHelix } from "@/content/novaHelix";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollGrowPanel } from "@/components/ui/ScrollGrowPanel";
import { NeuralNet } from "@/components/ui/NeuralNet";
import { NovaHelixCtaButtons } from "@/components/agents/NovaHelixCtaButtons";
import { NovaHelixHero } from "@/components/agents/NovaHelixHero";
import { NovaHelixSteps } from "@/components/agents/NovaHelixSteps";

export const metadata: Metadata = {
  title: novaHelix.meta.title,
  description: novaHelix.meta.description,
  alternates: { canonical: "/agents/nova-helix" },
  openGraph: {
    type: "website",
    url: "/agents/nova-helix",
    title: novaHelix.meta.title,
    description: novaHelix.meta.description,
  },
};

const { problem, solution, voice, numbers, capabilities, why, founder, guarantee, finalCta } =
  novaHelix;

/**
 * Bar heights (%) for the voice-clone waveform. Fixed rather than random so the
 * server and client render the same silhouette, and irregular enough to read as
 * speech rather than a chart.
 */
const WAVE_BARS = [
  22, 46, 70, 92, 60, 34, 76, 96, 52, 28, 48, 84, 66, 38, 88, 56, 32, 72, 94, 50, 24, 62, 86, 44,
  74, 36, 64, 90, 46, 26,
];

/**
 * Running 01→13 index for the first capability in each stage, so the numbering
 * flows continuously down the pipeline instead of resetting per stage.
 */
const capabilityStageStart = capabilities.groups.reduce<number[]>(
  (acc, _g, i) => [...acc, i === 0 ? 0 : acc[i - 1] + capabilities.groups[i - 1].items.length],
  [],
);

/** /agents/nova-helix — landing page for our first autonomous AI employee. */
export default function NovaHelixPage() {
  return (
    <>
      <NovaHelixHero />

      {/* ── The problem ─────────────────────────────────────────────── */}
      <Section className="relative overflow-hidden">
        <Reveal className="max-w-3xl">
          <Eyebrow label={problem.eyebrow} />
          <h2 className="mt-5 text-balance text-h2 font-semibold">{problem.heading}</h2>
          <p className="mt-4 text-pretty text-lg text-muted">{problem.intro}</p>
        </Reveal>

        <Reveal className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-4 flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f3128]">
              <span className="inline-block size-1.5 bg-[#a83e33]" />
              Where the hours actually go
            </p>
            {/* Each row is work that shouldn't need a human — the X marker
                carries the point; the row itself stays plainly readable. */}
            <ul className="border-t border-border">
              {problem.items.map((item, i) => (
                <li
                  key={item}
                  className="group relative flex items-center gap-4 overflow-hidden border-b border-border py-4 pl-4 pr-3"
                >
                  {/* Row wash + left edge bar rise together on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#a83e33]/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="ease-nova absolute inset-y-0 left-0 w-0.5 origin-center scale-y-0 bg-[#a83e33] transition-transform duration-300 group-hover:scale-y-100"
                  />

                  <span className="relative shrink-0 font-mono text-[11px] tabular-nums tracking-widest text-muted/35 transition-colors duration-300 group-hover:text-[#a83e33]/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative inline-flex size-6 shrink-0 items-center justify-center border border-[#a83e33]/40 bg-[#a83e33]/[0.09] text-[#a83e33] transition-colors duration-300 group-hover:border-[#a83e33] group-hover:bg-[#a83e33] group-hover:text-white">
                    <X aria-hidden className="size-3.5" strokeWidth={3} />
                  </span>

                  <span className="relative font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            {/* Tally — closes the ledger and restates the thesis in one line */}
            <p className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
              <span className="font-semibold text-[#8f3128]">
                {problem.items.length} recurring tasks
              </span>
              <span aria-hidden className="h-px flex-1 bg-border" />
              <span className="text-muted/70">Zero require human judgment</span>
            </p>
          </div>

          {/* Scene on top, copy beneath it on solid black — the two never
              overlap, so the artwork keeps every detail and the quote reads
              clean. The figure runs taller than the list beside it by design. */}
          <figure className="flex h-full flex-col overflow-hidden border border-white/10 bg-ink text-white">
            {/* Kept short enough that the list governs the row height — the
                image then flexes to fill, so both columns end flush. */}
            <div className="relative min-h-[17rem] flex-1 sm:min-h-[20rem]">
              {/* Full-frame and well-exposed — only a light touch so it doesn't
                  blow out; centred so the exhausted figure holds the frame. */}
              <Image
                src="/images/hr_exhaust.png"
                alt="An overwhelmed HR recruiter slumped back at a desk buried in paperwork"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center brightness-[1.04] contrast-[1.02] saturate-[1.03]"
              />
              {/* Soft dissolve into the copy block below — no hard seam */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink"
              />
            </div>

            <figcaption className="relative bg-ink px-8 pb-9 pt-3">
              <blockquote className="text-balance text-lg font-semibold leading-snug md:text-xl">
                &ldquo;{problem.quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-pretty leading-relaxed text-[#7ed98d]">
                {problem.quoteFooter}
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      {/* ── The solution ────────────────────────────────────────────── */}
      {/* The claims read as a spec sheet, not a checklist: a dark instrument
          header, hairline rows, and a right-hand readout per row. */}
      <Section className="relative overflow-hidden bg-surface-raised">
        <div className="relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <Eyebrow label={solution.eyebrow} />
            <h2 className="mt-5 text-balance text-h2 font-semibold">{solution.heading}</h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{solution.body}</p>
            {/* The line that lands — given its own rule instead of plain bold */}
            <p className="mt-7 border-l-2 border-accent pl-5 text-pretty text-xl font-bold leading-snug tracking-tight text-foreground md:text-[1.4rem]">
              {solution.emphasis}
            </p>
          </Reveal>

          <Reveal>
            <div className="relative">
              {/* Offset dashed frame — depth without leaning on shadow alone */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-3 hidden size-full border border-dashed border-accent/35 sm:block"
              />

              <div className="relative border border-border bg-white shadow-[0_40px_100px_-45px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between gap-3 bg-ink px-4 py-3.5 sm:px-6 sm:py-4">
                  <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 sm:text-[11px] sm:tracking-[0.2em]">
                    {solution.panel.title}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-[#7ed98d] sm:tracking-[0.2em]">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7ed98d]/70" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-[#7ed98d]" />
                    </span>
                    {solution.panel.status}
                  </span>
                </div>

                <ul>
                  {solution.points.map((p, i) => (
                    <li
                      key={p.label}
                      className="group relative flex items-center gap-3 overflow-hidden border-b border-border px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-[1.15rem]"
                    >
                      {/* Accent wash sweeps the row, edge bar rises with it */}
                      <span
                        aria-hidden
                        className="ease-nova pointer-events-none absolute inset-y-0 left-0 w-0 bg-accent/[0.07] transition-[width] duration-500 group-hover:w-full"
                      />
                      <span
                        aria-hidden
                        className="ease-nova absolute inset-y-0 left-0 w-0.5 origin-center scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                      />

                      <span className="relative shrink-0 font-mono text-[10px] tabular-nums tracking-widest text-accent/45 sm:text-[11px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative inline-flex size-6 shrink-0 items-center justify-center bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                        <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
                      </span>

                      {/* On narrow screens the readout drops under the label —
                          side by side it would starve both columns. */}
                      <span className="relative min-w-0 flex-1">
                        <span className="block font-semibold leading-snug text-foreground">
                          {p.label}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted/50 sm:hidden">
                          {p.meta}
                        </span>
                      </span>

                      <span className="relative hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted/50 transition-colors duration-300 group-hover:text-accent sm:block">
                        {p.meta}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="flex items-center gap-3 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/55 sm:px-6 sm:tracking-[0.18em]">
                  <span aria-hidden className="h-px w-6 shrink-0 bg-accent" />
                  {solution.panel.footnote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Voice cloning ───────────────────────────────────────────── */}
      {/* The voice is made visible: a live waveform caps the panel so the
          section shows the capability instead of only describing it. */}
      <Section className="relative overflow-hidden">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow label={voice.eyebrow} />
            <h2 className="mt-5 text-balance text-h2 font-semibold">{voice.heading}</h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{voice.body}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {voice.assurances.map((a) => (
                <li
                  key={a}
                  className="inline-flex items-center gap-2 border border-border bg-surface-raised px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/65"
                >
                  <ShieldCheck aria-hidden className="size-3.5 text-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="relative border border-border bg-white shadow-[0_40px_100px_-45px_rgba(0,0,0,0.45)]">
              <div className="relative overflow-hidden bg-ink px-4 py-4 sm:px-6 sm:py-5">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 left-1/2 h-40 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.35),transparent_70%)] blur-2xl"
                />

                <div className="relative flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 sm:text-[11px] sm:tracking-[0.2em]">
                    <AudioLines aria-hidden className="size-3.5 shrink-0 text-[#7ed98d]" />
                    {voice.panel.title}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-[#7ed98d] sm:tracking-[0.2em]">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7ed98d]/70" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-[#7ed98d]" />
                    </span>
                    {voice.panel.status}
                  </span>
                </div>

                <div
                  aria-hidden
                  className="relative mt-4 flex h-12 items-center gap-[2px] sm:mt-5 sm:h-14 sm:gap-[3px]"
                >
                  {WAVE_BARS.map((h, i) => (
                    <span
                      key={i}
                      className="animate-wave w-full origin-center bg-[#7ed98d]"
                      style={{ height: `${h}%`, animationDelay: `${i * 65}ms` }}
                    />
                  ))}
                </div>
              </div>

              <ul>
                {voice.points.map((p, i) => (
                  <li
                    key={p}
                    className="group relative flex gap-3 overflow-hidden border-b border-border px-4 py-4 sm:gap-4 sm:px-6 sm:py-5"
                  >
                    <span
                      aria-hidden
                      className="ease-nova pointer-events-none absolute inset-y-0 left-0 w-0 bg-accent/[0.07] transition-[width] duration-500 group-hover:w-full"
                    />
                    <span
                      aria-hidden
                      className="ease-nova absolute inset-y-0 left-0 w-0.5 origin-center scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                    />

                    <span className="relative mt-1 shrink-0 font-mono text-[10px] tabular-nums tracking-widest text-accent/45 sm:mt-0.5 sm:text-[11px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative mt-0.5 inline-flex size-6 shrink-0 items-center justify-center bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="relative min-w-0 flex-1 text-pretty font-medium leading-relaxed text-foreground">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="flex items-center gap-3 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/55 sm:px-6 sm:tracking-[0.18em]">
                <span aria-hidden className="h-px w-6 shrink-0 bg-accent" />
                {voice.panel.footnote}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <NovaHelixSteps />

      {/* ── The numbers ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <Container>
          <ScrollGrowPanel
            from={0.85}
            className="relative overflow-hidden border border-white/10 bg-ink px-4 py-12 text-white shadow-[0_50px_140px_-40px_rgba(78,143,82,0.4)] sm:px-12 sm:py-16"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="bg-dotgrid-dark mask-radial-fade absolute inset-0 opacity-40" />
              <NeuralNet className="absolute inset-0" />
              <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.3),transparent_70%)] blur-2xl animate-glow-pulse" />
            </div>

            <div className="relative">
              <div className="text-center">
                <Eyebrow label={numbers.eyebrow} tone="dark" />
                <h2 className="mx-auto mt-5 max-w-2xl text-balance text-h2 font-semibold text-white">
                  {numbers.heading}
                </h2>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:mt-12 lg:grid-cols-5">
                {numbers.stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      "bg-ink px-3 py-6 text-center sm:px-5 sm:py-7",
                      // 5 stats in a 2-col grid leaves a hole — let the last one
                      // run full width until the 5-across layout kicks in.
                      i === numbers.stats.length - 1 && "col-span-2 lg:col-span-1",
                    )}
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block text-2xl font-bold tracking-tight text-[#7ed98d] sm:text-3xl">
                        {s.value}
                      </span>
                      <span className="mt-2 block hyphens-auto break-words font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-white/50 sm:text-[11px] sm:tracking-widest">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mx-auto mt-8 max-w-2xl text-pretty text-center text-sm leading-relaxed text-white/60">
                {numbers.note}
              </p>
            </div>
          </ScrollGrowPanel>
        </Container>
      </section>

      {/* ── Capabilities ────────────────────────────────────────────── */}
      {/* Told as a pipeline, not a grid: the 13 capabilities are mapped to the
          five stages of hiring and strung along a single spine, so the block
          reads as one employee owning the whole funnel top to bottom. */}
      <Section className="relative overflow-hidden bg-surface-raised">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-24 h-72 w-[40rem] translate-x-1/3 bg-[radial-gradient(closest-side,rgba(78,143,82,0.12),transparent)] blur-2xl"
        />

        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          {/* Narrative rail — sticks alongside the pipeline on desktop */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow label={capabilities.eyebrow} />
            <h2 className="mt-5 text-balance text-h2 font-semibold">{capabilities.heading}</h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              {capabilities.intro}
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-px border border-border bg-border">
              {capabilities.meta.map((m) => (
                <div key={m.label} className="bg-white px-4 py-4">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-2xl font-bold tracking-tight text-accent-strong">
                      {m.value}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase leading-tight tracking-[0.14em] text-muted/60">
                      {m.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* The pipeline */}
          <Reveal>
            <ol>
              {capabilities.groups.map((group, gi) => {
                const last = gi === capabilities.groups.length - 1;
                return (
                  <li key={group.stage} className="relative pb-10 pl-16 last:pb-0 sm:pl-20">
                    {/* Continuous spine — runs through every node but the last */}
                    {!last && (
                      <span
                        aria-hidden
                        className="absolute left-[19px] top-12 bottom-0 w-px bg-gradient-to-b from-accent/40 to-border sm:left-[23px]"
                      />
                    )}

                    {/* Stage node — the number that anchors this phase */}
                    <span className="absolute left-0 top-0 flex size-10 items-center justify-center bg-ink font-mono text-sm font-semibold text-white sm:size-12">
                      {String(gi + 1).padStart(2, "0")}
                      <span
                        aria-hidden
                        className="absolute -inset-1 border border-accent/25"
                      />
                    </span>

                    {/* Stage heading + caption */}
                    <div className="pt-0.5">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-h3 font-semibold tracking-tight text-foreground">
                          {group.stage}
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent/60">
                          Stage {String(gi + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted/80">
                        {group.caption}
                      </p>
                    </div>

                    {/* Capabilities in this stage */}
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {group.items.map((item, ii) => (
                        <li
                          key={item}
                          className="group/cap relative flex items-center gap-3 overflow-hidden border border-border bg-white px-4 py-3.5 transition-colors duration-300 hover:border-accent/50"
                        >
                          {/* Accent wash + edge bar, matching the spec panels */}
                          <span
                            aria-hidden
                            className="ease-nova pointer-events-none absolute inset-y-0 left-0 w-0 bg-accent/[0.07] transition-[width] duration-500 group-hover/cap:w-full"
                          />
                          <span
                            aria-hidden
                            className="ease-nova absolute inset-y-0 left-0 w-0.5 origin-center scale-y-0 bg-accent transition-transform duration-300 group-hover/cap:scale-y-100"
                          />

                          <span className="relative font-mono text-[10px] tabular-nums tracking-widest text-accent/45">
                            {String(capabilityStageStart[gi] + ii + 1).padStart(2, "0")}
                          </span>
                          <span className="relative inline-flex size-5 shrink-0 items-center justify-center bg-accent/10 text-accent transition-colors duration-300 group-hover/cap:bg-accent group-hover/cap:text-white">
                            <Check aria-hidden className="size-3" strokeWidth={3} />
                          </span>
                          <span className="relative font-medium text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* ── Why Nova Helix ──────────────────────────────────────────── */}
      <Section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[46rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(78,143,82,0.12),transparent)] blur-2xl"
        />

        <Reveal className="relative mx-auto max-w-4xl">
          <div className="relative border border-dashed border-zinc-400 bg-white/70 px-6 py-14 text-center backdrop-blur-sm sm:px-14 sm:py-16">
            {/* Corner brackets — technical framing, not a plain box */}
            <span
              aria-hidden
              className="absolute -left-px -top-px size-6 border-l-2 border-t-2 border-accent"
            />
            <span
              aria-hidden
              className="absolute -right-px -top-px size-6 border-r-2 border-t-2 border-accent"
            />
            <span
              aria-hidden
              className="absolute -bottom-px -left-px size-6 border-b-2 border-l-2 border-accent"
            />
            <span
              aria-hidden
              className="absolute -bottom-px -right-px size-6 border-b-2 border-r-2 border-accent"
            />

            {/* Oversized quote watermark */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 select-none font-serif text-[10rem] leading-none text-accent/10"
            >
              &ldquo;
            </span>

            <div className="relative">
              <Eyebrow label={why.eyebrow} />

              <p className="mx-auto mt-7 max-w-3xl text-balance text-2xl font-bold leading-snug tracking-tight text-foreground md:text-[2.1rem]">
                {why.statement}
              </p>

              {/* Signature divider */}
              <span
                aria-hidden
                className="mx-auto mt-8 block h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent"
              />

              <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
                {why.body}
              </p>

              <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.3em] text-accent/70">
                Nova Helix
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Founder program ─────────────────────────────────────────── */}
      <Section className="relative overflow-hidden bg-surface-raised">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <Eyebrow label={founder.eyebrow} />
            <h2 className="mt-5 text-balance text-h2 font-semibold">{founder.heading}</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">{founder.body}</p>

            {/* Perks as a hairline-separated ledger — reads as an inventory of
                what a founder seat actually includes. */}
            <ul className="mt-8 border-t border-border">
              {founder.perks.map((p, i) => (
                <li
                  key={p}
                  className="group flex items-center gap-4 border-b border-border py-3.5 transition-colors duration-300 hover:bg-white"
                >
                  <span className="font-mono text-[11px] tracking-widest text-accent/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex size-5 shrink-0 items-center justify-center bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Check aria-hidden className="size-3" />
                  </span>
                  <span className="font-medium text-foreground">{p}</span>
                </li>
              ))}
            </ul>

            <Link
              href="#book-demo"
              className="group mt-9 inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Claim Your Founder Spot
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <Reveal>
            <div className="relative overflow-hidden border border-border bg-white shadow-[0_30px_80px_-32px_rgba(0,0,0,0.3)]">
              {/* Oversized watermark price */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 bottom-0 select-none text-[7rem] font-bold leading-none tracking-tight text-accent/[0.06]"
              >
                {founder.card.amount}
              </span>

              <div className="relative p-9">
                <Eyebrow label={founder.card.eyebrow} />

                <p className="mt-6 flex items-baseline gap-3">
                  <span className="text-6xl font-bold tracking-tight text-foreground">
                    {founder.card.amount}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {founder.card.unit}
                  </span>
                </p>

                <span
                  aria-hidden
                  className="mt-7 block h-px w-full bg-gradient-to-r from-accent/60 via-border to-transparent"
                />

                <p className="mt-6 text-pretty text-sm leading-relaxed text-muted">
                  {founder.card.note}
                </p>

                <p className="mt-7 flex items-center gap-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                  Limited founder seats
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Guarantee ───────────────────────────────────────────────── */}
      {/* Framed like a warranty certificate: sealed badge, an accent cap, and
          the terms itemised beside the promise rather than buried in prose. */}
      <Section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-[46rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(78,143,82,0.12),transparent)] blur-2xl"
        />

        <Reveal className="relative mx-auto max-w-5xl">
          <div className="relative overflow-hidden border border-border bg-white shadow-[0_44px_110px_-45px_rgba(0,0,0,0.45)]">
            {/* Oversized watermark — the number is the whole promise */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-2 select-none text-[7rem] font-bold leading-none tracking-tight text-accent/[0.06] sm:-bottom-10 sm:-right-3 sm:text-[11rem] md:text-[14rem]"
            >
              30
            </span>

            <div className="relative grid gap-10 p-6 sm:p-12 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
              <div>
                {/* Seal — solid badge inside a dashed ring, like a stamp */}
                <span className="relative inline-flex size-16 items-center justify-center bg-accent text-white shadow-[0_18px_40px_-16px_rgba(78,143,82,0.85)]">
                  <ShieldCheck aria-hidden className="size-8" strokeWidth={1.6} />
                  <span
                    aria-hidden
                    className="absolute -inset-2 border border-dashed border-accent/40"
                  />
                </span>

                <div className="mt-8">
                  <Eyebrow label={guarantee.eyebrow} />
                </div>
                <h2 className="mt-4 text-balance text-h2 font-semibold">{guarantee.heading}</h2>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                  {guarantee.body}
                </p>

                <Link
                  href="#book-demo"
                  className="group mt-9 inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-strong hover:shadow-[0_12px_32px_rgba(78,143,82,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {guarantee.cta}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Terms ledger — the fine print, printed large */}
              <div className="md:border-l md:border-border md:pl-14">
                <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
                  <span aria-hidden className="h-px w-6 bg-accent" />
                  {guarantee.termsLabel}
                </p>

                <ul className="mt-6 border-t border-border">
                  {guarantee.terms.map((t) => (
                    <li
                      key={t}
                      className="group flex items-center gap-4 border-b border-border py-3.5 transition-colors duration-300 hover:bg-surface-raised"
                    >
                      <span className="inline-flex size-5 shrink-0 items-center justify-center bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                        <Check aria-hidden className="size-3" strokeWidth={3} />
                      </span>
                      <span className="font-semibold text-foreground">{t}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-pretty leading-relaxed text-muted/70">
                  {guarantee.footnote}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section id="book-demo" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <ScrollGrowPanel
            from={0.7}
            className="relative overflow-hidden border border-white/10 bg-ink px-4 py-14 text-center text-white shadow-[0_50px_140px_-40px_rgba(78,143,82,0.4)] sm:px-12 sm:py-20"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="bg-dotgrid-dark mask-radial-fade absolute inset-0 opacity-40" />
              <NeuralNet className="absolute inset-0" />
              <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.35),transparent_70%)] blur-2xl animate-glow-pulse" />
              <div className="absolute -bottom-32 left-1/4 h-64 w-96 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.18),transparent_70%)] blur-3xl" />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 border border-[#7ed98d]/30 bg-[#7ed98d]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#7ed98d]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7ed98d]/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#7ed98d]" />
                </span>
                {finalCta.eyebrow}
              </span>

              <h2 className="mx-auto mt-6 max-w-3xl text-balance text-h1 font-semibold text-white">
                {finalCta.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-white/90">
                {finalCta.body}
              </p>

              <NovaHelixCtaButtons ctas={finalCta.ctas} />

              <p className="mx-auto mt-6 max-w-xl text-pretty text-sm text-white/80">
                {finalCta.reassurance}
              </p>
            </div>
          </ScrollGrowPanel>
        </Container>
      </section>
    </>
  );
}
