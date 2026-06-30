# NovaCrystara AI Labs — Website Architecture

> **A blueprint for an enterprise-grade, immersive marketing website.**
> Built with engineering discipline — the same philosophy NovaCrystara brings to AI.

---

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║      N O V A C R Y S T A R A   ·   A I   L A B S                       ║
║                                                                        ║
║      AI Solutions, Delivered for Speed, Scale, and ROI.                ║
║                                                                        ║
║      Architecture · Engineering · Design System                       ║
║      Version 1.0  ·  Source of truth: NovaCrystara-Website-Copy-v1.md  ║
║                                                                        ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Table of Contents

1. [Vision & Design Philosophy](#1--vision--design-philosophy)
2. [Technology Stack](#2--technology-stack)
3. [Design System](#3--design-system)
4. [3D & Motion Architecture (Three.js)](#4--3d--motion-architecture-threejs)
5. [Information Architecture — Section Map](#5--information-architecture--section-map)
6. [Component Architecture](#6--component-architecture)
7. [The Use Cases Module — Expandable Cards](#7--the-use-cases-module--expandable-cards)
8. [Content Data Layer](#8--content-data-layer)
9. [Project File Structure](#9--project-file-structure)
10. [Routing & Page Composition](#10--routing--page-composition)
11. [Performance & Accessibility](#11--performance--accessibility)
12. [SEO & Metadata](#12--seo--metadata)
13. [Build, Tooling & Deployment](#13--build-tooling--deployment)
14. [Content Integrity Checklist](#14--content-integrity-checklist)

---

## 1 · Vision & Design Philosophy

NovaCrystara is an AI company built by enterprise IT veterans. The website must *feel* like
the brand: **grounded, governed, built to last** — yet **modern, mesmerizing, and alive**.

The design language is named **"Crystalline Intelligence"** — a fusion of:

| Principle            | Expression in the UI                                                       |
| -------------------- | ------------------------------------------------------------------------- |
| **Architecture-First** | Strong grid, generous whitespace, deliberate hierarchy.                   |
| **Speed**              | Sub-second LCP, instant interactions, no layout shift.                    |
| **Enterprise Trust**   | Restrained palette, precise typography, no gimmicks.                      |
| **Mesmerizing depth**  | A living Three.js crystal/particle field that reacts to scroll & cursor.  |
| **Outcome Obsession**  | Every section drives toward a single CTA: *Book a Discovery Session*.     |

> **Design north star:** *"Boardroom-credible, but unforgettable."*

```
        Restraint  ◄──────────────────────────►  Spectacle
                          ▲
                          │   NovaCrystara sits here:
                          │   disciplined surfaces, with
                          │   one mesmerizing 3D focal point.
```

---

## 2 · Technology Stack

| Layer            | Choice                          | Why                                                              |
| ---------------- | ------------------------------- | --------------------------------------------------------------- |
| **Framework**    | **Next.js 15** (App Router)     | SSR/SSG, RSC, image optimization, file-based routing, SEO.      |
| **Language**     | **TypeScript** (strict)         | Type-safe content models and component contracts.               |
| **Styling**      | **Tailwind CSS v4**             | Utility-first, design-token driven, zero runtime CSS.           |
| **Typography**   | **Geist** (primary), **Arial** fallback | Geist via `next/font`; Arial as a guaranteed system fallback. |
| **3D / WebGL**   | **Three.js** + React Three Fiber + Drei | Declarative 3D inside React; the "mesmerizing" layer.       |
| **Animation**    | **Framer Motion**               | Scroll reveals, layout animations, the expandable cards.        |
| **Icons**        | **Lucide React**                | Consistent, lightweight line icons.                             |
| **Forms**        | React Hook Form + Zod           | Discovery-session capture with validation.                      |
| **Lint/Format**  | ESLint + Prettier               | Code consistency.                                               |
| **Deployment**   | Vercel (recommended)            | First-class Next.js hosting, edge CDN, preview deploys.         |

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js 15 (App Router)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ Server        │  │ Client        │  │ Three.js Canvas │    │
│  │ Components    │  │ Components     │  │ (R3F, dynamic)  │    │
│  │ (content,SEO) │  │ (interactivity)│  │  client-only    │    │
│  └──────────────┘  └──────────────┘  └──────────────────┘    │
│         │                  │                    │             │
│         └──────────────────┴────────────────────┘            │
│                  Tailwind v4 Design Tokens                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 3 · Design System

### 3.1 Typography

Primary typeface **Geist** loaded via `next/font/local` or `geist` package, with **Arial**
(then `sans-serif`) as fallback to guarantee zero-FOIT rendering.

```ts
// app/fonts.ts
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// Fallback chain resolves to: Geist → Arial → sans-serif
```

```css
/* Tailwind theme tokens */
--font-sans: var(--font-geist-sans), Arial, sans-serif;
--font-mono: var(--font-geist-mono), "Courier New", monospace;
```

**Type scale (fluid, clamp-based):**

| Token        | Use                         | Size (clamp)                       |
| ------------ | --------------------------- | ---------------------------------- |
| `display`    | Hero headline               | `clamp(2.75rem, 6vw, 5.5rem)`      |
| `h1`         | Section titles              | `clamp(2rem, 4vw, 3.5rem)`         |
| `h2`         | Sub-headlines               | `clamp(1.5rem, 2.5vw, 2.25rem)`    |
| `h3`         | Card titles                 | `clamp(1.125rem, 1.5vw, 1.5rem)`   |
| `body`       | Paragraphs                  | `1rem – 1.125rem`                  |
| `mono-label` | Eyebrows / section indices  | `0.8125rem`, letter-spacing wide   |

### 3.2 Color Palette — "Verdant Carbon"

A disciplined three-color system: **white**, a single signature **green (`#4e8f52`)**, and **black**.
Tints and shades are derived from these three for surfaces, borders, and muted text — no other hues.

```
  ████  Ink         #000000   pure black — primary text (light) / page bg (dark)
  ████  Carbon      #0B0F0C   near-black with a green undertone — dark surfaces
  ████  Graphite    #15201A   elevated cards / panels (dark mode)
  ████  Verdant     #4E8F52   THE accent — CTAs, links, highlights, 3D glow
  ████  Verdant-600 #3E7242   hover / pressed accent (darker shade)
  ████  Verdant-200 #BFD8C1   soft accent tint — badges, subtle fills
  ████  Mist        #6B776D   muted / secondary text (green-tinted gray)
  ████  Snow        #FFFFFF   pure white — page bg (light) / text (dark)
```

**Signature gradient** (used in headlines, glows, 3D lighting) — green washing into black:

```css
--gradient-nova: linear-gradient(135deg, #4E8F52 0%, #3E7242 55%, #0B0F0C 100%);
/* monochrome-green emphasis variant for text */
--gradient-verdant: linear-gradient(135deg, #BFD8C1 0%, #4E8F52 100%);
```

**Token mapping (semantic):**

| Token              | Light theme | Dark theme  |
| ------------------ | ----------- | ----------- |
| `--bg`             | `#FFFFFF`   | `#000000`   |
| `--surface`        | `#FFFFFF`   | `#0B0F0C`   |
| `--surface-raised` | `#F4F7F4`   | `#15201A`   |
| `--text`           | `#000000`   | `#FFFFFF`   |
| `--text-muted`     | `#6B776D`   | `#9CABA0`   |
| `--accent`         | `#4E8F52`   | `#4E8F52`   |
| `--accent-strong`  | `#3E7242`   | `#BFD8C1`   |
| `--border`         | `#E3EAE3`   | `#1E2A22`   |

The site ships **dark-first** (black canvas, green accent — the immersive default) with a fully
tokenized **light theme** (white canvas, green accent, black text) available via `next-themes`.

### 3.3 Spacing, Radius, Elevation

| Token        | Value                                                       |
| ------------ | ---------------------------------------------------------- |
| Section pad  | `py-24 md:py-32` (rhythmic vertical cadence)               |
| Container    | `max-w-7xl mx-auto px-6 lg:px-8`                           |
| Radius       | `rounded-2xl` cards · `rounded-full` pills                 |
| Elevation    | Subtle `ring-1 ring-white/10` + soft colored glow on hover |
| Glass effect | `backdrop-blur-xl bg-white/5` for floating nav & cards     |

### 3.4 Motion Tokens

| Token         | Curve / Duration                          | Use                         |
| ------------- | ----------------------------------------- | --------------------------- |
| `ease-nova`   | `cubic-bezier(0.16, 1, 0.3, 1)`           | Reveals, card expand        |
| `dur-fast`    | `200ms`                                    | Hover, buttons              |
| `dur-base`    | `400ms`                                    | Section reveals             |
| `dur-slow`    | `700ms`                                    | Hero / 3D intro             |
| Reduced motion| All animations gated by `prefers-reduced-motion` |                      |

---

## 4 · 3D & Motion Architecture (Three.js)

The "mesmerizing" factor lives in a single, performance-budgeted WebGL layer.

### 4.1 The Crystal Field

A rotating, refractive **crystalline geometry** surrounded by a drifting **particle constellation**
sits behind the hero and subtly persists as a scroll-reactive ambient background.

```
        ✦        ·   ✦
     ·      ╱◆╲        ·          ◆ = faceted crystal (icosahedron / custom geo)
   ✦      ◆ ◆◆ ◆     ✦   ·        ✦ = particle stars (Points)
        ·  ╲◆╱    ·                · = depth-faded dust
     ✦        ·       ✦
   reacts to: scroll progress + cursor parallax + time
```

| Aspect            | Implementation                                                              |
| ----------------- | -------------------------------------------------------------------------- |
| Renderer          | React Three Fiber `<Canvas>` — **dynamically imported, `ssr: false`**.     |
| Geometry          | Icosahedron / TorusKnot with `MeshTransmissionMaterial` (Drei) for refraction. |
| Particles         | `THREE.Points` with custom shader; ~2–4k points, GPU-instanced.            |
| Lighting          | Env light tinted **Verdant (`#4e8f52`)** against a black void; white rim light for facet sparkle. |
| Interaction       | Cursor parallax (lerp) + scroll-driven rotation/opacity.                    |
| Post-processing   | Optional bloom (`@react-three/postprocessing`) — capped on mobile.         |

### 4.2 Performance Governance (non-negotiable)

- **Lazy + client-only:** Canvas never blocks first paint; mounts after hydration.
- **Device tiering:** detect `hardware concurrency` / mobile → reduce particle count & disable bloom.
- **`prefers-reduced-motion`:** render a static gradient/poster image instead of animating.
- **Frame budget:** pause rAF when canvas is off-screen (`IntersectionObserver`).
- **Fallback:** a CSS-gradient poster renders if WebGL is unavailable.

```
WebGL available? ──no──► Static gradient poster (SVG/CSS)
       │ yes
Reduced motion? ──yes──► Static rendered frame (no rAF loop)
       │ no
Mobile / low-end? ──yes──► Lite scene (fewer particles, no bloom)
       │ no
Full Crystal Field (refraction + particles + bloom)
```

---

## 5 · Information Architecture — Section Map

Every section in **`NovaCrystara-Website-Copy-v1.md`** maps to exactly one component.
**No content is dropped.** Optional sections are included and toggleable via the content layer.

| #  | Copy Section            | Component                  | Headline / Intent                                                | 3D / Motion           |
| -- | ----------------------- | ------------------------- | ---------------------------------------------------------------- | --------------------- |
| 1  | SECTION 1 — HERO        | `<Hero/>`                 | "AI Solutions, Delivered for Speed, Scale, and ROI."            | **Crystal Field**     |
| 2  | SECTION 2               | `<ProblemSection/>`       | "Everyone's racing toward AI. Few are reaching production."     | Reveal + glow grid    |
| 3  | SECTION 3               | `<DifferentiatorSection/>`| "Built by enterprise IT veterans. Engineered for reality."     | Staggered cards       |
| 4  | SECTION 4               | `<SolutionsSection/>`     | "From intelligent agents to enterprise-wide AI platforms."     | Hover-lift cards      |
| 5  | SECTION 5               | `<UseCasesSection/>`      | "Enterprise AI Use Cases" — **expandable cards**               | Layout animation      |
| 6  | SECTION 6               | `<MethodologySection/>`   | "A delivery methodology built for speed."                       | Animated timeline     |
| 7  | SECTION 7               | `<CapabilitiesSection/>`  | "Deep technical mastery, applied with enterprise judgment."    | Tech grid w/ icons    |
| 8  | SECTION 8               | `<EngagementSection/>`    | "Start where you are. Scale at your pace."                      | Step ladder           |
| 9  | SECTION 9 — CTA         | `<CTASection/>`           | "Your AI transformation doesn't have to be another stalled pilot." | Gradient + 3D echo |
| O1 | OPTIONAL — ABOUT US     | `<AboutSection/>`         | "Built by people who've shipped enterprise systems."           | Reveal                |
| O2 | OPTIONAL — TRUST & GOV. | `<TrustSection/>`         | "AI you can defend in the boardroom."                          | Reveal                |
| O3 | OPTIONAL — FAQ          | `<FAQSection/>`           | 6 Q&A — accordion                                              | Accordion expand      |
| —  | Global                  | `<Navbar/>` `<Footer/>`   | Sticky glass nav + footer with CTAs                            | Blur on scroll        |

### 5.1 Page Flow Diagram

```
┌──────────────────────────────────────────┐
│  NAVBAR (sticky, glass, CTA)              │
├──────────────────────────────────────────┤
│  ① HERO          ◆ Crystal Field 3D       │  → Book a Discovery Session
│                                           │     Explore What We Build
├──────────────────────────────────────────┤
│  ② THE PROBLEM   "Pilot purgatory" + 6    │  6 pain-point tiles
├──────────────────────────────────────────┤
│  ③ WHY US        5 differentiators         │
├──────────────────────────────────────────┤
│  ④ WHAT WE BUILD 5 solution cards          │
├──────────────────────────────────────────┤
│  ⑤ USE CASES     7 expandable cards ▼      │  ← "Read more" interaction
├──────────────────────────────────────────┤
│  ⑥ METHODOLOGY   5-step timeline           │
├──────────────────────────────────────────┤
│  ⑦ CAPABILITIES  7 tech domains            │
├──────────────────────────────────────────┤
│  ⑧ ENGAGEMENT    4 engagement models       │
├──────────────────────────────────────────┤
│  ⑨ CTA           Final conversion          │
├──────────────────────────────────────────┤
│  ABOUT · TRUST · FAQ  (optional)           │
├──────────────────────────────────────────┤
│  FOOTER (nav, CTAs, legal)                 │
└──────────────────────────────────────────┘
```

---

## 6 · Component Architecture

### 6.1 Component Tree

```
<RootLayout>                       app/layout.tsx (fonts, theme, metadata)
 └─ <ThemeProvider>
     ├─ <CrystalFieldCanvas/>      fixed background, client-only, dynamic import
     ├─ <Navbar/>
     ├─ <main>
     │   ├─ <Hero/>
     │   ├─ <ProblemSection/>          └─ <PainPointCard/> ×6
     │   ├─ <DifferentiatorSection/>   └─ <FeatureCard/> ×5
     │   ├─ <SolutionsSection/>        └─ <SolutionCard/> ×5
     │   ├─ <UseCasesSection/>         └─ <UseCaseCard/> ×7  (expandable)
     │   ├─ <MethodologySection/>      └─ <TimelineStep/> ×5
     │   ├─ <CapabilitiesSection/>     └─ <CapabilityTile/> ×7
     │   ├─ <EngagementSection/>       └─ <EngagementCard/> ×4
     │   ├─ <CTASection/>
     │   ├─ <AboutSection/>            (optional)
     │   ├─ <TrustSection/>            (optional)
     │   └─ <FAQSection/>              └─ <FAQItem/> ×6 (accordion)
     └─ <Footer/>
```

### 6.2 Server vs Client Boundary

| Type                 | Components                                                                  |
| -------------------- | -------------------------------------------------------------------------- |
| **Server (default)** | All content sections — they render static copy from the data layer (fast, SEO-friendly). |
| **Client (`"use client"`)** | `CrystalFieldCanvas`, `Navbar` (scroll state), `UseCaseCard` (expand state), `FAQItem` (accordion), `ContactForm`, any Framer Motion reveal wrapper. |

> **Pattern:** Sections stay Server Components; interactive leaves are small Client Components.
> Reveal animations use a thin `<Reveal>` client wrapper so the heavy content stays server-rendered.

### 6.3 Shared Primitives (`components/ui/`)

`Button` · `Card` · `Badge` · `SectionHeading` (eyebrow + title + subtitle) ·
`Reveal` (scroll-in motion wrapper) · `Container` · `GradientText` · `Accordion`.

---

## 7 · The Use Cases Module — Expandable Cards

> **The centerpiece interaction.** Section 5 has **7 detailed use cases**. Showing them all in
> full would create a wall of text. Instead: a responsive **card grid** where each card shows a
> **teaser by default** and expands inline on **"Read more"** to reveal the full content —
> *with zero information lost*.

### 7.1 Collapsed vs Expanded

```
COLLAPSED (default)                      EXPANDED (after "Read more")
┌───────────────────────────┐           ┌───────────────────────────────────┐
│ ◆ Autonomous Maintenance  │           │ ◆ Autonomous Maintenance Agent     │
│   Agent                    │           │   Transform Reactive Maintenance…  │
│                            │           │                                    │
│ Transform Reactive         │           │ [full intro paragraph 1]           │
│ Maintenance into           │           │ [full intro paragraph 2]           │
│ Autonomous Operations      │           │                                    │
│                            │           │ KEY CAPABILITIES                   │
│ Modern enterprises         │           │  • Continuously monitors…          │
│ generate thousands of      │           │  • Correlates multiple alerts…     │
│ operational events…        │           │  • … (all 10 bullets)              │
│                            │           │                                    │
│        [ Read more ▾ ]     │           │ BUSINESS BENEFITS                  │
└───────────────────────────┘           │  • Reduced MTTD                    │
                                         │  • Faster MTTR  … (all 5)          │
   only a small portion visible          │        [ Show less ▴ ]             │
                                         └───────────────────────────────────┘
```

### 7.2 Behavior Spec

| Concern              | Decision                                                                       |
| -------------------- | ----------------------------------------------------------------------------- |
| Default state        | **Collapsed** — title, sub-headline, and a **truncated intro** (the "small portion"). |
| Trigger              | **"Read more ▾"** button → expands to **"Show less ▴"**.                       |
| Animation            | Framer Motion `AnimatePresence` + height/opacity transition with `ease-nova`. |
| Independence         | Each card expands independently; multiple can be open at once.                 |
| Expanded content     | Full intro paragraphs + **all** Key Capabilities + **all** Business Benefits.  |
| Layout               | `grid sm:grid-cols-2 xl:grid-cols-3`; an expanded card spans full row width (`col-span-full`) for readability. |
| Accessibility        | Button `aria-expanded`, `aria-controls`; content region `role="region"`; keyboard toggle; focus retained. |
| Reduced motion       | Instant show/hide (no height animation).                                       |
| No-JS fallback       | `<details>/<summary>` progressive enhancement so content is reachable without JS. |

### 7.3 Data Contract

```ts
// types/useCase.ts
export interface UseCase {
  id: string;            // slug, e.g. "autonomous-maintenance-agent"
  title: string;         // "Autonomous Maintenance Agent"
  tagline: string;       // sub-headline (### line)
  intro: string[];       // full intro paragraphs (teaser = intro[0], truncated)
  capabilities: string[];// ALL "Key Capabilities" bullets
  benefits: string[];    // ALL "Business Benefits" bullets
  icon: string;          // lucide icon key
}
```

### 7.4 The 7 Use Cases (complete, none omitted)

1. **Autonomous Maintenance Agent** — *Transform Reactive Maintenance into Autonomous Operations* (10 capabilities, 5 benefits)
2. **Autonomous Facility Maintenance Agent** — *Intelligent Building Operations at Scale* (10 capabilities, 5 benefits)
3. **AI Security Operations Center (SOC)** — *Autonomous Threat Detection and Response* (10 capabilities, 5 benefits)
4. **Autonomous Colocation B2B Sales Agent** — *Accelerate Enterprise Infrastructure Sales* (10 capabilities, 5 benefits)
5. **Virtual Healthcare Assistant** — *Deliver Intelligent Patient Engagement 24×7* (10 capabilities, 5 benefits)
6. **Autonomous Hiring Agent** — *Modernize Recruitment with AI* (10 capabilities, 5 benefits)
7. **Autonomous Sales Qualification Agent** — *Let Your Sales Team Focus on High-Value Opportunities* (10 capabilities, 5 benefits)

> The **full text** of every intro paragraph, capability, and benefit lives in
> `content/useCases.ts` — transcribed verbatim from the website copy (see §8).

### 7.5 Component Sketch

```tsx
// components/sections/UseCaseCard.tsx  ("use client")
function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article layout className={open ? "col-span-full" : ""}>
      <Icon name={useCase.icon} />
      <h3>{useCase.title}</h3>
      <p className="text-accent">{useCase.tagline}</p>  {/* #4e8f52 */}

      {/* teaser — always visible */}
      <p className={open ? "" : "line-clamp-3"}>{useCase.intro[0]}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div role="region" id={`${useCase.id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}>
            {useCase.intro.slice(1).map(p => <p key={p}>{p}</p>)}
            <h4>Key Capabilities</h4>
            <ul>{useCase.capabilities.map(c => <li key={c}>{c}</li>)}</ul>
            <h4>Business Benefits</h4>
            <ul>{useCase.benefits.map(b => <li key={b}>{b}</li>)}</ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button aria-expanded={open} aria-controls={`${useCase.id}-panel`}
        onClick={() => setOpen(o => !o)}>
        {open ? "Show less ▴" : "Read more ▾"}
      </button>
    </motion.article>
  );
}
```

---

## 8 · Content Data Layer

All copy is **separated from presentation** in typed content modules. This guarantees
**zero information loss** and a single source of truth, mirroring `NovaCrystara-Website-Copy-v1.md`.

```
content/
├─ hero.ts            # headline, sub-copy, founder line, 2 CTAs
├─ problem.ts         # intro + 6 pain points (title + description each)
├─ differentiators.ts # intro + 5 pillars
├─ solutions.ts       # intro + 5 solution offerings
├─ useCases.ts        # 7 UseCase objects (full text, see §7.4)
├─ methodology.ts     # intro + 5 phases
├─ capabilities.ts    # intro + 7 technical domains
├─ engagement.ts      # intro + 4 models + closing line
├─ cta.ts             # headline, body, 2 CTAs, reassurance line
├─ about.ts           # optional — 2 paragraphs
├─ trust.ts           # optional — 1 paragraph
├─ faq.ts             # optional — 6 Q&A pairs
└─ site.ts            # nav links, footer, brand, contact
```

### 8.1 Section-by-section content inventory (the integrity map)

| Section            | Pieces of content captured                                                          |
| ------------------ | ---------------------------------------------------------------------------------- |
| Hero               | Headline · 2 supporting paragraphs · 2 CTA labels                                  |
| Problem            | Headline · intro paragraph · 6 pain points (bold title + sentence) · closing line  |
| Differentiators    | Headline · intro paragraph · 5 pillars (title + paragraph)                          |
| Solutions          | Headline · intro paragraph · 5 offerings (title + paragraph)                        |
| Use Cases          | Section headline + tagline · 7 use cases × (title, tagline, intro, 10 caps, 5 benefits) |
| Methodology        | Headline · intro paragraph · 5 phases (title + paragraph)                           |
| Capabilities       | Headline · intro paragraph · 7 domains (title + description)                        |
| Engagement         | Headline · intro paragraph · 4 models (title + paragraph) · closing line            |
| CTA                | Headline · body paragraph · 2 CTA labels · reassurance line                         |
| About (opt)        | Headline · 2 paragraphs                                                             |
| Trust (opt)        | Headline · 1 paragraph                                                              |
| FAQ (opt)          | 6 question/answer pairs                                                             |

> **Rule:** if a sentence exists in the copy doc, it exists verbatim in the content layer.
> Reviewers diff `content/` against `NovaCrystara-Website-Copy-v1.md` before every release.

---

## 9 · Project File Structure

```
novacrystara_ai_labs/
├─ app/
│  ├─ layout.tsx              # fonts (Geist→Arial), ThemeProvider, metadata
│  ├─ page.tsx                # composes all sections in order
│  ├─ globals.css             # Tailwind v4 + design tokens
│  ├─ fonts.ts                # Geist sans/mono config
│  ├─ sitemap.ts              # SEO
│  └─ opengraph-image.tsx     # dynamic OG image
│
├─ components/
│  ├─ layout/
│  │  ├─ Navbar.tsx
│  │  └─ Footer.tsx
│  ├─ three/
│  │  ├─ CrystalFieldCanvas.tsx   # dynamic, ssr:false wrapper
│  │  ├─ Crystal.tsx              # refractive geometry
│  │  ├─ ParticleField.tsx        # Points + shader
│  │  └─ useDeviceTier.ts         # perf tiering hook
│  ├─ sections/
│  │  ├─ Hero.tsx
│  │  ├─ ProblemSection.tsx
│  │  ├─ DifferentiatorSection.tsx
│  │  ├─ SolutionsSection.tsx
│  │  ├─ UseCasesSection.tsx
│  │  ├─ UseCaseCard.tsx          # expandable ("use client")
│  │  ├─ MethodologySection.tsx
│  │  ├─ CapabilitiesSection.tsx
│  │  ├─ EngagementSection.tsx
│  │  ├─ CTASection.tsx
│  │  ├─ AboutSection.tsx
│  │  ├─ TrustSection.tsx
│  │  └─ FAQSection.tsx
│  └─ ui/
│     ├─ Button.tsx  Card.tsx  Badge.tsx  Container.tsx
│     ├─ SectionHeading.tsx  GradientText.tsx
│     ├─ Reveal.tsx  Accordion.tsx
│
├─ content/                   # the copy (see §8)
├─ types/                     # UseCase, PainPoint, Phase, etc.
├─ lib/                       # utils, cn(), constants
├─ public/                    # logo, og fallback, poster image
├─ docs/
│  ├─ NovaCrystara-Website-Copy-v1.md
│  └─ architecture.md         ← this file
├─ tailwind.config.ts
├─ next.config.ts
├─ tsconfig.json
└─ package.json
```

---

## 10 · Routing & Page Composition

A focused **single-page marketing site** (App Router), with anchor-based navigation and room
to grow into multi-page later.

```tsx
// app/page.tsx (Server Component)
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <DifferentiatorSection />
      <SolutionsSection />
      <UseCasesSection />
      <MethodologySection />
      <CapabilitiesSection />
      <EngagementSection />
      <CTASection />
      <AboutSection />     {/* optional, toggleable */}
      <TrustSection />     {/* optional, toggleable */}
      <FAQSection />       {/* optional, toggleable */}
    </>
  );
}
```

**Navbar anchors:** `Solutions · Use Cases · Approach · Capabilities · Engage · Contact`
Each section has a stable `id` for smooth in-page scrolling. CTAs (`Book a Discovery Session`)
deep-link to the contact/CTA section or an external scheduler.

**Future-proofing:** the structure cleanly supports later routes such as `/use-cases/[slug]`,
`/about`, `/contact` without refactoring the content layer.

---

## 11 · Performance & Accessibility

### Performance Budget

| Metric                 | Target                                              |
| ---------------------- | -------------------------------------------------- |
| LCP                    | < 2.0s (hero text/poster, **not** WebGL)           |
| CLS                    | < 0.05 (reserved space for all media)              |
| INP                    | < 200ms                                            |
| JS (initial)           | Three.js bundle **code-split** & lazy, off critical path |
| Images                 | `next/image`, AVIF/WebP, responsive sizes          |

Techniques: RSC for content, dynamic import for Canvas, font `display: swap`,
IntersectionObserver to pause off-screen rAF, tree-shaken Drei imports.

### Accessibility (WCAG 2.1 AA)

- Semantic landmarks (`<header> <main> <section> <footer>`), one `<h1>` (hero).
- All interactive elements keyboard operable; visible focus rings (`ring-accent`, `#4e8f52`).
- Expandable cards & FAQ use proper `aria-expanded` / `aria-controls`.
- Color contrast ≥ 4.5:1 for text; the gradient text has accessible solid fallback.
- `prefers-reduced-motion` disables 3D animation, parallax, and reveals.
- 3D canvas marked `aria-hidden` (decorative); all meaning lives in the DOM text.

---

## 12 · SEO & Metadata

- **Metadata API** (`app/layout.tsx` + per-section) for title, description, canonical.
- **Open Graph & Twitter cards** via dynamic `opengraph-image.tsx` (Nova gradient + headline).
- **JSON-LD** structured data: `Organization`, `Service`, and `FAQPage` (from FAQ content).
- `sitemap.ts` + `robots.ts`.
- Server-rendered copy ensures full crawlability; the 3D layer is purely decorative.

```ts
export const metadata: Metadata = {
  title: "NovaCrystara AI Labs — AI Solutions for Speed, Scale, and ROI",
  description:
    "Enterprise AI built by IT veterans — production-grade agents, platforms, and intelligent automation that deliver measurable outcomes, fast.",
};
```

---

## 13 · Build, Tooling & Deployment

| Concern        | Tooling                                                            |
| -------------- | ----------------------------------------------------------------- |
| Package manager| `pnpm` (recommended) / `npm`                                      |
| Dev            | `next dev` (Turbopack)                                            |
| Build          | `next build` → static + RSC payloads                             |
| Quality gates  | `tsc --noEmit`, ESLint, Prettier — run in CI                     |
| CI/CD          | GitHub Actions → Vercel preview deploys on PR, prod on `main`     |
| Env            | `.env.local` for scheduler/contact endpoints                     |
| Analytics      | Vercel Analytics / privacy-friendly alternative                  |

**Suggested scripts:**

```jsonc
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit"
}
```

---

## 14 · Content Integrity Checklist

> Run before every release — guarantees **"not a single bit of information"** is lost.

- [ ] Hero: headline + both paragraphs + both CTA buttons present.
- [ ] Problem: intro + all **6** pain points + closing line.
- [ ] Differentiators: intro + all **5** pillars.
- [ ] Solutions: intro + all **5** offerings.
- [ ] Use Cases: section heading + all **7** cases, each with full intro, **all 10** capabilities, **all 5** benefits.
- [ ] Use Case cards collapse to a teaser and expand fully via **Read more / Show less**.
- [ ] Methodology: intro + all **5** phases.
- [ ] Capabilities: intro + all **7** technical domains.
- [ ] Engagement: intro + all **4** models + closing line.
- [ ] CTA: headline + body + both CTAs + reassurance line.
- [ ] Optional About / Trust / FAQ sections included (or intentionally disabled).
- [ ] FAQ: all **6** Q&A pairs.
- [ ] Three.js Crystal Field renders + degrades gracefully (poster / reduced-motion / mobile).
- [ ] Fonts resolve Geist → Arial → sans-serif.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

---

```
╔══════════════════════════════════════════════════════════════════════╗
║  Architecture status: READY FOR IMPLEMENTATION                         ║
║  Next step: scaffold Next.js app → build content layer → sections →    ║
║             Crystal Field 3D → polish → ship.                          ║
║                                                                        ║
║  "The speed of a startup. The rigor of three decades."                 ║
╚══════════════════════════════════════════════════════════════════════╝
```
