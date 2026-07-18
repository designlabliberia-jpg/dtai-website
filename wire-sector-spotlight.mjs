import fs from "fs";

const content = `import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MetricsPanel } from "@/components/enterprise/MetricsPanel";
import { SectorSpotlight } from "@/components/enterprise/SectorSpotlight";
import { industries } from "@/lib/industries-data";
import { services } from "@/lib/services-data";
import { solutions } from "@/lib/solutions-data";

export function PartnerCard() {
  const metrics = [
    { value: String(industries.length), label: "Sectors Served" },
    { value: String(services.length), label: "Engineering Capabilities" },
    { value: String(solutions.length), label: "Solution Models" },
    { value: "24/7", label: "Systems Monitoring" },
  ];

  return (
    <section id="partners" className="bg-white py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 font-technical text-xs uppercase tracking-widest text-brand">
            <span className="h-6 w-1 rounded-full bg-brand" />
            Sectors We Serve
          </p>
          <h2 className="mt-4 font-primary text-3xl font-bold leading-snug tracking-tight text-neutral-900 sm:text-4xl">
            We Work With The <span className="text-brand">Best In Business</span>
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-neutral-600">
            We partner with organisations across sectors to design, deploy, and
            sustain digital infrastructure that drives measurable outcomes.
            From government to enterprise, our solutions are built to scale.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 self-start rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand/90"
          >
            Work With Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14">
          <SectorSpotlight />
        </div>

        <div className="mt-14 border-t border-neutral-300/60 pt-10">
          <MetricsPanel metrics={metrics} />
        </div>
      </Container>
    </section>
  );
}
`;

fs.writeFileSync("components/enterprise/PartnerCard.tsx", content);
console.log("Rewrote components/enterprise/PartnerCard.tsx with SectorSpotlight");
