import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProfileBlock } from "@/components/enterprise/ProfileBlock";
import { ValuesSlider } from "@/components/enterprise/ValuesSlider";
import { ContactSection } from "@/components/enterprise/ContactSection";
import { db } from "@/lib/db";
import { createPageMetadata } from "@/lib/seo";

async function getProduct(slug: string) {
  return db.product.findFirst({
    where: { slug, published: true, deletedAt: null },
    select: {
      name: true,
      tagline: true,
      slug: true,
      features: true,
      builtFor: true,
      profileEyebrow: true,
      profileHeading: true,
      profileHeadingAccent: true,
      profileParagraphs: true,
      profilePrimaryImageUrl: true,
      profilePrimaryImageAlt: true,
      profileSecondaryImageUrl: true,
      profileSecondaryImageAlt: true,
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return createPageMetadata(product.name, product.tagline, {
    openGraph: {
      images: [{ url: product.profilePrimaryImageUrl, alt: product.profilePrimaryImageAlt }],
    },
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return notFound();

  const profileData = {
    eyebrow: product.profileEyebrow,
    heading: product.profileHeading,
    headingAccent: product.profileHeadingAccent ?? undefined,
    paragraphs: product.profileParagraphs,
    collage: {
      primary: { src: product.profilePrimaryImageUrl, alt: product.profilePrimaryImageAlt },
      ...(product.profileSecondaryImageUrl && {
        secondary: {
          src: product.profileSecondaryImageUrl,
          alt: product.profileSecondaryImageAlt ?? "",
        },
      }),
    },
  };

  return (
    <>
      <ProfileBlock data={profileData} />
      <ValuesSlider items={product.features} label="Core Features" />
      {product.builtFor.length > 0 && (
        <ValuesSlider items={product.builtFor} label="Built For" />
      )}
      <ContactSection />
    </>
  );
}
