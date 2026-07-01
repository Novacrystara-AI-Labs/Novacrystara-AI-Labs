"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Full-width dark glass navbar (reference layout):
 * logo (icon + wordmark) + nav on the left, a vertical divider, then "Explore" and an
 * edge-flush "Book a Discovery" button on the right. The wordmark fades off (right→left) on scroll.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-16 items-stretch border-b border-white/10 text-white backdrop-blur-xl transition-colors duration-300",
          scrolled ? "bg-black/85" : "bg-black/70",
        )}
      >
        {/* Left: logo cell */}
        <Link href="#top" aria-label={site.brand} className="flex items-center gap-2.5 px-4 sm:px-6">
          <Image
            src="/images/logo-icon.png"
            alt=""
            width={235}
            height={225}
            priority
            className="h-9 w-auto"
          />
          <span
            aria-hidden={scrolled}
            className={cn(
              "hidden overflow-hidden whitespace-nowrap align-middle transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inline-block",
              scrolled ? "max-w-0 -translate-x-2 opacity-0" : "max-w-[170px] translate-x-0 opacity-100",
            )}
          >
            <Image
              src="/images/novacrystara_logo_1_2.png"
              alt={site.brand}
              width={744}
              height={172}
              priority
              className="h-7 w-auto"
            />
          </span>
        </Link>

        {/* Primary nav — full-height cells divided by vertical lines, green fill on hover */}
        <nav className="hidden items-stretch lg:flex" aria-label="Primary">
          {site.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center border-l border-white/10 px-5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Explore + edge-flush CTA, split by vertical lines */}
        <div className="ml-auto hidden items-stretch lg:flex">
          <Link
            href="#solutions"
            className="flex items-center gap-1.5 border-l border-white/10 px-6 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          >
            Explore
            <ChevronDown className="size-4" aria-hidden />
          </Link>
          <Link
            href={site.primaryCta.href}
            className="flex items-center gap-2 border-l border-white/10 bg-accent px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          >
            Book a Discovery
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>

        {/* Mobile: compact CTA + menu (sharp edges) */}
        <div className="ml-auto flex items-stretch lg:hidden">
          <Link
            href={site.primaryCta.href}
            className="flex items-center border-l border-white/10 bg-accent px-4 text-sm font-semibold text-white"
          >
            Book
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex items-center border-l border-white/10 px-4 text-white transition-colors hover:bg-accent"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile panel */}
      {open ? (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-black/95 p-4 text-white backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 px-2 py-3 text-base text-white/85 transition-colors hover:bg-accent hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <Link
              href="#solutions"
              onClick={() => setOpen(false)}
              className="border border-white/15 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-accent hover:text-white"
            >
              Explore
            </Link>
            <Link
              href={site.primaryCta.href}
              onClick={() => setOpen(false)}
              className="bg-accent px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
            >
              Book a Discovery
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
