"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Layers, Bot, Puzzle, Cloud } from "lucide-react";

interface HexItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

function HexItem({ icon: Icon, title, desc }: HexItemProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-[180px] group transition-transform duration-300 hover:translate-y-[-2px] z-10">
      {/* Small Hexagon containing the icon */}
      <div 
        className="relative w-14 h-14 p-[1.5px] bg-[#4e8f52]/40 transition-all duration-300 group-hover:bg-[#4e8f52] group-hover:scale-105 mb-2.5"
        style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
      >
        <div 
          className="bg-black w-full h-full flex items-center justify-center"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
        >
          <Icon className="size-5 text-[#4e8f52] transition-all duration-300 group-hover:text-white" />
        </div>
      </div>
      
      {/* Title */}
      <h4 className="text-[10px] font-bold text-[#4e8f52] tracking-widest uppercase">
        {title}
      </h4>
      
      {/* Decorative Line */}
      <div className="w-5 h-[1.5px] bg-[#4e8f52]/60 mt-1 mb-1.5" />
      
      {/* Description */}
      <p className="text-[10px] leading-relaxed text-white/55 font-medium max-w-[150px]">
        {desc}
      </p>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative h-full min-h-[380px] lg:min-h-full w-full overflow-hidden bg-black flex flex-col justify-center items-center p-6 select-none">
      {/* Subtle green ambient background glow */}
      <div className="absolute w-[40vh] h-[40vh] bg-[#4e8f52]/5 rounded-full blur-[80px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Responsive layout: row on desktop, stack on mobile */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center justify-items-center h-full">
        
        {/* Left Column - Hexagons */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col items-center justify-center gap-6 lg:gap-10 order-2 lg:order-1">
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

        {/* Center Column - Brain and pedestal */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full h-[220px] lg:h-[280px] order-1 lg:order-2">
          {/* Glowing Pedestal */}
          <div className="absolute bottom-[5%] lg:bottom-[10%] left-1/2 -translate-x-1/2 w-[220px] h-[30px] flex flex-col items-center justify-center [perspective:800px] pointer-events-none z-0">
            <div className="absolute w-[180px] h-[25px] bg-[#4e8f52]/25 rounded-full blur-xl -translate-y-2 animate-pulse" />
            <div className="absolute w-[160px] h-[20px] border-2 border-[#4e8f52]/30 rounded-full [transform:rotateX(75deg)] shadow-[0_0_12px_rgba(78,143,82,0.25)]" />
            <div className="absolute w-[100px] h-[14px] border border-[#4e8f52]/50 rounded-full [transform:rotateX(75deg)] -translate-y-1" />
            <div className="absolute w-[50px] h-[8px] border border-[#4e8f52]/70 rounded-full [transform:rotateX(75deg)] -translate-y-1.5" />
          </div>

          {/* Floating Brain Image */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-[180px] lg:w-[240px] h-[180px] lg:h-[240px] flex items-center justify-center pointer-events-none"
          >
            <Image
              src="/images/glowing_green_brain.png"
              alt="Neural Brain Network"
              width={240}
              height={240}
              className="object-contain filter drop-shadow-[0_0_20px_rgba(78,143,82,0.45)] scale-90 lg:scale-100"
            />
          </motion.div>
        </div>

        {/* Right Column - Hexagons */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col items-center justify-center gap-6 lg:gap-10 order-3">
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
