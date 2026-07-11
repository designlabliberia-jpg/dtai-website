import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { products, getProductBySlug } from "@/lib/products-data";

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

  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          Product
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {product.name}
        </h1>
        <p className="mt-2 font-technical text-sm uppercase tracking-wide text-tech-blue">
          {product.tagline}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          {product.description}
        </p>

        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Core Features
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
      </Container>
    </section>
  );
}
