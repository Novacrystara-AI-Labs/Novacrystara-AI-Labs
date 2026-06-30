"use client";

import { useEffect, useRef } from "react";

/**
 * An animated field of "code" characters arranged on latitude rings of a
 * rotating sphere. As it spins the rings project into concentric ellipses — a
 * living globe of code that tells the "global, data-driven AI" story.
 * Auto-rotates; the cursor steers it horizontally (vertical axis stays locked).
 */

const CHARS =
  "01<>{}[]()/\\|=+-*#%$&;:.aiAIneuraldat␣01∑λπΔΩ◇◆▷·".split("");

interface Node {
  x: number;
  y: number;
  z: number;
  ci: number; // index into CHARS
  bright: number; // 0..1 base brightness
}

function buildNodes(): Node[] {
  const nodes: Node[] = [];
  const rings = 24;
  const perRingMax = 52;
  for (let i = 0; i < rings; i++) {
    const lat = -Math.PI / 2 + (Math.PI * i) / (rings - 1);
    const y = Math.sin(lat);
    const ringR = Math.cos(lat);
    const count = Math.max(5, Math.round(perRingMax * ringR));
    for (let j = 0; j < count; j++) {
      const lon = (2 * Math.PI * j) / count + (i % 2) * 0.25; // stagger rows
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
  const targetRot = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    wrap.appendChild(canvas);

    let w = 1;
    let h = 1;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = wrap.clientWidth || 1;
      h = wrap.clientHeight || 1;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const nodes = buildNodes();

    // Faint ambient background characters (static-ish "code everywhere" field).
    const ambient = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      ci: (Math.random() * CHARS.length) | 0,
    }));

    const tilt = 0.42; // fixed vertical tilt — never changes (horizontal only)
    let baseRot = 0;
    let userRot = 0;
    let raf = 0;
    let frame = 0;

    const render = () => {
      frame++;
      baseRot += 0.0045;
      userRot += (targetRot.current - userRot) * 0.06;
      const ay = baseRot + userRot;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.46;
      const focal = 2.6;
      const baseFont = Math.max(7, R * 0.052);

      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Ambient field
      ctx.font = `${Math.max(8, baseFont * 0.85)}px "Courier New", monospace`;
      for (let k = 0; k < ambient.length; k++) {
        const a = ambient[k];
        if (frame % 4 === 0 && Math.random() < 0.03) a.ci = (Math.random() * CHARS.length) | 0;
        ctx.fillStyle = "rgba(78,143,82,0.07)";
        ctx.fillText(CHARS[a.ci], a.x * w, a.y * h);
      }

      // Occasionally mutate a few node characters for a "computing" feel.
      for (let m = 0; m < 14; m++) {
        nodes[(Math.random() * nodes.length) | 0].ci = (Math.random() * CHARS.length) | 0;
      }

      // Project + depth-sort the globe characters.
      const drawList: { sx: number; sy: number; size: number; alpha: number; r: number; g: number; b: number; ch: string }[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // rotate around Y
        const x1 = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        const y1 = n.y;
        // rotate around X (fixed tilt)
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;
        const x2 = x1;

        const persp = focal / (focal - z2);
        const sx = cx + x2 * R * persp;
        const sy = cy + y2 * R * persp;
        const depth = (z2 + 1) / 2; // 0 = back, 1 = front
        const alpha = (0.12 + depth * 0.88) * (0.5 + n.bright * 0.5);

        // green → bright mint toward the front / bright nodes
        const t = Math.min(1, depth * 0.7 + n.bright * 0.5);
        const r = Math.round(40 + t * 175);
        const g = Math.round(120 + t * 135);
        const b = Math.round(70 + t * 140);

        drawList.push({ sx, sy, size: baseFont * persp, alpha, r, g, b, ch: CHARS[n.ci] });
      }
      drawList.sort((p, q) => p.alpha - q.alpha); // back (dim) first

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
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      targetRot.current = nx * 1.8;
    };
    const onLeave = () => {
      targetRot.current = 0;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return <div ref={wrapRef} className={className} />;
}
