"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { NovaHelixDemoForm } from "./NovaHelixDemoForm";

const Ctx = createContext<{ open: () => void; close: () => void }>({
  open: () => {},
  close: () => {},
});

/** Open the Nova Helix demo popup from anywhere on the page. */
export function useNovaHelixDemo() {
  return useContext(Ctx);
}

/**
 * Nova Helix live-demo popup — deliberately separate from the site-wide
 * discovery dialog (different form, different copy, different lead type).
 * Intercepts `#book-demo` links so every CTA on the page opens it in place;
 * the global `#contact` discovery popup is left untouched.
 */
export function NovaHelixDemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href === "#book-demo" || href.endsWith("#book-demo")) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

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
                  className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                >
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={closeDialog}
                    className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
                  />

                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Book a Nova Helix live demo"
                    initial={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden border border-border bg-background text-left text-foreground shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:max-h-[calc(100dvh-3rem)]"
                  >
                    {/* Nova Helix header — dark block with the live badge (never scrolls) */}
                    <div className="relative shrink-0 overflow-hidden border-b border-border bg-ink px-6 py-5 text-white sm:px-8 sm:py-6">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(78,143,82,0.4),transparent_70%)] blur-2xl"
                      />
                      <div
                        aria-hidden
                        className="bg-dotgrid-dark pointer-events-none absolute inset-0 opacity-30"
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <div>
                          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#7ed98d]">
                            <span className="relative flex size-1.5">
                              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7ed98d]/70" />
                              <span className="relative inline-flex size-1.5 rounded-full bg-[#7ed98d]" />
                            </span>
                            Nova Helix · Live demo
                          </p>
                          <h3 className="mt-2 text-2xl font-bold tracking-tight">
                            See it hire, live.
                          </h3>
                          <p className="mt-1.5 max-w-lg text-sm text-white/60">
                            Tell us what you&apos;re hiring for and we&apos;ll run Nova Helix
                            against one of your real open roles — screening, calling, and
                            interviewing a candidate end to end.
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

                    {/* Body — the form owns its own scroll area + pinned footer */}
                    <NovaHelixDemoForm />
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
