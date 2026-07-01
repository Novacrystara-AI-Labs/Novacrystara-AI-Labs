"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/content/faq";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * OPTIONAL — FAQ (arch §5 O3).
 * Single-open accordion: opening one item closes the others; the answer height
 * animates in/out. Two-column editorial layout.
 */
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow label="FAQ" />
          <h2 className="mt-5 text-balance text-h2 font-semibold">{faq.heading}</h2>
          <p className="mt-4 text-pretty text-muted">
            Straight answers on how we work, integrate, and de-risk enterprise AI.
          </p>
        </Reveal>

        <Reveal className="border border-border bg-white">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} className="border-b border-border last:border-b-0">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={cn(
                      "group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:px-8",
                      isOpen ? "text-accent" : "text-foreground hover:text-accent",
                    )}
                  >
                    <span className="text-lg font-semibold tracking-tight">{item.question}</span>
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center border transition-all duration-300",
                        isOpen
                          ? "rotate-45 border-accent bg-accent text-white"
                          : "border-border text-accent group-hover:border-accent",
                      )}
                    >
                      <Plus aria-hidden className="size-4" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="panel"
                      initial={reduce ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pr-10 text-pretty leading-relaxed text-muted sm:px-8">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
