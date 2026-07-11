import {
  Code2,
  Smartphone,
  Globe,
  Building2,
  Cloud,
  Bot,
  Database,
  ShieldCheck,
  Server,
  Headset,
  Repeat,
  Map,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CapabilityCard } from "@/components/enterprise/CapabilityCard";
import { capabilities } from "@/lib/capabilities-data";

const ICONS: Record<string, LucideIcon> = {
  "software-engineering": Code2,
  "mobile-application-development": Smartphone,
  "web-application-development": Globe,
  "enterprise-systems-development": Building2,
  "cloud-solutions": Cloud,
  "artificial-intelligence-solutions": Bot,
  "data-platforms": Database,
  cybersecurity: ShieldCheck,
  "digital-infrastructure": Server,
  "it-consulting-systems-integration": Headset,
  "digital-transformation": Repeat,
  "gis-spatial-technology": Map,
};

export function CapabilityOverview() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            Engineering Domains
          </span>
          <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Capability across the full digital stack
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <CapabilityCard
              key={cap.slug}
              title={cap.title}
              description={cap.summary}
              href={`/capabilities/${cap.slug}`}
              icon={ICONS[cap.slug] ?? Code2}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
