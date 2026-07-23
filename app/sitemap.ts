import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { liveAgents } from "@/content/agents";

// Sitemap (arch §12). Home + every shipped agent landing page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...liveAgents.map((agent) => ({
      url: `${site.url}/agents/${agent.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
