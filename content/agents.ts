import type { Agent } from "@/types";

/**
 * Autonomous agent registry — powers the "Solutions" mega-menu and the
 * /agents landing pages. Nova Helix is live; the rest ship progressively and
 * render as locked "coming soon" tiles until their `status` flips to "live".
 */
export const agentsIntro = {
  heading: "Autonomous AI Employees",
  body: "Not tools your team has to operate — employees that do the work. Each NovaCrystara agent owns an end-to-end business function, runs 24/7, and plugs into the systems you already use.",
  hubHref: "/#solutions",
  hubLabel: "Explore what we build",
};

export const agents: Agent[] = [
  {
    slug: "nova-helix",
    name: "Nova Helix",
    role: "Autonomous Hiring Employee",
    description:
      "Screens every resume, calls every candidate, runs Round 1 interviews, and books your panel — 24/7.",
    icon: "Users",
    status: "live",
  },
  {
    slug: "nova-ledger",
    name: "Nova Ledger",
    role: "Autonomous Finance Operations",
    description:
      "Invoice capture, reconciliation, exception handling, and close-cycle reporting without the manual chase.",
    icon: "Receipt",
    status: "coming-soon",
    eta: "Coming soon",
  },
  {
    slug: "nova-sentinel",
    name: "Nova Sentinel",
    role: "Autonomous IT Service Desk",
    description:
      "Triages tickets, resolves L1 requests end-to-end, and escalates with full diagnostic context attached.",
    icon: "ShieldCheck",
    status: "coming-soon",
    eta: "Coming soon",
  },
  {
    slug: "nova-atlas",
    name: "Nova Atlas",
    role: "Autonomous Sales Development",
    description:
      "Researches accounts, personalises outreach, qualifies inbound, and hands your reps meeting-ready pipeline.",
    icon: "Compass",
    status: "coming-soon",
    eta: "Coming soon",
  },
  {
    slug: "nova-pulse",
    name: "Nova Pulse",
    role: "Autonomous Customer Support",
    description:
      "Resolves customer conversations across voice and chat, with policy-grounded answers and clean handoffs.",
    icon: "Headphones",
    status: "coming-soon",
    eta: "Coming soon",
  },
];

export const liveAgents = agents.filter((a) => a.status === "live");
