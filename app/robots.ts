import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Robots (arch §12). Keep the dev-only styleguide out of the index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/styleguide",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
