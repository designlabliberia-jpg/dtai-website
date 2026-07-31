import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { MethodologyFlow } from "@/components/enterprise/MethodologyFlow";
import { RelatedServices } from "@/components/enterprise/RelatedServices";
import { ProfileBlock } from "@/components/enterprise/ProfileBlock";
import { ValuesSlider } from "@/components/enterprise/ValuesSlider";
import { services, getServiceBySlug } from "@/lib/services-data";
import { ContactSection } from "@/components/enterprise/ContactSection";

export function generateStaticParams() {
  return services.map((c) => ({ slug: c.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return notFound();
  const otherServices = services.filter((c) => c.slug !== slug);

  return (
    <>
      <ProfileBlock data={service.profile} />

      <ValuesSlider items={service.solutions} label="Solutions" />

      <section>
        <Container className="max-w-3xl">
        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Methodology
          </h2>
          <div className="mt-5">
            <MethodologyFlow steps={service.methodology} />
          </div>
        </div> 
        </Container>
      </section>

    <RelatedServices items={otherServices} />

    <ContactSection/>

    </>
  );
}
