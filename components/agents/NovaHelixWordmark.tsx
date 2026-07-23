"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { novaHelix } from "@/content/novaHelix";

const { headingLead, headingName } = novaHelix.hero;

const EASE = [0.16, 1, 0.3, 1] as const;

// Letters resolve out of a blur, one after another — the name assembling itself.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

/** When the last letter has landed — the hand-off point to the sheen copy. */
const SETTLE = 0.1 + headingName.length * 0.045 + 0.55;

const letter: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

/**
 * The Nova Helix headline.
 *
 * "Meet Nova" arrives as a block, then the agent's name assembles letter by
 * letter out of a blur — after which a slow green sheen travels through it on a
 * loop, so the name reads as something *running*, not a static heading.
 * Falls back to plain text under `prefers-reduced-motion`.
 */
export function NovaHelixWordmark() {
  const reduce = useReducedMotion();

  const headingClass =
    "text-balance text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.06] tracking-tight text-foreground";

  if (reduce) {
    return (
      <h1 className={headingClass}>
        {headingLead} <span className="text-accent">{headingName}</span>
        <Image
          src="/images/helix_agent.png"
          alt=""
          width={1046}
          height={1053}
          sizes="(max-width: 640px) 60px, 80px"
          priority
          className="ml-[0.18em] inline-block h-[1.22em] w-[1.22em] select-none object-contain align-[-0.24em]"
        />
      </h1>
    );
  }

  return (
    <h1 className={headingClass}>
      <span className="sr-only">
        {headingLead} {headingName}
      </span>

      <motion.span
        aria-hidden
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="inline-block"
      >
        {headingLead}
      </motion.span>{" "}
      <motion.span
        aria-hidden
        variants={container}
        initial="hidden"
        animate="show"
        className="relative inline-block align-baseline"
      >
        {/* Soft green bloom behind the name */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
          className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(78,143,82,0.22),transparent)] blur-xl"
        />

        {/* Letters assemble in solid accent... */}
        <motion.span
          className="text-accent"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: SETTLE, ease: "linear" }}
        >
          {headingName.split("").map((char, i) => (
            <motion.span key={`${char}-${i}`} variants={letter} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.span>

        {/* ...then hand off to a single, unbroken copy that carries the sheen.
            `background-clip: text` needs one text node to clip against, so it
            can't live on the per-letter spans. Cross-fading rather than
            stacking avoids ghosting: per-letter `inline-block` suppresses
            kerning, so the two copies aren't pixel-identical. */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: SETTLE, ease: "linear" }}
          className="text-sheen pointer-events-none absolute inset-0 select-none"
        >
          {headingName}
        </motion.span>

        {/* Underline draws in once the name has landed */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="absolute -bottom-1 left-0 h-px w-full origin-left bg-gradient-to-r from-accent via-accent/60 to-transparent"
        />
      </motion.span>
      {/* The agent itself, set on the headline. Sized in `em` so it tracks the
          clamped heading size exactly at every viewport, and offset below the
          baseline so it centres on the cap height rather than floating high. */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, delay: SETTLE - 0.15, ease: EASE }}
        className="relative ml-[0.18em] inline-block align-[-0.24em]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-[radial-gradient(closest-side,rgba(78,143,82,0.28),transparent)] blur-lg"
        />
        <Image
          src="/images/helix_agent.png"
          alt=""
          width={1046}
          height={1053}
          sizes="(max-width: 640px) 60px, 80px"
          priority
          className="animate-float h-[1.22em] w-[1.22em] select-none object-contain drop-shadow-[0_6px_18px_rgba(78,143,82,0.25)]"
        />
      </motion.span>
    </h1>
  );
}
