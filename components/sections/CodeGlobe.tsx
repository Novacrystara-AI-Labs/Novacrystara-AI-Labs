"use client";

import { useEffect, useRef } from "react";

/**
 * A single canvas drawing two layers:
 *  1. A live neural-network background — drifting nodes wired together (and to
 *     the cursor) with glowing synapse lines, showcasing the "AI" story.
 *  2. A rotating globe of code characters whose latitude rings project into
 *     concentric ellipses.
 * Auto-rotates; the cursor steers it on BOTH axes (horizontal + vertical).
 */

const CHARS =
  "01<>{}[]()/\\|=+-*#%$&;:.aiAIneuraldat01∑λπΔΩ◇◆▷·".split("");

interface Node {
  x: number;
  y: number;
  z: number;
  ci: number;
  bright: number;
}

function buildNodes(): Node[] {
  const nodes: Node[] = [];
  const rings = 22;
  const perRingMax = 48;
  for (let i = 0; i < rings; i++) {
    const lat = -Math.PI / 2 + (Math.PI * i) / (rings - 1);
    const y = Math.sin(lat);
    const ringR = Math.cos(lat);
    const count = Math.max(5, Math.round(perRingMax * ringR));
    for (let j = 0; j < count; j++) {
      const lon = (2 * Math.PI * j) / count + (i % 2) * 0.25;
      nodes.push({
        x: ringR * Math.cos(lon),
        y,
        z: ringR * Math.sin(lon),
        ci: (Math.random() * CHARS.length) | 0,
        bright: Math.random() > 0.86 ? 1 : 0.35 + Math.random() * 0.4,
      });
    }
  }
  return nodes;
}

export function CodeGlobe({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0); // horizontal steer
  const targetX = useRef(0); // vertical steer
  const mouse = useRef<{ x: number; y: number } | null>(null); // normalized

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    Object.assign(canvas.style, {
      position: "absolute",
      top: "0",
      left: "0",
      display: "block",
      transform: "translateZ(0)", // own compositor layer → no scroll flicker
      willChange: "transform",
    });
    wrap.appendChild(canvas);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    // The canvas keeps a FIXED pixel size. The hero block animates its width
    // while scrolling — if we stretched the canvas to 100% it would squash
    // ("extend/compress"); if we reallocated the bitmap every frame it would
    // blink. Instead the fixed-size canvas is simply clipped by the block as it
    // shrinks/slides away, which looks natural. We only re-fit on a settled
    // (debounced) genuine size change.
    const applySize = () => {
      const nw = wrap.clientWidth || 1;
      const nh = wrap.clientHeight || 1;
      const ndpr = Math.min(window.devicePixelRatio || 1, 2);
      if (nw === w && nh === h && ndpr === dpr) return;
      w = nw;
      h = nh;
      dpr = ndpr;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize(); // immediate first fit

    // Listen to the WINDOW (not the block). The hero animates the block's width
    // on scroll — we deliberately ignore that so the globe never re-fits or pops
    // mid-scroll. Only a real viewport change re-fits the canvas.
    const scheduleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applySize, 200);
    };
    window.addEventListener("resize", scheduleResize);

    const nodes = buildNodes();

    // ── Neural-network background nodes (normalized space so resize is free) ──
    const NET = 58;
    const net = Array.from({ length: NET }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0011,
      vy: (Math.random() - 0.5) * 0.0011,
    }));

    const tilt = 0.42;
    let baseRot = 0;
    let userY = 0;
    let userX = 0;
    let raf = 0;
    let frame = 0;

    const render = () => {
      frame++;
      baseRot += 0.0045;
      userY += (targetY.current - userY) * 0.06;
      userX += (targetX.current - userX) * 0.06;

      const ay = baseRot + userY;
      const ax = tilt + userX;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.42;
      const focal = 2.6;
      const baseFont = Math.max(7, R * 0.052);

      ctx.clearRect(0, 0, w, h);

      // ── Layer 1: neural network ──
      const linkDist = Math.min(w, h) * 0.32;
      const mx = mouse.current ? mouse.current.x * w : null;
      const my = mouse.current ? mouse.current.y * h : null;
      for (let i = 0; i < NET; i++) {
        const a = net[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > 1) a.vx *= -1;
        if (a.y < 0 || a.y > 1) a.vy *= -1;
        a.x = Math.min(1, Math.max(0, a.x));
        a.y = Math.min(1, Math.max(0, a.y));
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < NET; i++) {
        const ax2 = net[i].x * w;
        const ay2 = net[i].y * h;
        for (let j = i + 1; j < NET; j++) {
          const bx = net[j].x * w;
          const by = net[j].y * h;
          const d = Math.hypot(ax2 - bx, ay2 - by);
          if (d < linkDist) {
            // darker green synapse lines, still clearly visible
            ctx.strokeStyle = `rgba(64,140,84,${0.24 * (1 - d / linkDist)})`;
            ctx.beginPath();
            ctx.moveTo(ax2, ay2);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
        // brighter link to the cursor for clear interactive feedback
        if (mx !== null && my !== null) {
          const dm = Math.hypot(ax2 - mx, ay2 - (my as number));
          if (dm < linkDist * 1.25) {
            ctx.strokeStyle = `rgba(125,225,160,${0.4 * (1 - dm / (linkDist * 1.25))})`;
            ctx.beginPath();
            ctx.moveTo(ax2, ay2);
            ctx.lineTo(mx, my as number);
            ctx.stroke();
          }
        }
        // node with a faint halo so it reads against the dark block
        ctx.fillStyle = "rgba(70,150,90,0.18)";
        ctx.beginPath();
        ctx.arc(ax2, ay2, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(130,225,160,0.7)";
        ctx.beginPath();
        ctx.arc(ax2, ay2, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Layer 2: code globe ──
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let m = 0; m < 14; m++) {
        nodes[(Math.random() * nodes.length) | 0].ci = (Math.random() * CHARS.length) | 0;
      }

      const drawList: {
        sx: number;
        sy: number;
        size: number;
        alpha: number;
        r: number;
        g: number;
        b: number;
        ch: string;
      }[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x1 = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        const y1 = n.y;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;
        const x2 = x1;

        const persp = focal / (focal - z2);
        const sx = cx + x2 * R * persp;
        const sy = cy + y2 * R * persp;
        const depth = (z2 + 1) / 2;
        const alpha = (0.1 + depth * 0.8) * (0.45 + n.bright * 0.55);
        const t = Math.min(1, depth * 0.7 + n.bright * 0.5);
        drawList.push({
          sx,
          sy,
          size: baseFont * persp,
          alpha,
          r: Math.round(40 + t * 175),
          g: Math.round(120 + t * 135),
          b: Math.round(70 + t * 140),
          ch: CHARS[n.ci],
        });
      }
      drawList.sort((p, q) => p.alpha - q.alpha);

      let lastSize = -1;
      for (let i = 0; i < drawList.length; i++) {
        const d = drawList[i];
        if (d.size !== lastSize) {
          ctx.font = `${d.size.toFixed(1)}px "Courier New", monospace`;
          lastSize = d.size;
        }
        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = `rgb(${d.r},${d.g},${d.b})`;
        ctx.fillText(d.ch, d.sx, d.sy);
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(render);
    };
    render();

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      mouse.current = { x: nx, y: ny };
      targetY.current = (nx - 0.5) * 1.9; // horizontal
      targetX.current = -(ny - 0.5) * 1.1; // vertical
    };
    const onLeave = () => {
      mouse.current = null;
      targetY.current = 0;
      targetX.current = 0;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleResize);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return <div ref={wrapRef} className={className} />;
}
