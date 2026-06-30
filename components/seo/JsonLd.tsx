import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { faq } from "@/content/faq";

/**
 * Structured data (arch §12): Organization, Service, and FAQPage.
 * Rendered as a single JSON-LD graph in a <script> tag.
 */
export function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.brand,
      url: site.url,
      description: site.description,
      email: site.contact.email,
    },
    {
      "@type": "Service",
      "@id": `${site.url}/#service`,
      name: "Enterprise AI Solutions",
      serviceType: "Enterprise AI design, build, and integration",
      provider: { "@id": `${site.url}/#organization` },
      areaServed: "Global",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "What We Build",
        itemListElement: solutions.solutions.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  const data = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
