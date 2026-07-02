"use client";

import { useEffect, useRef } from "react";

/**
 * A live neural-network layer: drifting green nodes wired together with glowing
 * synapse lines that also connect to the cursor — the same interaction as the
 * hero globe's background. Fills its positioned parent; pauses when off-screen /
 * the tab is hidden; respects reduced-motion (single static frame).
 */
export function NeuralNet({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouse = useRef<{ x: number; y: number } | null>(null);

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
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    const NET = 42;
    const net = Array.from({ length: NET }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0012,
      vy: (Math.random() - 0.5) * 0.0012,
    }));

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const linkDist = Math.min(w, h) * 0.34;
      const mx = mouse.current ? mouse.current.x * w : null;
      const my = mouse.current ? mouse.current.y * h : null;

      if (animate) {
        for (let i = 0; i < NET; i++) {
          const a = net[i];
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > 1) a.vx *= -1;
          if (a.y < 0 || a.y > 1) a.vy *= -1;
          a.x = Math.min(1, Math.max(0, a.x));
          a.y = Math.min(1, Math.max(0, a.y));
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < NET; i++) {
        const ax = net[i].x * w;
        const ay = net[i].y * h;
        for (let j = i + 1; j < NET; j++) {
          const bx = net[j].x * w;
          const by = net[j].y * h;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(78,143,82,${0.22 * (1 - d / linkDist)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
        if (mx !== null && my !== null) {
          const dm = Math.hypot(ax - mx, ay - my);
          if (dm < linkDist * 1.4) {
            ctx.strokeStyle = `rgba(126,217,141,${0.5 * (1 - dm / (linkDist * 1.4))})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(126,217,141,0.6)";
        ctx.beginPath();
        ctx.arc(ax, ay, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mx !== null && my !== null) {
        ctx.fillStyle = "rgba(126,217,141,0.95)";
        ctx.beginPath();
        ctx.arc(mx, my, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      draw(true);
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

    // Track the cursor relative to the canvas (works despite pointer-events:none).
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      mouse.current = nx >= -0.1 && nx <= 1.1 && ny >= -0.1 && ny <= 1.1 ? { x: nx, y: ny } : null;
    };
    window.addEventListener("pointermove", onMove);

    if (reduce) draw(false);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return <div ref={wrapRef} aria-hidden className={className} />;
}
