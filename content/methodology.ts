import type { MethodologyContent } from "@/types";

// SECTION 6 — Methodology (copy §6)
export const methodology: MethodologyContent = {
  heading: "A delivery methodology built for speed — without sacrificing rigor.",
  intro:
    "We've distilled three decades of enterprise IT delivery experience into a methodology purpose-built for AI: fast enough to show value in weeks, disciplined enough to scale to production.",
  phases: [
    {
      title: "Discovery",
      headline: "Find the fastest path to value",
      description:
        "We assess your data, systems, processes, and business priorities to identify the highest-impact, fastest-to-value AI opportunities.",
    },
    {
      title: "Architecture",
      headline: "Design the system first",
      description:
        "We design the technical blueprint — model selection, data pipelines, integration points, security, and governance — before a single line of code is written.",
    },
    {
      title: "Build",
      headline: "Build on proven accelerators",
      description:
        "Our engineers build using proven accelerators and reusable components, dramatically reducing time-to-first-value while maintaining enterprise-grade quality.",
    },
    {
      title: "Deploy",
      headline: "Ship it production-ready",
      description:
        'We deploy into your environment with full attention to security, monitoring, scalability, and operational readiness — no "demo-only" solutions.',
    },
    {
      title: "Continuous Optimization",
      headline: "Never stop improving",
      description:
        "AI isn't a one-time project. We monitor performance, retrain and refine models, and evolve your solutions as your data, users, and business needs change.",
    },
  ],
};
