"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Menu, X, ArrowDown, ChevronDown, ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { SolutionsMegaMenu } from "./SolutionsMegaMenu";
import { AgentsMegaMenu } from "./AgentsMegaMenu";
import { MobileSolutionsPanel } from "./MobileSolutionsPanel";
import { MobileAgentsPanel } from "./MobileAgentsPanel";

/** Sentinel hrefs the Navbar intercepts to open a mega-menu, not navigate. */
const MENU_TRIGGERS = new Set(["#solutions", "#ai-employees"]);

/**
 * Full-width solid-black navbar: icon + wordmark on the left (the wordmark fades
 * off, right→left, on scroll), primary nav in full-height cells, then "Explore"
 * and an edge-flush "Book a Discovery" button on the right.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [agentsOpen, setAgentsOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  // Section anchors only resolve on the home page — prefix them elsewhere.
  const resolve = useCallback(
    (href: string) => (onHome || !href.startsWith("#") ? href : `/${href}`),
    [onHome],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never leave a menu hanging open across a route change.
  useEffect(() => {
    setMegaOpen(false);
    setAgentsOpen(false);
    setOpen(false);
  }, [pathname]);

  // The two desktop mega-menus are mutually exclusive — opening one closes the
  // other so they can never stack.
  const toggleMega = useCallback(() => {
    setAgentsOpen(false);
    setMegaOpen((v) => !v);
  }, []);
  const toggleAgents = useCallback(() => {
    setMegaOpen(false);
    setAgentsOpen((v) => !v);
  }, []);

  // Same-page anchor jumps don't change the pathname, so watch the hash too.
  // Also drop the mobile panel once we cross into the desktop layout, where it
  // is hidden anyway — otherwise it silently reappears on the way back down.
  useEffect(() => {
    const closeAll = () => {
      setMegaOpen(false);
      setAgentsOpen(false);
      setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    window.addEventListener("hashchange", closeAll);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("hashchange", closeAll);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, []);

  // Stable identity so the mega-menus' "while open" effects aren't torn down and
  // rebuilt on every Navbar re-render.
  const closeMega = useCallback(() => setMegaOpen(false), []);
  const closeAgents = useCallback(() => setAgentsOpen(false), []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-stretch border-b border-white/10 bg-black text-white">
        {/* Left: logo cell — emblem + wordmark (wordmark fades off on scroll) */}
        <Link
          href={resolve("#top")}
          aria-label={site.brand}
          className="flex items-center gap-2.5 px-4 sm:px-6"
        >
          <Image
            src="/images/novacrystara_logo_1_1.png"
            alt=""
            width={235}
            height={225}
            priority
            className="h-11 w-auto"
          />
          <span
            aria-hidden={scrolled}
            className={cn(
              "hidden overflow-hidden whitespace-nowrap align-middle transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inline-block",
              scrolled ? "max-w-0 -translate-x-2 opacity-0" : "max-w-[180px] translate-x-0 opacity-100",
            )}
          >
            <Image
              src="/images/novacrystara_logo_1_4.png"
              alt={site.brand}
              width={747}
              height={222}
              priority
              className="h-8 w-auto"
            />
          </span>
        </Link>

        {/* Primary nav — full-height cells divided by vertical lines, green fill on hover */}
        <nav className="hidden items-stretch lg:flex" aria-label="Primary">
          {site.nav.map((link) => {
            if (MENU_TRIGGERS.has(link.href)) {
              const isAgents = link.href === "#ai-employees";
              const active = isAgents ? agentsOpen : megaOpen;
              return (
                <button
                  key={link.href}
                  type="button"
                  aria-expanded={active}
                  aria-controls={isAgents ? "ai-employees-mega-menu" : "solutions-mega-menu"}
                  onClick={isAgents ? toggleAgents : toggleMega}
                  className={cn(
                    "flex items-center gap-1.5 border-l border-white/10 px-5 text-sm font-medium transition-colors duration-200 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                    active ? "bg-accent text-white" : "text-white/80",
                  )}
                >
                  {link.label}
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-4 transition-transform duration-300",
                      active && "rotate-180",
                    )}
                  />
                </button>
              );
            }
            return (
              <Link
                key={link.href}
                href={resolve(link.href)}
                className="flex items-center border-l border-white/10 px-5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Explore + edge-flush CTA, split by vertical lines */}
        <div className="ml-auto hidden items-stretch lg:flex">
          {/* Explore is a plain jump to the solutions section — deliberately NOT
              a second trigger for the mega-menu. */}
          <Link
            href={resolve("#solutions")}
            className="group flex items-center gap-1.5 border-l border-white/10 px-6 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          >
            Explore
            <ArrowDown
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </Link>
          <Link
            href={resolve(site.primaryCta.href)}
            className="flex items-center gap-2 border-l border-white/10 bg-accent px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          >
            Book a Discovery
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>

        {/* Mobile: compact CTA + menu (sharp edges) */}
        <div className="ml-auto flex items-stretch lg:hidden">
          <Link
            href={resolve(site.primaryCta.href)}
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

      {/* Desktop mega-menus */}
      <div className="hidden lg:block">
        <SolutionsMegaMenu open={megaOpen} onClose={closeMega} />
        <AgentsMegaMenu open={agentsOpen} onClose={closeAgents} />
      </div>

      {/* Mobile panel */}
      {open ? (
        <div
          data-lenis-prevent
          className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-white/10 bg-black p-4 text-white lg:hidden"
        >
          <ul className="flex flex-col">
            {site.nav.map((link) => {
              if (link.href === "#solutions") {
                return (
                  <li key={link.href}>
                    <MobileSolutionsPanel onNavigate={() => setOpen(false)} />
                  </li>
                );
              }
              if (link.href === "#ai-employees") {
                return (
                  <li key={link.href}>
                    <MobileAgentsPanel onNavigate={() => setOpen(false)} />
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={resolve(link.href)}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/5 px-2 py-3 text-base text-white/85 transition-colors hover:bg-accent hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <Link
              href={resolve(site.primaryCta.href)}
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
