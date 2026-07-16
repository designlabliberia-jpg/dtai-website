import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

const ProductCard = dynamic(() => import("@/components/enterprise/ProductCard").then((m) => ({ default: m.ProductCard })));
import { products } from "@/lib/products-data";

const featured = products.slice().sort(() => Math.random() - 0.5).slice(0, 3);

export function ProductsOverview() {
  return (
    <section id="products" className="bg-blue-50 py-8">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-200 pb-6">
          <div>
            <p className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
              <span className="w-1 h-6 bg-brand rounded-full" />
              Engineered Solutions
              <span className="hidden sm:block flex-1 max-w-[12rem] h-px bg-brand" />
            </p>
            <h3 className="mt-2 font-primary font-semibold tracking-tight text-neutral-900">
              Digital Products
            </h3>
          </div>
          <div className="flex flex-col sm:items-end gap-3">
            <p className="hidden max-w-xs sm:text-right text-sm leading-relaxed text-neutral-500 sm:block">
              Scalable, secure, and robust platforms built to handle national-level complexity.
            </p>
            <Link href="/products" className="group inline-flex items-center gap-2 font-technical font-bold text-sm uppercase tracking-wide text-brand transition-colors hover:text-brand/80">
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
