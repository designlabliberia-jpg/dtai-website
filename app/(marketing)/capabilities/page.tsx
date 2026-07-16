import { MarketingPageShell } from "@/components/enterprise/MarketingPageShell";
import { CapabilityCard } from "@/components/enterprise/CapabilityCard";
import { capabilities } from "@/lib/capabilities-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Core Services",
  "Engineering domains DTAI builds and operates across."
);

export default function CapabilitiesPage() {
  return (
    <MarketingPageShell eyebrow="Core Services" title="Engineering across the full digital stack">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => (
          <CapabilityCard
            key={cap.slug}
            title={cap.title}
            description={cap.summary}
            href={`/capabilities/${cap.slug}`}
          />
        ))}
      </div>
    </MarketingPageShell>
  );
}
