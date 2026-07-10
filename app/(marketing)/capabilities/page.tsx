import {
  Code2,
  Server,
  ShieldCheck,
  Database,
  Cloud,
  MapPin,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CapabilityCard } from "@/components/enterprise/CapabilityCard";
import { capabilities } from "@/lib/capabilities-data";

export const metadata = {
  title: "Capabilities — DTAI",
  description: "Engineering domains DTAI builds and operates across.",
};

const capabilityIcons: Record<string, LucideIcon> = {
  "software-engineering": Code2,
  "digital-infrastructure": Server,
  "cybersecurity": ShieldCheck,
  "data-platforms": Database,
  "cloud-solutions": Cloud,
  "gis-spatial-technology": MapPin,
  "digital-transformation": Workflow,
};

export default function CapabilitiesPage() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-14 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            Capabilities
          </span>
          <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Engineering across the full digital stack
          </h1>
        </div>
        <h2 className="sr-only">All capabilities</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <CapabilityCard
              key={cap.slug}
              title={cap.title}
              description={cap.summary}
              href={`/capabilities/${cap.slug}`}
              icon={capabilityIcons[cap.slug] ?? Code2}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
