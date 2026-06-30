# NovaCrystara AI Labs — Implementation Plan

> **Phase-by-phase build sequence** for the website defined in [architecture.md](./architecture.md).
> Each phase is independently shippable, ends in a verifiable state, and builds on the last.

---

```
╔══════════════════════════════════════════════════════════════════════╗
║  BUILD ROADMAP                                                         ║
║                                                                        ║
║  P0 Foundation → P1 Design System → P2 Content Layer →                 ║
║  P3 Layout Shell → P4 Static Sections → P5 Use Cases Module →          ║
║  P6 Crystal Field 3D → P7 Motion & Polish → P8 SEO/A11y/Perf →         ║
║  P9 QA & Launch                                                        ║
║                                                                        ║
║  Source of truth: NovaCrystara-Website-Copy-v1.md + architecture.md    ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## How to read this plan

- **Phases run in order.** P0–P3 are sequential foundations. P4–P6 can overlap once P3 lands.
- Each phase lists: **Goal · Tasks · Deliverables · Dependencies · Exit Criteria**.
- `[ ]` checkboxes are the working task list — tick them as you go.
- Architecture references appear as **(arch §N)** so every task traces back to the blueprint.

### Phase Dependency Graph

```
P0 ──► P1 ──► P3 ──► P4 ──► P5 ──► P7 ──► P8 ──► P9
        │      ▲       ▲      ▲      ▲
        └─P2───┘       │      │      │
                       └──────┴─P6───┘
   (P2 content can start right after P0; P6 3D can start after P3)
