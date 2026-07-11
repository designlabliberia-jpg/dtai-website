import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { products } from "@/lib/products-data";

export const metadata = {
  title: "Products — DTAI",
  description: "DTAI's flagship digital products, built for governments, institutions, and everyday life.",
};

export default function ProductsPage() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-14 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            Products
          </span>
          <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Our flagship digital solutions
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            DTAI develops and operates its own portfolio of digital products,
            alongside custom platforms built for clients. As we grow, this
            portfolio continues to expand into education, agriculture,
            finance, public administration, logistics, and smart city
            initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group block rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-standard hover:-translate-y-1 hover:border-tech-blue hover:shadow-lg"
            >
              <h3 className="font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
                {p.name}
              </h3>
              <p className="mt-1.5 font-technical text-xs uppercase tracking-wide text-tech-blue">
                {p.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.features.slice(0, 4).map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600"
                  >
                    {f}
                  </span>
                ))}
                {p.features.length > 4 && (
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500">
                    +{p.features.length - 4} more
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
