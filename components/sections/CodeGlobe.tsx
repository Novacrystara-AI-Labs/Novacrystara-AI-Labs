"use client";

import { useEffect, useRef } from "react";

/**
 * A single canvas drawing two layers:
 *  1. A live neural-network background — drifting nodes wired together (and to
 *     the cursor) with glowing synapse lines, showcasing the "AI" story.
 *  2. A rotating globe whose surface is a cloud of tokens: prominent AI model
 *     names (bright, larger) scattered over a dense field of faint binary
 *     digits + smaller model names — the whole sphere reading as "the AI
 *     universe". Latitude rings project into concentric ellipses.
 * Auto-rotates; the cursor steers it on BOTH axes (horizontal + vertical).
 */

// Prominent, front-and-centre AI model names.
// const MODELS = [
//   "GPT", "Claude", "Gemini", "Llama", "DeepSeek", "Mistral", "Mixtral", "Grok",
//   "Qwen", "Kimi", "Phi", "Gemma", "Falcon", "Mamba", "XGen", "Dolphin",
//   "ChatGLM", "Pythia", "Alpaca", "Hermes", "Baichuan", "OpenLLaMA", "Zephyr",
//   "Arctic", "DBRX", "BLOOM", "StableLM", "WizardLM", "MPT", "GLM", "Doubao",
//   "Hunyuan", "ERNIE", "Aya", "MiniMax", "Jamba", "Yi", "InternLM", "Command",
//   "Nemotron", "EXAONE", "Reka", "OLMo", "Vicuna", "Solar", "Jais", "Orca",
//   "RWKV", "Granite", "Aquila", "RedPajama", "Codestral", "StarCoder", "Coder",
// ];

const MODELS = [
  // Foundation AI
  "AI",
  "Machine Learning",
  "Deep Learning",
  "Neural Networks",
  "Generative AI",
  "Agentic AI",
  "Autonomous AI",
  "Foundation Models",
  "Multimodal AI",
  "Responsible AI",

  // Large Language Models
  "LLM",
  "GPT",
  "Claude",
  "Gemini",
  "Llama",
  "Mistral",
  "Qwen",
  "DeepSeek",
  "Phi",
  "Gemma",

  // Core AI Concepts
  "RAG",
  "Embeddings",
  "Vector Database",
  "Semantic Search",
  "Prompt Engineering",
  "Fine-tuning",
  "Inference",
  "Tokenization",
  "Context Window",
  "Attention",
  "Transformer",
  "Knowledge Graph",
  "Reasoning",
  "Memory",
  "Hallucination",
  "Grounding",
  "Chunking",
  "Re-ranking",
  "Retrieval",
  "Indexing",

  // AI Agents
  "AI Agent",
  "Multi-Agent",
  "Agent Orchestration",
  "Planning",
  "Tool Calling",
  "Function Calling",
  "Workflow Automation",
  "Autonomous Workflows",
  "Human-in-the-Loop",
  "Reflection",

  // Data & Search
  "Vector Search",
  "Hybrid Search",
  "Similarity Search",
  "Metadata",
  "Document Intelligence",
  "OCR",
  "Data Pipelines",
  "Feature Store",
  "Data Lake",
  "Data Warehouse",

  // Model Development
  "Pretraining",
  "Fine-tuning",
  "PEFT",
  "LoRA",
  "RLHF",
  "Distillation",
  "Quantization",
  "Model Evaluation",
  "Benchmarking",
  "Guardrails",

  // Infrastructure
  "GPU",
  "TPU",
  "CUDA",
  "ONNX",
  "TensorRT",
  "Kubernetes",
  "Docker",
  "API",
  "Model Serving",
  "Inference Engine",

  // Popular Frameworks & Tools
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "Hugging Face",
  "vLLM",
  "Ollama",
  "MLflow",
  "OpenAI",
  "Anthropic",
  "Vertex AI",
  "Azure AI",
  "Amazon Bedrock",

  // Business AI
  "AI Copilot",
  "AI Assistant",
  "Chatbot",
  "Intelligent Automation",
  "Decision Intelligence",
  "Predictive Analytics",
  "Personalization",
  "Recommendation Engine",
  "Enterprise AI",
  "AI Governance"
];

// The faint background field is mostly binary, sprinkled with small models.
const DIGITS = ["0", "1"];

