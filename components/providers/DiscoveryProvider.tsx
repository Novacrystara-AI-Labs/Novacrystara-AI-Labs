"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";

interface DiscoveryCtx {
  open: () => void;
  close: () => void;
}

const Ctx = createContext<DiscoveryCtx>({ open: () => {}, close: () => {} });

/** Open the discovery-session popup from anywhere: `const { open } = useDiscovery();` */
export function useDiscovery() {
  return useContext(Ctx);
}

/**
 * App-wide "Book a Discovery Session" popup.
 *
 * Renders a single modal (portaled to <body>) and, crucially, intercepts clicks
 * on ANY `#contact` link across the site — so every "Book a Discovery" /
 * "Let's talk" trigger opens the popup RIGHT THERE instead of scrolling to the
 * bottom of the page. Programmatic triggers can also call `useDiscovery().open()`.
 */
export function DiscoveryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  // Intercept every same-page "#contact" link click → open the popup in place.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href === "#contact" || href.endsWith("#contact")) {
        // Capture-phase + stopPropagation so we win over Next's <Link> handler
        // (otherwise it would scroll to the section before we can cancel it).
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Escape to close + lock body scroll while open.
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
    <Ctx.Provider value={{ open: openDialog, close: closeDialog }}>
      {children}

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
                    onClick={closeDialog}
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
                    className="relative z-10 my-auto w-full max-w-2xl overflow-hidden border border-border bg-background text-left text-foreground shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
                  >
                    {/* Header with green signature glow */}
                    <div className="relative overflow-hidden border-b border-border bg-ink px-6 py-6 text-white sm:px-8">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.4),transparent_70%)] blur-2xl"
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-widest text-[#7ed98d]">
                            Discovery session
                          </p>
                          <h3 className="mt-2 text-2xl font-bold tracking-tight">
                            Tell us where you are.
                          </h3>
                          <p className="mt-1.5 text-sm text-white/60">
                            A NovaCrystara strategist will reach out to schedule your session.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={closeDialog}
                          aria-label="Close dialog"
                          className="inline-flex size-9 shrink-0 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-[#7ed98d] hover:text-[#7ed98d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed98d]"
                        >
                          <X aria-hidden className="size-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <ContactForm bare />
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </Ctx.Provider>
  );
}
