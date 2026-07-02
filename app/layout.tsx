import type { Metadata } from "next";
import { fontSans, fontMono } from "./fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DiscoveryProvider } from "@/components/providers/DiscoveryProvider";
import { site } from "@/content/site";
import "./globals.css";

// SEO metadata (arch §12). OG image is auto-wired from app/opengraph-image.tsx.
const title = "NovaCrystara AI Labs — AI Solutions for Speed, Scale, and ROI";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s — NovaCrystara AI Labs",
  },
  description: site.description,
  applicationName: site.brand,
  keywords: [
    "enterprise AI",
    "AI agents",
    "agentic AI",
    "AI platforms",
    "intelligent automation",
    "RAG",
    "AI integration",
    "AI consulting",
  ],
  authors: [{ name: site.brand }],
  creator: site.brand,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.brand,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body>
        <DiscoveryProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </DiscoveryProvider>
      </body>
    </html>
  );
}
