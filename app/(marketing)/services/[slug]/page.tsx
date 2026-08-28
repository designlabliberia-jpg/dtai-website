import { notFound } from "next/navigation";
import { MethodologyFlow } from "@/components/enterprise/MethodologyFlow";
import { RelatedServices } from "@/components/enterprise/RelatedServices";
import { ProfileBlock } from "@/components/enterprise/ProfileBlock";
import { ValuesSlider } from "@/components/enterprise/ValuesSlider";
import { getPublishedServices } from "@/lib/actions/services";
import { services as fallbackServices } from "@/lib/services-data";
import { ContactSection } from "@/components/enterprise/ContactSection";

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const services = await getPublishedServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) return notFound();
  const otherServices = services.filter((s) => s.slug !== slug);

  const profile = {
    eyebrow: service.profileEyebrow,
    heading: service.profileHeading,
    headingAccent: service.profileHeadingAccent ?? undefined,
    paragraphs: service.profileParagraphs,
    collage: {
      primary: { src: service.profilePrimaryImageUrl, alt: service.profilePrimaryImageAlt },
    },
  };

  return (
    <>
      <ProfileBlock data={profile} />
      <ValuesSlider items={service.solutions} label="Solutions" />
      <MethodologyFlow steps={service.methodology} />
      <RelatedServices items={otherServices} />
      <ContactSection />
    </>
  );
}
