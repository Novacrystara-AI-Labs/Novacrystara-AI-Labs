/**
 * Content models (arch §7.3, §8).
 * Every section of NovaCrystara-Website-Copy-v1.md maps to one of these shapes.
 */

export interface CTA {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

/* Section 1 — Hero */
export interface HeroContent {
  headline: string;
  /** Phrase within `headline` to highlight in the accent color. */
  headlineHighlight: string;
  lead: string;
  /** Condensed ~4-line version of `lead` for the hero block. */
  summary: string;
  founderNote: string;
  /** Short line for the hero actions block. */
  actionNote: string;
  ctas: CTA[];
}

/* Section 2 — The Problem */
export interface PainPoint {
  title: string;
  description: string;
}
export interface ProblemContent {
  heading: string;
  intro: string;
  painPoints: PainPoint[];
  closing: string;
}

/* Section 3 — Differentiators */
export interface Pillar {
  title: string;
  description: string;
}
export interface DifferentiatorContent {
  heading: string;
  intro: string;
  pillars: Pillar[];
}

/* Section 4 — Solutions */
export interface Solution {
  title: string;
  description: string;
}
export interface SolutionsContent {
  heading: string;
  intro: string;
  solutions: Solution[];
}

/* Section 5 — Use Cases (expandable cards, arch §7) */
export interface UseCase {
  id: string;
  title: string;
  tagline: string;
  intro: string[];
  capabilities: string[];
  benefits: string[];
  icon: string;
}
export interface UseCasesContent {
  heading: string;
  tagline: string;
  useCases: UseCase[];
}

/* Section 6 — Methodology */
export interface Phase {
  title: string;
  /** Short punchy headline for the phase (used in the pinned stepper). */
  headline?: string;
  description: string;
}
export interface MethodologyContent {
  heading: string;
  intro: string;
  phases: Phase[];
}

/* Section 7 — Capabilities */
export interface Capability {
  title: string;
  description: string;
}
export interface CapabilitiesContent {
  heading: string;
  intro: string;
  capabilities: Capability[];
}

/* Section 8 — Engagement Models */
export interface EngagementModel {
  title: string;
  description: string;
}
export interface EngagementContent {
  heading: string;
  intro: string;
  models: EngagementModel[];
  closing: string;
}

/* Section 9 — CTA */
export interface CTAContent {
  heading: string;
  body: string;
  ctas: CTA[];
  reassurance: string;
}

/* Optional — About */
export interface AboutContent {
  heading: string;
  paragraphs: string[];
}

/* Optional — Trust & Governance */
export interface TrustContent {
  heading: string;
  body: string;
}

/* Optional — FAQ */
export interface FAQItem {
  question: string;
  answer: string;
}
export interface FAQContent {
  heading: string;
  items: FAQItem[];
}

/* Autonomous agents — the "Solutions" mega-menu registry + agent landing pages */
export interface Agent {
  /** Route slug under /agents. Only used when `status === "live"`. */
  slug: string;
  name: string;
  /** Role line, e.g. "Autonomous Hiring Employee". */
  role: string;
  description: string;
  /** Lucide icon name resolved in the mega-menu / grid. */
  icon: string;
  status: "live" | "coming-soon";
  /** Short launch hint shown on locked cards, e.g. "Q3 2026". */
  eta?: string;
}

/* Global — Site chrome */
export interface SiteContent {
  brand: string;
  url: string;
  description: string;
  nav: NavLink[];
  primaryCta: CTA;
  footer: {
    tagline: string;
    links: NavLink[];
    legal: string;
  };
  contact: {
    email: string;
  };
}
