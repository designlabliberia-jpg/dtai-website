import fs from "fs";

const content = `import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MetricsPanel } from "@/components/enterprise/MetricsPanel";
import { partnerLogos } from "@/lib/partners-data";
import { industries } from "@/lib/industries-data";
import { capabilities } from "@/lib/capabilities-data";
import { solutions } from "@/lib/solutions-data";

export function PartnerCard() {
  const metrics = [
    { value: String(industries.length), label: "Sectors Served" },
    { value: String(capabilities.length), label: "Engineering Capabilities" },
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

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partnerLogos.map((sector) => (
            <div
              key={sector.name}
              className="group flex flex-col items-center gap-3 rounded-lg border border-neutral-300/60 p-5 text-center transition-all duration-standard hover:-translate-y-1 hover:border-tech-blue hover:shadow-md"
            >
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src={sector.src}
                  alt={sector.name}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="text-sm font-medium leading-tight text-neutral-700 transition-colors duration-micro group-hover:text-brand">
                {sector.name}
              </span>
            </div>
          ))}
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
console.log("Rewrote components/enterprise/PartnerCard.tsx");
