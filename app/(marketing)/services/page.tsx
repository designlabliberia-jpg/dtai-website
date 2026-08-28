import { MarketingPageShell } from "@/components/enterprise/MarketingPageShell";
import { ServiceCard } from "@/components/enterprise/ServiceCard";
import { getPublishedServices } from "@/lib/actions/services";
import { createPageMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/enterprise/ContactSection";

export const metadata = createPageMetadata(
  "Core Services",
  "Engineering domains DTAI builds and operates across."
);

export default async function ServicesPage() {
  const services = await getPublishedServices();
  return (
    <>
    <MarketingPageShell eyebrow="Core Services" title="Engineering across the full digital stack">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((ser) => (
          <ServiceCard
            key={ser.slug}
            title={ser.profileEyebrow}
            icon={ser.icon}
            description={ser.profileParagraphs[0]}
            href={`/services/${ser.slug}`}
          />
        ))}
      </div>
    </MarketingPageShell>
    <ContactSection/>
    </>
  );
}
