import type { SiteContent } from "@/types";

// Global — site chrome: nav, footer, brand, contact (arch §10).
export const site: SiteContent = {
  brand: "NovaCrystara AI Labs",
  // TODO: replace with the production domain before launch (used for metadata, sitemap, OG).
  url: "https://novacrystara.ai",
  description:
    "Enterprise AI built by IT veterans — production-grade agents, platforms, and intelligent automation that deliver measurable outcomes, fast.",
  nav: [
    { label: "Solutions", href: "#solutions" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Approach", href: "#approach" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Engage", href: "#engage" },
    { label: "Contact", href: "#contact" },
  ],
  primaryCta: { label: "Book a Discovery Session", href: "#contact" },
  footer: {
    tagline: "The speed of a startup. The rigor of three decades.",
    links: [
      { label: "Solutions", href: "#solutions" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "Approach", href: "#approach" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Engage", href: "#engage" },
      { label: "Contact", href: "#contact" },
    ],
    legal: `© ${new Date().getFullYear()} NovaCrystara AI Labs. All rights reserved.`,
  },
  contact: {
    email: "hello@novacrystara.ai",
  },
};
