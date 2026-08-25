import { ContactSection } from "@/components/enterprise/ContactSection";
import { MarketingPageShell } from "@/components/enterprise/MarketingPageShell";
import { ProductCard } from "@/components/enterprise/ProductCard";
import { db } from "@/lib/db";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Products",
  "DTAI's flagship digital products, built for governments, institutions, and everyday life."
);

export default async function ProductsPage() {
  const products = await db.product.findMany({
    where: { published: true, deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <MarketingPageShell
        eyebrow="Products"
        title="Our Digital Products"
        subtitle="DTAI develops and operates its own portfolio of digital products, alongside custom platforms built for clients. As we grow, this portfolio continues to expand into education, agriculture, finance, public administration, logistics, and smart city initiatives."
      >
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
      </MarketingPageShell>
      <ContactSection />
    </>
  );
}
