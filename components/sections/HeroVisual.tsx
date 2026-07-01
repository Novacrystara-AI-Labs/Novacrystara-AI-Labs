"use client";

import { Layers, Bot, Puzzle, Cloud } from "lucide-react";
import { CodeGlobe } from "./CodeGlobe";

const HEX = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

interface HexItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const tiles: HexItemProps[] = [
  { icon: Layers, title: "Enterprise AI Platforms", desc: "Scalable platforms built for real-world impact." },
  { icon: Bot, title: "AI Agents", desc: "Intelligent agents that think, act and deliver." },
  { icon: Puzzle, title: "AI Integration", desc: "Seamless integration with your existing systems." },
  { icon: Cloud, title: "AI Modernization", desc: "Modernize legacy systems and accelerate growth." },
];

function HexItem({ icon: Icon, title, desc }: HexItemProps) {
  return (
    <div className="group pointer-events-auto relative flex w-[150px] flex-col items-center px-1.5 py-1 text-center transition-transform duration-300 hover:-translate-y-1 lg:w-[165px]">
      {/* Soft glow halo behind the hexagon */}
      <div className="pointer-events-none absolute left-1/2 top-0 size-12 -translate-x-1/2 rounded-full bg-[#4e8f52]/25 opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

      {/* Hexagon icon */}
      <div
        className="relative mb-2 size-11 bg-[#4e8f52]/70 p-[2px] shadow-[0_0_12px_rgba(78,143,82,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#63d877] group-hover:shadow-[0_0_22px_rgba(99,216,119,0.75)] lg:size-[52px]"
        style={{ clipPath: HEX }}
      >
        <div className="flex size-full items-center justify-center bg-black" style={{ clipPath: HEX }}>
          <Icon className="size-4 text-[#80e296] transition-colors duration-300 group-hover:text-white lg:size-5" />
        </div>
      </div>

      {/* Title */}
      <h4 className="text-[9px] font-bold uppercase leading-tight tracking-[0.14em] text-[#6fd47e] transition-colors duration-300 group-hover:text-white lg:text-[10px] [text-shadow:0_1px_6px_rgba(0,0,0,0.85)]">
        {title}
      </h4>

      {/* Animated underline */}
      <div className="mb-1.5 mt-1 h-[2px] w-4 bg-[#4e8f52] transition-all duration-300 group-hover:w-8 group-hover:bg-[#63d877]" />

      {/* Description */}
      <p className="max-w-[150px] text-[9px] font-medium leading-snug text-white/70 transition-colors duration-300 group-hover:text-white/95 lg:text-[10px] [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
        {desc}
      </p>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative flex h-full min-h-[440px] w-full select-none flex-col overflow-hidden bg-black lg:block">
      {/* Globe area — a top strip on mobile/tablet, the full background on desktop */}
      <div className="relative h-[240px] w-full shrink-0 sm:h-[300px] lg:absolute lg:inset-0 lg:h-auto">
        {/* Ambient green core glow */}
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_center,rgba(78,143,82,0.12),transparent_62%)]" />
        {/* Live neural network + rotating code globe */}
        <CodeGlobe className="absolute inset-0 z-0 cursor-crosshair" />
        {/* Edge vignette */}
        <div className="pointer-events-none absolute inset-0 z-[1] [background:radial-gradient(circle_at_center,transparent_52%,rgba(0,0,0,0.94)_97%)]" />
      </div>

      {/* DESKTOP (lg+): tiles overlaid left/right over the full-block globe */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden items-center px-6 lg:flex">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <div className="flex flex-col items-center gap-14">
            <HexItem {...tiles[0]} />
            <HexItem {...tiles[1]} />
          </div>
          <div className="flex flex-col items-center gap-14">
            <HexItem {...tiles[2]} />
            <HexItem {...tiles[3]} />
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET (< lg): a clean 2×2 grid below the globe, no overlap */}
      <div className="relative z-10 grid grid-cols-2 place-items-center gap-x-4 gap-y-9 border-t border-white/5 px-4 py-9 lg:hidden">
        {tiles.map((t) => (
          <HexItem key={t.title} {...t} />
        ))}
      </div>
    </div>
  );
}
