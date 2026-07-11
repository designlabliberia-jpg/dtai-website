import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingBag, HeartPulse, Vote, UserCheck, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProductStatusBadge } from "@/components/enterprise/ProductStatusBadge";
import { products, getProductBySlug } from "@/lib/products-data";
import { capabilities } from "@/lib/capabilities-data";

const ICONS = {
  libgo: ShoppingBag,
  hospital: HeartPulse,
  "election-results": Vote,
  "party-agent": UserCheck,
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const Icon = ICONS[product.iconKey];
  const relatedCaps = capabilities.filter((c) =>
    product.relatedCapabilities.includes(c.slug)
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-infra-midnight py-20 text-white">
        <div className="pointer-events-none absolute inset-6">
          <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
        </div>
        <Container className="max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-tech-blue/15">
              <Icon size={30} className="text-tech-blue" strokeWidth={1.5} />
            </div>
            <div>
              <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
                Product
              </span>
              <h1 className="mt-1 font-primary text-2xl font-semibold tracking-tight md:text-3xl">
                {product.name}
              </h1>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ProductStatusBadge status={product.status} />
            <span className="font-technical text-xs uppercase tracking-wide text-neutral-400">
              {product.tagline}
            </span>
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300">
            {product.description}
          </p>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          {/* Features */}
          <div>
            <h2 className="font-primary text-xl font-semibold text-neutral-900">
              Core Features
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {product.features.map((f) => (
                <div
                  key={f}
                  className="rounded-md border border-neutral-300/60 px-3 py-2.5 text-sm text-neutral-700"
                >
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Built For */}
          <div className="mt-14">
            <h2 className="font-primary text-xl font-semibold text-neutral-900">
              Built For
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {product.builtFor.map((audience) => (
                <div
                  key={audience}
                  className="flex items-center gap-3 rounded-lg border border-neutral-300/60 p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-infra-midnight">
                    <Users size={16} className="text-tech-blue" strokeWidth={1.75} />
                  </div>
                  <span className="text-sm font-medium text-neutral-800">{audience}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Built On — real cross-link to Capabilities */}
          {relatedCaps.length > 0 && (
            <div className="mt-14">
              <h2 className="font-primary text-xl font-semibold text-neutral-900">
                Built On
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Engineering capabilities behind {product.name}:
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {relatedCaps.map((cap) => (
                  <Link
                    key={cap.slug}
                    href={`/capabilities/${cap.slug}`}
                    className="group rounded-lg border border-neutral-300/60 p-4 transition-colors duration-standard hover:border-tech-blue"
                  >
                    <span className="text-sm font-medium text-neutral-800 transition-colors duration-micro group-hover:text-brand">
                      {cap.title}
                    </span>
                    <span className="mt-1 block font-technical text-xs uppercase tracking-wide text-tech-blue">
                      View capability &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 rounded-lg bg-infra-midnight p-8">
            <p className="font-primary text-lg font-semibold text-white">
              Interested in {product.name}?
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
              Reach out to learn more about {product.name} and how it could
              apply to your organization.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-tech-blue px-5 py-2.5 text-sm font-semibold text-infra-midnight transition-colors duration-micro hover:bg-white"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
