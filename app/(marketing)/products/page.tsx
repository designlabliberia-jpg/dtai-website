import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/enterprise/ContactSection";
import { MarketingPageShell } from "@/components/enterprise/MarketingPageShell";
import { ProductCard } from "@/components/enterprise/ProductCard";
import { db } from "@/lib/db";
import { createPageMetadata } from "@/lib/seo";
import { services as fallbackServices } from "@/lib/services-data";

export const metadata = createPageMetadata(
  "Products",
  "DTAI's flagship digital products, built for governments, institutions, and everyday life."
);

export default async function ProductsPage() {
  const [products, services] = await Promise.all([
    db.product.findMany({
      where: { published: true, deletedAt: null },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    }),
    db.service.findMany({
      where: { deletedAt: null },
      orderBy: [{ order: "asc" }],
      select: { profileEyebrow: true },
      take: 5,
    }),
  ]);

  const resolvedServices = services.length
    ? services.map(({ profileEyebrow }) => ({ title: profileEyebrow }))
    : fallbackServices.slice(0, 5).map(({ profile }) => ({ title: profile.eyebrow }));
  const pcts = resolvedServices.map((_, i) =>
    resolvedServices.length === 1 ? 98 : Math.round(95 + (i / (resolvedServices.length - 1)) * 5)
  );

  return (
    <>
      <MarketingPageShell
        eyebrow="Products"
        title="What We Do"
        subtitle="DTAI develops and operates its own portfolio of digital products, alongside custom platforms built for clients. As we grow, this portfolio continues to expand into education, agriculture, finance, public administration, logistics, and smart city initiatives."
      >
        {products.length > 0 ? (
          <div className="flex flex-col gap-8">
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
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr]">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="relative overflow-hidden rounded-lg bg-neutral-100" style={{ flex: "35 0 0%", aspectRatio: "4/3" }}>
                  <Image src="/assets/hero/team-at-work1.jpg" alt="DTAI team at work" fill className="object-cover grayscale" sizes="25vw" />
                </div>
                <div className="relative overflow-hidden rounded-full bg-neutral-100 self-end" style={{ flex: "0 0 auto", width: "30%", aspectRatio: "1/1" }}>
                  <Image src="/assets/dtai-logo.png" alt="DTAI logo" fill className="object-contain p-1" sizes="15vw" />
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg bg-neutral-100" style={{ aspectRatio: "16/7" }}>
                <Image src="/assets/services/software-engineering.jpg" alt="Software engineering" fill className="object-cover grayscale" sizes="(max-width: 1024px) 100vw, 60vw" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-6">
              <p className="text-sm leading-relaxed text-neutral-600 max-w-md">
                Digital Technologies Associates Incorporated (DTAI) is an innovative technology and environmental solutions company dedicated to delivering digital transformation services across Africa and beyond.
                We specialize in software engineering, artificial intelligence, GIS and geospatial technologies, cybersecurity, health information systems, election technology, environmental monitoring, sustainability solutions, and smart city innovations.
                By combining advanced digital technologies with environmental expertise, DTAI helps governments, development partners, private enterprises, and communities make informed decisions through solutions that promote efficiency, transparency, resilience, and sustainable development.
              </p>
              <div className="flex flex-col gap-5 w-full">
                {resolvedServices.map(({ title }, i) => (
                  <div key={title}>
                    <div className="flex justify-between mb-2">
                      <span className="font-technical text-xs font-bold uppercase tracking-wide text-neutral-800">{title}</span>
                      <span className="font-technical text-xs font-bold text-brand">{pcts[i]}%</span>
                    </div>
                    <div className="relative h-1.5 w-full rounded-full bg-neutral-200">
                      <div className="absolute left-0 top-0 h-full rounded-full bg-brand" style={{ width: `${pcts[i]}%` }} />
                      <div className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-brand bg-white" style={{ left: `calc(${pcts[i]}% - 7px)` }} />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 self-start rounded-full border border-brand bg-brand px-6 py-2.5 font-technical text-xs uppercase tracking-widest text-white transition-all duration-micro hover:bg-transparent hover:text-brand"
              >
                Contact Us <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </MarketingPageShell>
      <ContactSection />
    </>
  );
}
