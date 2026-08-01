import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowRight, ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// Brand glyphs as inline SVGs (lucide dropped brand icons).
const LinkedInIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.42 4.76 5.56V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
  </svg>
);
const InstagramIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77c-.55.55-1.11.89-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.89 1.77-1.15.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.51.21-1.86.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.35-.31.88-.35 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.21 1.51.35 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.14.88.31 1.86.35 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.51-.21 1.86-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.35.31-.88.35-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.21-1.51-.35-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.35-.14-.88-.31-1.86-.35-1.05-.05-1.37-.06-4.04-.06zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68zm5.34-3.14a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
  </svg>
);

// Section anchors live on the home page — make them absolute so they also work
// from sub-pages like /agents/nova-helix.
const home = (href: string) => (href.startsWith("#") ? `/${href}` : href);

const socials: { label: string; href: string; Icon: IconType }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/novacrystara", Icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com/novacrystara", Icon: InstagramIcon },
];

/** Site footer — dark brand block: logo, slogan, contact, socials, nav, CTA, legal. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-white">
      {/* Subtle green top glow + blueprint texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(78,143,82,0.14),transparent)]"
      />
      <Container className="relative py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1.1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/#top" aria-label={site.brand} className="flex items-center gap-2.5">
              <Image
                src="/images/novacrystara_logo_1_1.png"
                alt=""
                width={235}
                height={225}
                className="h-11 w-auto"
              />
              <Image
                src="/images/novacrystara_logo_1_4.png"
                alt={site.brand}
                width={747}
                height={222}
                className="h-8 w-auto"
              />
            </Link>

            <p className="mt-6 font-mono text-sm uppercase tracking-[0.22em] text-[#7ed98d]">
              {site.footer.tagline}
            </p>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {site.description}
            </p>

            <a
              href={`mailto:${site.contact.email}`}
              className="mt-5 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-[#7ed98d]"
            >
              <Mail aria-hidden className="size-4" />
              {site.contact.email}
            </a>

            {/* Social icons */}
            <div className="mt-7 flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7ed98d] hover:text-[#7ed98d]"
                >
                  <Icon aria-hidden className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="lg:justify-self-center">
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">Navigate</p>
            <ul className="mt-5 space-y-3.5">
              {site.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={home(link.href)}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                  >
                    <span className="h-px w-0 bg-[#7ed98d] transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get started — CTA column */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">Get started</p>
            <p className="mt-5 text-pretty text-sm leading-relaxed text-white/70">
              Book a discovery session and walk away with a prioritized, boardroom-ready AI roadmap.
            </p>
            <Link
              href={home(site.primaryCta.href)}
              className="group mt-6 inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {site.primaryCta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <p className="mt-5 flex items-center gap-2 text-xs text-white/45">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#7ed98d]" />
              Typically responds within one business day.
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">{site.footer.legal}</p>
          <div className="flex items-center gap-5">
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">
              Enterprise AI, delivered.
            </p>
            <Link
              href="/#top"
              aria-label="Back to top"
              className="inline-flex size-8 items-center justify-center border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7ed98d] hover:text-[#7ed98d]"
            >
              <ArrowUp aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
