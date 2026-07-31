import { ContactSection } from "@/components/enterprise/ContactSection";
import { MarketingPageShell } from "@/components/enterprise/MarketingPageShell";
import { ProductCard } from "@/components/enterprise/ProductCard";
import { products } from "@/lib/products-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Products",
  "DTAI's flagship digital products, built for governments, institutions, and everyday life."
);

export default function ProductsPage() {
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
            image={p.image}
            href={`/products/${p.slug}`}
            dark={p.dark}
          />
        ))}
      </div>
    </MarketingPageShell>
    <ContactSection/>
    </>
  );
}
