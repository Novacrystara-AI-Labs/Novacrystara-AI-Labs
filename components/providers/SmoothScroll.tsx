"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Height of the fixed navbar — anchors must land below it. */
const NAV_OFFSET = -80;

/**
 * Site-wide inertial scrolling (Lenis).
 *
 * Wheel/trackpad input is eased into momentum instead of jumping line-by-line,
 * which is what gives the page its weighted, premium feel — and it makes every
 * scroll-linked animation (beams, parallax, scroll-grow panels) interpolate
 * smoothly rather than stepping.
 *
 * Notes:
 * - Disabled entirely under `prefers-reduced-motion`.
 * - Anchor clicks are routed through Lenis so they ease to the target with the
 *   navbar offset applied. Handlers that intercept links first (the discovery
 *   and Nova Helix popups) stop propagation, so they always win.
 * - Nested scroll areas (modals, the mega-menu) opt out via `data-lenis-prevent`.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Expo-out: quick pickup, long glide to rest.
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
      // Native scrolling on touch — mobile already has its own momentum.
      syncTouch: false,
    });

    // Lenis drives scrolling itself; CSS smooth scrolling would fight it.
    document.documentElement.classList.add("lenis-on");

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Ease to in-page anchors instead of letting the browser jump.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const hash = href.startsWith("#")
        ? href
        : href.startsWith("/#") && window.location.pathname === "/"
          ? href.slice(1)
          : null;
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      document.documentElement.classList.remove("lenis-on");
      lenis.destroy();
    };
  }, []);

  return null;
}
