import { MarketingPageShell } from "@/components/enterprise/MarketingPageShell";
import { ServiceCard } from "@/components/enterprise/ServiceCard";
import { services } from "@/lib/services-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Core Services",
  "Engineering domains DTAI builds and operates across."
);

export default function ServicesPage() {
  return (
    <MarketingPageShell eyebrow="Core Services" title="Engineering across the full digital stack">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((ser) => (
          <ServiceCard
            key={ser.slug}
            title={ser.title}
            icon={ser.icon}
            description={ser.summary}
            href={`/services/${ser.slug}`}
          />
        ))}
      </div>
    </MarketingPageShell>
  );
}
