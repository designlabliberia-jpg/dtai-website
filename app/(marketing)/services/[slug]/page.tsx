import { notFound } from "next/navigation";
import { MethodologyFlow } from "@/components/enterprise/MethodologyFlow";
import { RelatedServices } from "@/components/enterprise/RelatedServices";
import { ProfileBlock } from "@/components/enterprise/ProfileBlock";
import { ValuesSlider } from "@/components/enterprise/ValuesSlider";
import { getPublishedServices } from "@/lib/actions/services";
import { ContactSection } from "@/components/enterprise/ContactSection";
import { db } from "@/lib/db";

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

  const solutions = await db.solution.findMany({
    where: { serviceId: service.id, published: true, deletedAt: null },
    orderBy: { order: "asc" },
    select: { title: true },
  });

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
      <ValuesSlider items={solutions.map((s) => s.title)} label="Solutions" />
      <MethodologyFlow steps={service.methodology} />
      <RelatedServices items={otherServices} />
      <ContactSection />
    </>
  );
}
