"use client";

import { Layers, Bot, Puzzle, Cloud } from "lucide-react";
import { CodeGlobe } from "./CodeGlobe";

const HEX = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

interface HexItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

function HexItem({ icon: Icon, title, desc }: HexItemProps) {
  return (
    <div className="group pointer-events-auto relative flex w-[140px] flex-col items-center px-1.5 py-1 text-center transition-transform duration-300 hover:-translate-y-1 lg:w-[165px]">
      {/* Soft glow halo behind the hexagon */}
      <div className="pointer-events-none absolute left-1/2 top-0 size-12 -translate-x-1/2 rounded-full bg-[#4e8f52]/25 opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

      {/* Hexagon icon */}
      <div
        className="relative mb-2 size-11 bg-[#4e8f52]/70 p-[2px] shadow-[0_0_12px_rgba(78,143,82,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#63d877] group-hover:shadow-[0_0_22px_rgba(99,216,119,0.75)] lg:size-[52px]"
        style={{ clipPath: HEX }}
      >
        <div
          className="flex size-full items-center justify-center bg-black"
          style={{ clipPath: HEX }}
        >
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
    <div className="relative flex h-full min-h-[440px] w-full select-none items-center justify-center overflow-hidden bg-black px-6 py-5 lg:min-h-full">
      {/* Ambient green core glow */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_center,rgba(78,143,82,0.1),transparent_62%)]" />

      {/* Full-block canvas: live neural network + rotating code globe */}
      <CodeGlobe className="absolute inset-0 z-0 cursor-crosshair" />

      {/* Edge vignette so characters dissolve into the (slightly darker) block */}
      <div className="pointer-events-none absolute inset-0 z-[1] [background:radial-gradient(circle_at_center,transparent_52%,rgba(0,0,0,0.94)_97%)]" />

      {/* Feature tiles overlay (interactions pass through to the canvas between tiles) */}
      <div className="pointer-events-none relative z-10 flex h-full w-full max-w-5xl flex-col items-center justify-center gap-6 lg:flex-row lg:justify-between lg:gap-4">
        <div className="flex flex-row items-center justify-center gap-6 lg:flex-col lg:gap-6">
          <HexItem
            icon={Layers}
            title="Enterprise AI Platforms"
            desc="Scalable platforms built for real-world impact."
          />
          <HexItem
            icon={Bot}
            title="AI Agents"
            desc="Intelligent agents that think, act and deliver."
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-6 lg:flex-col lg:gap-6">
          <HexItem
            icon={Puzzle}
            title="AI Integration"
            desc="Seamless integration with your existing systems."
          />
          <HexItem
            icon={Cloud}
            title="AI Modernization"
            desc="Modernize legacy systems and accelerate growth."
          />
        </div>
      </div>
    </div>
  );
}