```

---

## Phase 0 — Foundation & Tooling

**Goal:** A running Next.js 15 + TypeScript + Tailwind v4 app with linting, formatting, and CI skeleton.

**Tasks**
- [x] Scaffold Next.js 15 App Router project (TypeScript, Tailwind v4, ESLint, no `src/`) — done manually for full control (arch §2, §9).
- [x] Pin **Next.js 15**, React 19 (package manager: **npm**, not pnpm) (arch §13).
- [x] Configure `tsconfig.json` to **strict** mode + path alias (`@/*`) (arch §9).
- [x] Add Prettier + `eslint-config-prettier`; create `.prettierrc`, `.editorconfig`.
- [x] Scaffold the full folder tree from **arch §9** (`components/`, `content/`, `types/`, `lib/`).
- [x] Add npm scripts: `dev`, `build`, `start`, `lint`, `typecheck` (arch §13).
- [x] Initialize GitHub Actions CI: `typecheck` + `lint` + `build` on PR (`.github/workflows/ci.yml`) (arch §13).
- [ ] Connect repo to **Vercel**; verify preview deploy of the default page. *(requires external Vercel account)*

**Deliverables:** Bootable app, green CI, first Vercel preview URL.
**Dependencies:** none.
**Exit Criteria:** `pnpm dev` runs; `pnpm typecheck && pnpm lint && pnpm build` all pass; preview deploy live.

---

## Phase 1 — Design System & Tokens

**Goal:** Codify the "Verdant Carbon" palette, typography, spacing, and motion tokens so every later component pulls from one source.

**Tasks**
- [x] Install fonts: `geist` package; wire **Geist Sans/Mono** in `app/fonts.ts` with **Arial → sans-serif** fallback (arch §3.1).
- [x] Define CSS variables in `globals.css` for the **3-color palette** — white / `#4e8f52` / black + derived tints (arch §3.2).
- [x] Implement the semantic token map (`--background`, `--surface`, `--foreground`, `--accent`, `--border`, …) for **light + dark** (arch §3.2).
- [x] Add signature gradients `--gradient-nova` and `--gradient-verdant` (arch §3.2).
- [x] Map tokens into Tailwind v4 theme (`@theme inline` in `globals.css`): colors, font families, fluid type scale, radius, motion (arch §3.1–3.4).
- [x] Install `next-themes`; set **dark-first** default with light toggle (arch §3.2).
- [x] Define motion tokens: `ease-nova`, `--duration-fast/base/slow` (arch §3.4).
- [x] Build a `/styleguide` page rendering swatches, semantic tokens, gradients, and type scale for visual QA.

**Deliverables:** `globals.css`, Tailwind theme, `fonts.ts`, theme provider, styleguide page.
**Dependencies:** P0.
**Exit Criteria:** Styleguide shows correct palette (only white/`#4e8f52`/black + tints), Geist renders with Arial fallback, theme toggle works.

---

## Phase 2 — Content Data Layer & Types

**Goal:** Transcribe **100% of the website copy** into typed content modules — the integrity guarantee. *(Can begin right after P0.)*

**Tasks**
- [x] Define TypeScript interfaces in `types/index.ts`: `UseCase`, `PainPoint`, `Pillar`, `Solution`, `Phase`, `Capability`, `EngagementModel`, `FAQItem`, `CTA`, `NavLink` (+ per-section content shapes) (arch §7.3, §8).
- [x] `content/hero.ts` — headline, 2 supporting paragraphs (lead + founder note), 2 CTA labels (arch §8.1).
- [x] `content/problem.ts` — intro + **6** pain points + closing line.
- [x] `content/differentiators.ts` — intro + **5** pillars.
- [x] `content/solutions.ts` — intro + **5** offerings.
- [x] `content/useCases.ts` — **7** `UseCase` objects, each with full intro, **all 10** capabilities, **all 5** benefits — verbatim (arch §7.4).
- [x] `content/methodology.ts` — intro + **5** phases.
- [x] `content/capabilities.ts` — intro + **7** technical domains.
- [x] `content/engagement.ts` — intro + **4** models + closing line.
- [x] `content/cta.ts` — headline, body, 2 CTAs, reassurance line.
- [x] `content/about.ts`, `content/trust.ts`, `content/faq.ts` (6 Q&A) — optional sections.
- [x] `content/site.ts` — nav links, footer, brand, contact (+ `content/index.ts` barrel).
- [x] **Diff content against `NovaCrystara-Website-Copy-v1.md`** word-for-word (arch §8.1 rule).

**Deliverables:** Fully populated, typed `content/` + `types/`.
**Dependencies:** P0.
**Exit Criteria:** `tsc` passes; manual diff confirms every sentence from the copy doc is present verbatim.

---

## Phase 3 — Layout Shell & UI Primitives

**Goal:** App-wide chrome and the reusable component kit every section depends on.

**Tasks**
- [x] `app/layout.tsx` — fonts, `ThemeProvider`, base metadata, `Navbar` + `<main>` landmark + `Footer` (arch §6.1, §12).
- [x] Build `components/ui/`: `Button`, `Card`, `Badge`, `Container`, `Section`, `SectionHeading`, `GradientText`, `Reveal` (placeholder), `Accordion` (arch §6.3).
- [x] `components/layout/Navbar.tsx` — sticky glass nav, anchor links, CTA, scroll-state blur, mobile menu (client) (arch §5, §6.2, §10).
- [x] `components/layout/Footer.tsx` — nav, contact, legal, brand (arch §5).
- [x] `lib/utils.ts` — `cn()` helper.
- [x] Wire smooth anchor scrolling: `scroll-behavior` + per-section `scroll-mt` for `Solutions · Use Cases · Approach · Capabilities · Engage · Contact` (arch §10).

**Deliverables:** Layout, navbar, footer, UI primitive library.
**Dependencies:** P1 (tokens), P2 (`site.ts` for nav/footer).
**Exit Criteria:** Navbar + footer render on an empty page; primitives documented in styleguide; anchors scroll.

---

## Phase 4 — Static Content Sections

**Goal:** Build all server-rendered content sections (everything except the Use Cases module and 3D). Each consumes the content layer; **no copy hardcoded in JSX**.

**Tasks** *(each as a Server Component, arch §6.2)*
- [x] `Hero.tsx` — headline, sub-copy, 2 CTAs; reserves space for the 3D layer (arch §5 #1).
- [x] `ProblemSection.tsx` + `PainPointCard.tsx` ×6 (arch §5 #2).
- [x] `DifferentiatorSection.tsx` + `FeatureCard.tsx` ×5 (arch §5 #3).
- [x] `SolutionsSection.tsx` + `SolutionCard.tsx` ×5 (arch §5 #4).
- [x] `MethodologySection.tsx` + `TimelineStep.tsx` ×5 (arch §5 #6).
- [x] `CapabilitiesSection.tsx` + `CapabilityTile.tsx` ×7, Lucide icons (arch §5 #7).
- [x] `EngagementSection.tsx` + `EngagementCard.tsx` ×4 + closing line (arch §5 #8).
- [x] `CTASection.tsx` — headline, body, 2 CTAs, reassurance (arch §5 #9).
- [x] `AboutSection.tsx`, `TrustSection.tsx` (optional) (arch §5 O1/O2).
- [x] `FAQSection.tsx` + `Accordion` ×6 (native `<details>`, no-JS friendly) (arch §5 O3).
- [x] Compose all in `app/page.tsx` in the exact order from arch §10 (Use Cases is a static placeholder until P5).

**Deliverables:** Complete, content-accurate page minus Use Cases interactivity and 3D.
**Dependencies:** P2, P3.
**Exit Criteria:** Every section renders responsively from content; matches arch §5.1 page flow; passes content integrity items (arch §14) except Use Cases.

---

## Phase 5 — Use Cases Module (Expandable Cards)

**Goal:** The centerpiece interaction — 7 cards collapsed to a teaser, expanding inline via **Read more / Show less** with zero info loss.

**Tasks**
- [x] `UseCasesSection.tsx` — section heading + tagline + responsive grid `sm:grid-cols-2 xl:grid-cols-3` (arch §7.2).
- [x] `UseCaseCard.tsx` — collapsed shows icon, title, tagline, **truncated intro** (`line-clamp-3`) (arch §7.1, §7.5).
- [x] Expand reveals full intro paragraphs + **all 10** capabilities + **all 5** benefits (arch §7.2).
- [x] Toggle `Read more` / `Show less` (via `group-open:` label swap + chevron); expanded card uses `open:col-span-full` (arch §7.2, §7.5).
- [x] Independent state per card (each `<details>` toggles independently; multiple open allowed) (arch §7.2).
- [x] **Accessibility:** native `<details>` disclosure semantics + `aria-controls` / `role="region"`; keyboard toggle; focus retained (arch §7.2).
- [x] **No-JS fallback:** built directly on `<details>/<summary>` — fully functional without JS (arch §7.2).
- [x] Hook truncation to design tokens (accent `#4e8f52` tagline, arch §7.5).

> Note: implemented as a native `<details>`-based component (not a `useState` client leaf) — better accessibility and no-JS support; CSS `open:`/`group-open:` variants drive the expand styling. Height animation is layered on in P7.

**Deliverables:** Fully working Use Cases section (animation added in P7).
**Dependencies:** P2 (`useCases.ts`), P3, P4.
**Exit Criteria:** All 7 cards expand/collapse correctly; full content present on expand; keyboard + screen-reader operable; works with JS disabled.

---

## Phase 6 — Crystal Field 3D (Three.js)

**Goal:** The single mesmerizing WebGL focal point — performance-budgeted and gracefully degrading. *(Can start after P3.)*

**Tasks**
- [x] Install `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` (+ `@types/three`) (arch §2, §4).
- [x] `CrystalFieldCanvas.tsx` — scene **dynamically imported, `ssr:false`**, background layer behind the hero, mounts post-hydration (arch §4.1, §6.2).
- [x] `Crystal.tsx` — faceted icosahedron with `MeshTransmissionMaterial` refraction (arch §4.1).
- [x] `ParticleField.tsx` — `THREE.Points`, ~1.5–3.5k points in a spherical shell (arch §4.1).
- [x] Lighting: **Verdant `#4e8f52`** key light on a transparent/black void + white rim light (arch §4.1).
- [x] Interaction: cursor parallax (lerp toward pointer) + time-based rotation (arch §4.1).
- [x] Optional bloom via postprocessing, high-tier only (arch §4.1).
- [x] `useDeviceTier.ts` — detect mobile/low-end → reduce particles & samples, disable bloom (arch §4.2).
- [x] Degradation ladder: WebGL-unavailable / reduced-motion → CSS poster; off-screen → pause frameloop via IntersectionObserver (arch §4.2).

> Note: scoped to the hero (absolute layer) rather than a site-wide `fixed` background, for content readability. Three.js is fully code-split — home page First Load JS stays ~109 kB.

**Deliverables:** Living, degrading Crystal Field behind the hero.
**Dependencies:** P1 (palette), P3 (shell).
**Exit Criteria:** Renders on desktop; all 4 degradation branches verified (arch §4.2); does **not** regress LCP (3D off critical path, arch §11).

---

## Phase 7 — Motion & Interaction Polish

**Goal:** Layer in scroll reveals and section-specific motion from arch §5, gated by reduced-motion.

**Tasks**
- [x] Install `framer-motion`; upgrade `Reveal.tsx` to a real scroll-in wrapper (`whileInView`, once) (arch §6.3).
- [x] Use-case card expand animation: CSS `details-reveal` keyframe on open (`ease-nova`); instant on reduced-motion (arch §7.2).
- [x] Section motion per arch §5: staggered card reveals (Problem/Differentiators/Capabilities/Engagement), hover-lift (Solutions), reveal timeline (Methodology), reveal CTA panel.
- [x] Navbar blur-on-scroll transition (implemented in P3) (arch §5).
- [x] FAQ accordion expand animation via shared `details-reveal` (arch §5 O3).
- [x] Global `prefers-reduced-motion` gate: `Reveal` skips animation, global CSS neutralizes transitions/keyframes, 3D falls back to poster (arch §3.4, §11).

> Note: card/accordion expand uses a CSS `details-reveal` animation (not Framer `AnimatePresence`) to preserve the no-JS `<details>` behavior from P5; reduced-motion is honored via the global CSS rule.

**Deliverables:** Cohesive, branded motion across the site.
**Dependencies:** P4, P5, P6.
**Exit Criteria:** All motion respects reduced-motion; no jank/CLS introduced; expand animation smooth.

---

## Phase 8 — SEO, Accessibility & Performance

**Goal:** Meet the budgets and standards in arch §11–§12 before launch.

**Tasks**
- [x] Metadata API: title template, description, keywords, canonical, OG + Twitter, robots in `layout.tsx` (arch §12).
- [x] `opengraph-image.tsx` — dynamic OG with Verdant gradient + headline (arch §12).
- [x] JSON-LD: `Organization`, `Service` (offer catalog), `FAQPage` from `faq.ts` (`components/seo/JsonLd.tsx`) (arch §12).
- [x] `sitemap.ts` + `robots.ts` (styleguide disallowed) (arch §12).
- [x] A11y pass: landmarks, single `<h1>`, focus rings (`ring-accent` `#4e8f52`) on nav/footer/summaries, `aria-hidden` on 3D canvas (arch §11).
- [x] Perf pass: Three.js code-split, Geist font `display:swap`, reserved hero media space (no raster images to optimize) (arch §11).
- [ ] Run Lighthouse; tune to **Perf ≥ 90, A11y ≥ 95, SEO ≥ 95** — *requires a browser run (deferred to P9 QA)* (arch §14).

**Deliverables:** SEO metadata, structured data, passing Lighthouse.
**Dependencies:** P4–P7.
**Exit Criteria:** LCP < 2.0s, CLS < 0.05, INP < 200ms (arch §11); Lighthouse targets met (arch §14).

---

## Phase 9 — QA, Content Integrity & Launch

**Goal:** Final verification against the architecture's content integrity checklist, then ship.

**Tasks**
- [x] Walk the full **Content Integrity Checklist** (arch §14) — verified against rendered HTML (66/66 content assertions incl. all 7 use cases' capabilities & benefits present in the DOM).
- [~] Cross-browser + responsive QA — responsive layout built with Tailwind breakpoints; *manual multi-browser pass still needed (browser-dependent)*.
- [x] Verify font fallback chain Geist → Arial → sans-serif — confirmed `Arial,sans-serif` in the rendered head.
- [~] Verify 3D degradation — degradation ladder implemented & code-verified; *real mobile-device + reduced-motion OS check still needed (device-dependent)*.
- [x] Form QA: discovery-session capture with React Hook Form + Zod — `/api/contact` returns 200 on valid, 422 with field errors on invalid.
- [x] Wire CTAs to scheduler/contact endpoint — `/api/contact` route + `CONTACT_WEBHOOK_URL` + `.env.example` (falls back to logging locally) (arch §13).
- [x] Final `typecheck` + `lint` + `build` all pass. *(Vercel promote requires external account.)*
- [ ] Post-launch: enable analytics, smoke-test production URL. *(requires deploy)*

**Deliverables:** Production launch on the primary domain.
**Dependencies:** P0–P8.
**Exit Criteria:** All arch §14 items pass; production live and smoke-tested.

> Status: all code-level QA complete and verified headlessly. Remaining items (cross-browser pass, real-device 3D check, Lighthouse run, Vercel deploy + analytics) require a browser/device/hosting account and are the human launch steps. Before deploy: set `site.url` to the production domain and (optionally) `CONTACT_WEBHOOK_URL`.

---

## Phase Summary Matrix

| Phase | Name                     | Key Output                          | Arch Refs            |
| ----- | ------------------------ | ----------------------------------- | -------------------- |
| P0    | Foundation & Tooling     | Bootable app + CI + Vercel          | §2, §9, §13          |
| P1    | Design System & Tokens   | Verdant Carbon tokens, fonts, theme | §3                   |
| P2    | Content Data Layer       | 100% verbatim typed content         | §7.3, §8             |
| P3    | Layout Shell & Primitives| Navbar, footer, UI kit              | §6, §10              |
| P4    | Static Sections          | All content sections                | §5, §6.2             |
| P5    | Use Cases Module         | Expandable Read-more cards          | §7                   |
| P6    | Crystal Field 3D         | Three.js focal point + degradation  | §4                   |
| P7    | Motion & Polish          | Reveals + branded motion            | §3.4, §5, §7.2       |
| P8    | SEO / A11y / Perf        | Metadata, JSON-LD, Lighthouse       | §11, §12             |
| P9    | QA & Launch              | Integrity check + production        | §14, §13             |

---

## Milestones

| Milestone | Definition                                                            | Phases |
| --------- | -------------------------------------------------------------------- | ------ |
| **M1 — Skeleton Live**  | App deploys; design system + content layer complete.    | P0–P2  |
| **M2 — Content Complete** | All sections incl. Use Cases render from content.      | P3–P5  |
| **M3 — Experience Complete** | 3D + motion in; the site is "mesmerizing."         | P6–P7  |
| **M4 — Launch Ready**   | SEO/A11y/Perf met; integrity checklist green; in prod.  | P8–P9  |

---

```
╔══════════════════════════════════════════════════════════════════════╗
║  Build order:  Foundation → System → Content → Shell → Sections →      ║
║                Use Cases → 3D → Motion → SEO/A11y/Perf → Launch        ║
║                                                                        ║
║  "The speed of a startup. The rigor of three decades."                 ║
╚══════════════════════════════════════════════════════════════════════╝
```
