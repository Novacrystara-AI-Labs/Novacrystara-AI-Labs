import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

/** Site footer — brand, tagline, nav, contact, legal (arch §5). */
export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold">{site.brand}</p>
            <p className="mt-3 text-pretty text-muted">{site.footer.tagline}</p>
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-4 inline-block text-accent underline-offset-4 hover:underline"
            >
              {site.contact.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
              {site.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-muted">{site.footer.legal}</p>
        </div>
      </Container>
    </footer>
  );
}
