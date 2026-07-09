import { Container } from "@/components/layout/Container";
import { CapabilityCard } from "@/components/enterprise/CapabilityCard";

const capabilities = [
  {
    title: "Software Engineering",
    description: "Production-grade systems built on disciplined engineering practice, not prototypes.",
    href: "/capabilities/software-engineering",
  },
  {
    title: "Digital Infrastructure",
    description: "Resilient infrastructure foundations designed for national-scale reliability.",
    href: "/capabilities/digital-infrastructure",
  },
  {
    title: "Cybersecurity",
    description: "Security engineered in from architecture, not layered on after deployment.",
    href: "/capabilities/cybersecurity",
  },
  {
    title: "Data Platforms",
    description: "Structured, governed data systems that institutions can act on with confidence.",
    href: "/capabilities/data-platforms",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud architecture matched to sovereignty and compliance requirements.",
    href: "/capabilities/cloud-solutions",
  },
  {
    title: "GIS & Spatial Technology",
    description: "Geographic and spatial systems that turn location data into decisions.",
    href: "/capabilities/gis-spatial-technology",
  },
  {
    title: "Digital Transformation",
    description: "Structured modernization of institutional systems and workflows.",
    href: "/capabilities/digital-transformation",
  },
];

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
            <CapabilityCard key={cap.href} {...cap} />
          ))}
        </div>
      </Container>
    </section>
  );
}
