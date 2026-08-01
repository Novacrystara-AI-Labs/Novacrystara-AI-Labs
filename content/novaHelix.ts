/**
 * Nova Helix — autonomous hiring employee landing page copy (/agents/nova-helix).
 * Kept in the content layer like every other section (arch §8).
 */
export const novaHelix = {
  meta: {
    title: "Nova Helix — The World's First Autonomous Hiring Employee",
    description:
      "Nova Helix autonomously screens resumes, calls candidates, conducts Round 1 interviews, and schedules interviews with your hiring managers — 24/7. Book a live demo.",
  },

  hero: {
    eyebrow: "Today, we're reinventing hiring",
    heading: "Meet Nova Helix",
    /** Headline split so the agent's name can carry its own treatment. */
    headingLead: "Meet Nova",
    headingName: "Helix",
    trademark: "The World's First Autonomous Hiring Employee™",
    punch: ["This isn't a tool for your recruiters.", "This is a recruiter."],
    lead: "One employee who screens every resume. Calls every candidate. Runs every first interview. And never once clocks out. We didn't build software to help your HR team work harder — we built someone to do the work for them.",
    note: "A full month, free. No commitment. That's how confident we are.",
    stats: [
      { value: "3×", label: "HR productivity" },
      { value: "£60,000+", label: "Estimated Annual per Employee" },
      { value: "24×7", label: "Always recruiting" },
    ],
    price: {
      badge: "Limited early access",
      amount: "Free",
      unit: "1-month trial",
      cta: "Start Your Free Month",
      points: [
        "Increase HR productivity by 3×",
        "Save £60,000+ per recruiter position avoided every year",
        "Full access to every capability — no commitment",
      ],
      assurance: "No credit card required",
      footnote: "Early-access seats are limited.",
    },
  },

  problem: {
    eyebrow: "The problem",
    heading: "Recruitment is broken.",
    intro:
      "Hiring should be simple. Find great people. Talk to them. Hire them. Instead, your best recruiters spend their days on work that has nothing to do with judgment, instinct, or talent.",
    items: [
      "Reviewing resumes",
      "Calling candidates",
      "Leaving voicemails",
      "Following up",
      "Rescheduling interviews",
      "Conducting repetitive first-round interviews",
      "Updating recruitment systems",
    ],
    quote:
      "By the time the right candidate reaches your hiring manager… they've already accepted another offer.",
    quoteFooter: "There had to be a better way. So we made one.",
  },

  solution: {
    eyebrow: "The solution",
    heading: "An employee that never sleeps.",
    body: "Nova Helix doesn't replace your HR team. It takes the work that never should have needed a human in the first place — and does it better.",
    emphasis: "No shifts. No sick days. No excuses. It simply hires.",
    /** Rendered as a spec sheet — `meta` is the right-hand readout on each row. */
    panel: {
      title: "Operating profile",
      status: "Always on",
      footnote: "One employee. No rota to manage.",
    },
    points: [
      { label: "Works around the clock", meta: "24 / 7" },
      { label: "Scales instantly", meta: "Unlimited" },
      { label: "Never forgets a follow-up", meta: "100% recall" },
      { label: "Never gets tired", meta: "No fatigue" },
      { label: "Never calls in sick", meta: "0 sick days" },
    ],
  },

  voice: {
    eyebrow: "Voice cloning",
    heading: "What if your best recruiter could be everywhere at once?",
    body: "With secure AI voice cloning, Nova Helix speaks in your approved recruiter's own voice. Same warmth. Same tone. Same person your candidates already trust — just no longer limited to one conversation at a time.",
    assurances: ["Secure by design", "Approved recruiters only", "Consent-based cloning"],
    panel: {
      title: "Voice clone",
      status: "Live",
      footnote: "Cloned only from a recruiter who has approved it.",
    },
    points: [
      "Every conversation sounds professional",
      "Every candidate receives the same high-quality experience",
      "Thousands of candidates contacted simultaneously — without adding a single recruiter",
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    heading: "From job description to interview panel.",
    subheading: "One employee. Seven steps. Zero effort.",
    steps: [
      {
        title: "Upload your job description",
        description: "That's it — Nova Helix takes it from here.",
      },
      {
        title: "Nova Helix instantly screens every application",
        description: "Only qualified candidates move forward.",
      },
      {
        title: "Nova Helix calls every shortlisted candidate",
        description: "Using natural, human-like AI conversation.",
      },
      {
        title: "Nova Helix conducts an intelligent Round 1 interview",
        description:
          "Not scripted. Not robotic. Real conversations, adaptive questioning, professional evaluation.",
      },
      {
        title: "Every candidate receives an AI-generated hiring scorecard",
        description:
          "A complete, objective evaluation your hiring managers can act on immediately.",
        tags: [
          "Technical match",
          "Communication",
          "Confidence",
          "Cultural alignment",
          "Interview summary",
          "Hiring recommendation",
        ],
      },
      {
        title: "Nova Helix automatically schedules Round 2 interviews",
        description:
          "Based on your interview panel's availability. No emails. No coordination. No chasing calendars.",
      },
      {
        title: "Your HR team steps in only where humans create the most value",
        description:
          "Salary negotiations. Offer discussions. Relationship building. Hiring decisions. Exactly where they belong.",
      },
    ],
  },

  numbers: {
    eyebrow: "The numbers",
    heading: "The numbers speak for themselves.",
    stats: [
      { value: "3×", label: "Recruitment productivity" },
      { value: "24×7", label: "Always recruiting" },
      { value: "1,000s", label: "Candidates screened simultaneously" },
      { value: "£60K+", label: "Estimated Annual per Employee" },
      { value: "Minutes", label: "To start hiring" },
    ],
    note: "Estimated savings calculated for every recruiter position you no longer need to hire, because your existing HR team can now accomplish the work of three.",
  },

  capabilities: {
    eyebrow: "Capabilities",
    heading: "Everything your new AI hiring employee can do.",
    intro:
      "One hire owns the entire funnel — from the first application to a booked Round 2. Here's the full scope of work, stage by stage.",
    meta: [
      { value: "13", label: "Capabilities" },
      { value: "05", label: "Stages owned" },
      { value: "1", label: "Employee" },
    ],
    /** The 13 capabilities mapped to the hiring journey — each stage is a phase
        Nova Helix runs end to end. Reordered from the flat list; nothing added. */
    groups: [
      {
        stage: "Screen",
        caption: "Every application read and ranked on merit — in minutes, not weeks.",
        items: ["Resume screening", "Candidate ranking", "Automatic shortlisting"],
      },
      {
        stage: "Reach out",
        caption: "First contact in a voice candidates already trust.",
        items: ["AI voice calling", "Secure voice cloning", "Follow-up communication"],
      },
      {
        stage: "Interview",
        caption: "A real Round 1 conversation, scored objectively every time.",
        items: ["Autonomous Round 1 interviews", "Candidate evaluation", "AI hiring scorecards"],
      },
      {
        stage: "Coordinate",
        caption: "Round 2 booked around your panel — without a single email.",
        items: ["Round 2 scheduling", "Calendar coordination"],
      },
      {
        stage: "Oversee",
        caption: "Full visibility, so your team always knows where every role stands.",
        items: ["Recruiter dashboard", "Hiring analytics"],
      },
    ],
  },

  why: {
    eyebrow: "Why Nova Helix",
    statement:
      "Hiring was never a technology problem. It was a people problem — the wrong people were doing the wrong work.",
    body: "Give the repetitive work to Nova Helix. Give your recruiters back their judgment, their instinct, and their time. That's not automation. That's giving talented people their jobs back.",
  },

  founder: {
    eyebrow: "One more thing",
    heading: "We're only inviting a few companies in first.",
    body: "Not because we have to. Because we want the first companies on Nova Helix to help us make it even better — and to be recognized as the ones who got here first.",
    perks: [
      "A full month on us, completely free",
      "Priority feature requests",
      "White-glove onboarding",
      "Dedicated success manager",
      "Lifetime founder recognition",
    ],
    card: {
      eyebrow: "Founder early access",
      amount: "Free",
      unit: "1-month trial",
      note: "Founder places include a full month of Nova Helix at no cost — every capability, no commitment. Early-access seats are limited.",
    },
  },

  guarantee: {
    eyebrow: "We take all the risk",
    heading: "30 days of Nova Helix, completely free.",
    body: "Put Nova Helix to work for a full month at no cost. If it doesn't transform how your team hires, walk away — no charge, no commitment, nothing owed.",
    termsLabel: "What that means",
    terms: ["A full month, free", "Every capability included", "No commitment", "Cancel anytime"],
    footnote: "Great products don't need fine print — they just need to work.",
    cta: "Start Your Free Month",
  },

  finalCta: {
    eyebrow: "Get started today",
    heading: "There's an old way to hire. And then there's this.",
    body: "We call it Nova Helix. Watch it screen, call, and interview a real candidate — live, in real time. See for yourself why it's not a tool. It's a hire.",
    ctas: [
      { label: "Book a Live Demo", href: "#contact" },
      { label: "Talk to a Strategist", href: "#contact" },
    ],
    reassurance: "No commitment. See it run against a real role, with your own criteria.",
  },
};
