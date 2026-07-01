"use client";

import { useEffect, useRef } from "react";

/**
 * Premium enterprise "data-flow" background (inspired by Mistral / Vercel /
 * Stripe / Linear). Thousands of tiny ASCII glyphs drift through an invisible
 * Perlin-noise vector field, moving in coordinated streams like data flowing
 * through a system — with soft fade-in/out, slow respawning, and gentle density
 * variation. Deliberately understated: peak opacity stays under ~13%.
 *
 * Performance:
 *  - Glyphs are pre-rendered once to a sprite atlas and blitted with drawImage
 *    (far cheaper than per-frame fillText) → smooth 60fps at high counts.
 *  - The rAF loop pauses when the block scrolls out of view or the tab is
 *    hidden (IntersectionObserver + visibilitychange) → ~0 idle CPU.
 *  - Respects prefers-reduced-motion (single static frame).
 *
 * Fills its positioned parent — use inside a `relative overflow-hidden` block.
 */

const CHARS = ["+", "#", "/", "|", ".", ",", "-", "="];

// ── Improved Perlin noise (3D; z animates the field over time) ──────────────
const perm = new Uint8Array(512);
(() => {
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
})();
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + t * (b - a);
function grad(hash: number, x: number, y: number, z: number) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}
function perlin(x: number, y: number, z: number) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  const u = fade(x);
  const v = fade(y);
  const w = fade(z);
  const A = perm[X] + Y;
  const AA = perm[A] + Z;
  const AB = perm[A + 1] + Z;
  const B = perm[X + 1] + Y;
  const BA = perm[B] + Z;
  const BB = perm[B + 1] + Z;
  return lerp(
    lerp(
      lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
      lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u),
      v,
    ),
    lerp(
      lerp(grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1), u),
      lerp(grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1), u),
      v,
    ),
    w,
  );
}

interface P {
  x: number;
  y: number;
  ci: number;
  size: number;
  spd: number;
  life: number;
  max: number;
  amp: number;
}

export function CodeParticles({
  className,
  /** Glyphs per pixel² (higher = denser streams). */
  density = 0.0016,
  /** Base glyph colour "r,g,b". */
  color = "120,175,130",
  /** Peak glyph opacity (kept understated, < 0.15). */
  maxOpacity = 0.13,
}: {
  className?: string;
  density?: number;
  color?: string;
  maxOpacity?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    Object.assign(canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
    });
    wrap.appendChild(canvas);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: P[] = [];
    let sprites: HTMLCanvasElement[] = [];

    // Flow-field constants
    const NS = 0.0016; // spatial noise scale → large, smooth, coordinated cells
    const TZ = 0.00006; // temporal evolution speed
    const TURN = Math.PI * 2 * 1.5; // how much the field can curl

    // Pre-render each glyph to its own small canvas (sprite atlas).
    const buildSprites = () => {
      const S = Math.ceil(28 * dpr);
      sprites = CHARS.map((ch) => {
        const c = document.createElement("canvas");
        c.width = S;
        c.height = S;
        const cx = c.getContext("2d")!;
        cx.font = `${Math.round(22 * dpr)}px "Courier New", monospace`;
        cx.textAlign = "center";
        cx.textBaseline = "middle";
        cx.fillStyle = `rgb(${color})`;
        cx.fillText(ch, S / 2, S / 2);
        return c;
      });
    };

    const spawn = (initial: boolean): P => {
      const max = 260 + Math.random() * 620; // slow respawn (long lives)
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        ci: (Math.random() * CHARS.length) | 0,
        size: 8 + Math.random() * 6,
        spd: 0.18 + Math.random() * 0.4,
        // stagger initial lives so fades don't pulse in unison
        life: initial ? Math.random() * max : 0,
        max,
        amp: (0.45 + Math.random() * 0.55) * maxOpacity,
      };
    };

    const seed = () => {
      const target = Math.min(2600, Math.round(w * h * density));
      particles = Array.from({ length: target }, () => spawn(true));
    };

    const fit = () => {
      const nw = wrap.clientWidth || 1;
      const nh = wrap.clientHeight || 1;
      const ndpr = Math.min(window.devicePixelRatio || 1, 2);
      if (nw === w && nh === h && ndpr === dpr) return;
      w = nw;
      h = nh;
      dpr = ndpr;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildSprites();
      seed();
    };
    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    let tick = 0;

    const step = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);
      if (move) tick++;
      const z = tick * TZ;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (move) {
          const angle = perlin(p.x * NS, p.y * NS, z) * TURN;
          p.x += Math.cos(angle) * p.spd;
          p.y += Math.sin(angle) * p.spd;
          p.life++;

          const out = p.x < -16 || p.x > w + 16 || p.y < -16 || p.y > h + 16;
          if (p.life >= p.max || out) {
            particles[i] = spawn(false);
            continue;
          }
        }

        // Soft fade in (first 16%) / fade out (last 28%)
        const t = p.life / p.max;
        let a = 1;
        if (t < 0.16) a = t / 0.16;
        else if (t > 0.72) a = (1 - t) / 0.28;
        const alpha = a * p.amp;
        if (alpha <= 0.002) continue;

        ctx.globalAlpha = alpha;
        const sp = sprites[p.ci];
        ctx.drawImage(sp, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      step(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only animate while visible & tab is active → minimal CPU.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const onVis = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);

    if (reduce) step(false); // single static frame

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [density, color, maxOpacity]);

  return <div ref={wrapRef} aria-hidden className={className} />;
}
