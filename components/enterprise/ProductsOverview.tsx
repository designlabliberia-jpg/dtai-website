import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/enterprise/ProductCard";
import { products } from "@/lib/products-data";

const featured = products.slice().sort(() => Math.random() - 0.5).slice(0, 3);

export function ProductsOverview() {
  return (
    <section id="products" className="bg-white py-8">
      <Container>
        <div className="flex items-end justify-between border-b border-neutral-200 pb-6">
          <div>
            <span className="font-technical text-xs uppercase tracking-widest text-tech-blue">
              Engineered Solutions
            </span>
            <h2 className="mt-2 font-primary text-2xl font-semibold tracking-tight text-neutral-900">
              Digital Products
            </h2>
          </div>
          <div className="flex flex-col items-end gap-3">
            <p className="hidden max-w-xs text-right text-sm leading-relaxed text-neutral-500 sm:block">
              Scalable, secure, and robust platforms built to handle national-level complexity.
            </p>
            <Link href="/products" className="group inline-flex items-center gap-2 font-technical text-xs uppercase tracking-wide text-brand transition-colors hover:text-brand/80">
              View All<ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8">
          {featured.map((p, i) => (
            <ProductCard
              key={p.slug}
              index={i}
              name={p.name}
              description={p.description}
              features={p.features}
              image={p.image}
              href={`/products/${p.slug}`}
              dark={p.dark}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
