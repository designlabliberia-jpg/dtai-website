import { notFound } from "next/navigation";
import { ProfileBlock } from "@/components/enterprise/ProfileBlock";
import { ValuesSlider } from "@/components/enterprise/ValuesSlider";
import { products, getProductBySlug } from "@/lib/products-data";
import { services } from "@/lib/services-data";
import { ContactSection } from "@/components/enterprise/ContactSection";



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
    <>
      <ProfileBlock data={product.profile} />

      <ValuesSlider items={product.features} label="Core Features" />

      <ContactSection/>

    </>
  );
}
