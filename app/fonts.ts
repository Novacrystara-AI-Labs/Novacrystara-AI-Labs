import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/**
 * Typography (arch §3.1)
 * Primary: Geist Sans / Geist Mono (loaded via next/font, self-hosted).
 * Fallback chain resolves to: Geist → Arial → sans-serif (see globals.css --font-sans).
 * Exposes the CSS variables --font-geist-sans / --font-geist-mono on <html>.
 */
export const fontSans = GeistSans;
export const fontMono = GeistMono;
