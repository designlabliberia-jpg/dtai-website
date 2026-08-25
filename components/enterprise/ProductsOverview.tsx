import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/enterprise/ProductCard";
import { db } from "@/lib/db";

async function getData() {
  const [products, services] = await Promise.all([
    db.product.findMany({
      where: { published: true, deletedAt: null },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 2,
    }),
    db.service.findMany({
      where: { deletedAt: null },
      orderBy: [{ order: "asc" }],
      select: { title: true },
      take: 5,
    }),
  ]);
  return { products, services };
}

export async function ProductsOverview() {
  const { products, services } = await getData();
  // Spread percentages evenly between 95–100
  const pcts = services.map((_, i) =>
    services.length === 1 ? 98 : Math.round(95 + (i / (services.length - 1)) * 5)
  );

  return (
    <section id="products" className="py-8">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-200 pb-6">
          <div>
            <h1 className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
              <span className="w-1 h-6 bg-brand rounded-full" />
              What We Do
              <span className="hidden sm:block w-64 h-px bg-brand" />
            </h1>
          </div>
          <div className="flex flex-col sm:items-end gap-3">
            <p className="hidden max-w-xs sm:text-right text-sm leading-relaxed text-neutral-500 sm:block">
              Scalable, secure, and robust platforms built to handle national-level complexity.
            </p>
            {products.length > 0 && (
              <Link href="/products" className="group inline-flex items-center gap-2 font-technical font-bold text-sm uppercase tracking-wide text-brand transition-colors hover:text-brand/80">
                View All<ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        {products.length > 0 ? (
          <div className="mt-8 flex flex-col gap-8">
            {products.map((p, i) => (
              <ProductCard
                key={p.slug}
                index={i}
                name={p.name}
                description={p.description}
                features={p.features}
                image={p.imageUrl}
                href={`/products/${p.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] items-center">
            {/* Image collage: 60% column */}
            <div className="flex flex-col gap-3">
              {/* Top row: team photo (35% of col) + logo (20% of col) */}
              <div className="flex gap-3">
                <div className="relative overflow-hidden rounded-lg bg-neutral-100" style={{ flex: "35 0 0%", aspectRatio: "4/3" }}>
                  <Image src="/assets/hero/team-at-work1.jpg" alt="DTAI team at work" fill className="object-cover grayscale" sizes="25vw" />
                </div>
                <div className="relative overflow-hidden rounded-full bg-neutral-100 self-end" style={{ flex: "0 0 auto", width: "30%", aspectRatio: "1/1" }}>
                  <Image src="/assets/dtai-logo.png" alt="DTAI logo" fill className="object-contain p-1" sizes="15vw" />
                </div>
              </div>
              {/* Bottom row: full-width image */}
              <div className="relative overflow-hidden rounded-lg bg-neutral-100" style={{ aspectRatio: "16/7" }}>
                <Image src="/assets/services/software-engineering.jpg" alt="Software engineering" fill className="object-cover grayscale" sizes="(max-width: 1024px) 100vw, 60vw" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <p className="text-sm leading-relaxed text-neutral-600 max-w-md">
                DTAI engineers purpose-built digital platforms for governments, institutions, and everyday life — from election management systems to healthcare platforms and super apps. Our products are built for scale, security, and real-world impact across Africa.
              </p>

              {/* Capability bars */}
              <div className="flex flex-col gap-5">
                {services.map(({ title }, i) => (
                  <div key={title}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-technical text-xs font-bold uppercase tracking-wide text-neutral-800">{title}</span>
                      <span className="font-technical text-xs font-bold text-brand">{pcts[i]}%</span>
                    </div>
                    <div className="relative h-1.5 w-full rounded-full bg-neutral-200">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-brand"
                        style={{ width: `${pcts[i]}%` }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-brand bg-white"
                        style={{ left: `calc(${pcts[i]}% - 7px)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 self-start rounded-full bg-brand px-6 py-2.5 font-technical text-xs uppercase tracking-widest text-white transition-colors hover:bg-brand/90"
              >
                Contact Us <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
