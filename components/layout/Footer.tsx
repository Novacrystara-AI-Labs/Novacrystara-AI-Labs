import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// Brand glyphs as inline SVGs (lucide dropped brand icons).
const LinkedInIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.42 4.76 5.56V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
  </svg>
);
const XIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.24 2H21.5l-7.19 8.21L22.5 22h-6.56l-5.14-6.72L4.9 22H1.64l7.69-8.79L1.5 2h6.72l4.65 6.14L18.24 2zm-1.15 18h1.81L7.02 3.9H5.08L17.09 20z" />
  </svg>
);
const GitHubIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
  </svg>
);
const YouTubeIcon: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
  </svg>
);

// TODO: swap the placeholder hrefs for the real profile URLs.
const socials: { label: string; href: string; Icon: IconType }[] = [
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "X (Twitter)", href: "#", Icon: XIcon },
  { label: "GitHub", href: "#", Icon: GitHubIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
];

/** Site footer — dark brand block: logo, slogan, contact, socials, nav, legal. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-white">
      {/* Subtle green top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(78,143,82,0.14),transparent)]"
      />

      <Container className="relative py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="#top" aria-label={site.brand} className="flex items-center gap-2.5">
              <Image
                src="/images/novacrystara_logo_1_1.png"
                alt=""
                width={235}
                height={225}
                className="h-11 w-auto"
              />
              <Image
                src="/images/novacrystara_logo_1_2.png"
                alt={site.brand}
                width={744}
                height={172}
                className="h-7 w-auto"
              />
            </Link>

            <p className="mt-6 font-mono text-sm uppercase tracking-[0.22em] text-[#7ed98d]">
              {site.footer.tagline}
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
          <nav aria-label="Footer" className="lg:justify-self-end">
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-14 gap-y-3.5">
              {site.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">{site.footer.legal}</p>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            Enterprise AI, delivered.
          </p>
        </div>
      </Container>
    </footer>
  );
}