interface Node {
  x: number;
  y: number;
  z: number;
  token: string;
  // 2 = prominent model, 1 = faint model, 0 = binary digit
  kind: 0 | 1 | 2;
  bright: number;
}

// Golden angle → the Fibonacci lattice that spaces points EVENLY on a sphere
// (see fib()). Words + a faint binary field share the sphere surface.
// (no pole clustering, no overlapping rings — the key to reading as a globe).
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

function fib(i: number, n: number, offset: number): { x: number; y: number; z: number } {
  const y = 1 - (i / (n - 1)) * 2; // 1 → -1
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = i * GOLDEN + offset;
  return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
}

function buildNodes(): Node[] {
  const nodes: Node[] = [];

  // ── Words: spread evenly over the sphere, sampled across the whole list. ──
  const WORD_COUNT = Math.min(MODELS.length, 82);
  for (let i = 0; i < WORD_COUNT; i++) {
    const { x, y, z } = fib(i, WORD_COUNT, 0);
    const prominent = i % 3 === 0; // ~1/3 read as headline terms
    nodes.push({
      x,
      y,
      z,
      token: MODELS[Math.floor((i * MODELS.length) / WORD_COUNT)],
      kind: prominent ? 2 : 1,
      bright: prominent ? 0.95 : 0.6,
    });
  }

  // ── Binary texture: a denser lattice, offset so digits sit BETWEEN words. ──
  const DIGIT_COUNT = 150;
  for (let i = 0; i < DIGIT_COUNT; i++) {
    const { x, y, z } = fib(i, DIGIT_COUNT, 0.6);
    nodes.push({
      x,
      y,
      z,
      token: Math.random() < 0.5 ? DIGITS[0] : DIGITS[1],
      kind: 0,
      bright: 0.3 + Math.random() * 0.25,
    });
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

    const render = () => {
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
      const digitFont = Math.max(6, R * 0.036);
      const wordFont = Math.max(9, R * 0.05);
      const bigFont = Math.max(11, R * 0.064);

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

      // ── Layer 2: token globe ──
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Living "code" shimmer: flip a few random binary digits each frame.
      for (let m = 0; m < 12; m++) {
        const n = nodes[(Math.random() * nodes.length) | 0];
        if (n.kind === 0) n.token = Math.random() < 0.5 ? "0" : "1";
      }

      const drawList: {
        sx: number;
        sy: number;
        size: number;
        alpha: number;
        depth: number;
        r: number;
        g: number;
        b: number;
        token: string;
        bold: boolean;
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
        const depth = (z2 + 1) / 2; // 0 = back, 1 = front

        // Depth pushes edge/back words "into" the sphere: they shrink (persp)
        // AND fade steeply, so the front face stays crisp and clearly spherical.
        const base = n.kind === 0 ? digitFont : n.kind === 2 ? bigFont : wordFont;
        let alpha: number;
        if (n.kind === 0) {
          alpha = (0.04 + depth * 0.42) * (0.5 + n.bright * 0.5); // faint texture
        } else {
          const dd = depth * depth; // steeper front emphasis for words
          alpha = (0.05 + dd * 0.95) * (0.6 + n.bright * 0.4);
        }
        const t = Math.min(1, depth * 0.75 + n.bright * 0.45);
        // Pure-green ramp: dark green (back) → #4e8f52 (mid) → glowing green (front).
        drawList.push({
          sx,
          sy,
          size: base * persp,
          alpha,
          depth,
          r: Math.round(28 + t * 88),
          g: Math.round(70 + t * 162),
          b: Math.round(40 + t * 100),
          token: n.token,
          bold: n.kind === 2,
        });
      }
      // Painter's algorithm: far tokens first, near ones drawn on top.
      drawList.sort((p, q) => p.depth - q.depth);

      let lastFont = "";
      for (let i = 0; i < drawList.length; i++) {
        const d = drawList[i];
        const font = `${d.bold ? "700 " : ""}${d.size.toFixed(1)}px "Courier New", monospace`;
        if (font !== lastFont) {
          ctx.font = font;
          lastFont = font;
        }
        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = `rgb(${d.r},${d.g},${d.b})`;
        // Only front-facing headline words glow — keeps the back clean + fast.
        if (d.bold && d.depth > 0.62) {
          ctx.shadowColor = "rgba(99,216,119,0.4)";
          ctx.shadowBlur = d.size * 0.26;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillText(d.token, d.sx, d.sy);
      }
      ctx.shadowBlur = 0;
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
