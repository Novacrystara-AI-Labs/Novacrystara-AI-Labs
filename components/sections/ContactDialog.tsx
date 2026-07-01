"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import type { CTA } from "@/types";
import { cn } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

/**
 * Renders the final-CTA buttons; clicking any opens a centred modal containing
 * the discovery-session form. The modal is portaled to <body> so it escapes the
 * CTA panel's transform/overflow, locks body scroll, and closes on Escape or
 * backdrop click. Reduced-motion collapses the transitions.
 */
export function ContactDialog({ ctas }: { ctas: CTA[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        {ctas.map((c, i) => (
          <button
            key={c.label}
            type="button"
            onClick={() => setOpen(true)}
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

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                >
                  {/* Backdrop */}
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
                  />

                  {/* Panel */}
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Book a discovery session"
                    initial={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 my-auto w-full max-w-2xl border border-border bg-background p-6 text-left text-foreground shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-8"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-widest text-accent">
                          Discovery session
                        </p>
                        <h3 className="mt-2 text-2xl font-bold tracking-tight">
                          Tell us where you are.
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close dialog"
                        className="inline-flex size-9 shrink-0 items-center justify-center border border-border text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <X aria-hidden className="size-4" />
                      </button>
                    </div>

                    <ContactForm bare />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
