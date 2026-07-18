import fs from "fs";

const content = `import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ServiceHero } from "@/components/enterprise/ServiceHero";
import { SolutionsGrid } from "@/components/enterprise/SolutionsGrid";
import { MethodologyFlow } from "@/components/enterprise/MethodologyFlow";
import { WhoThisIsFor } from "@/components/enterprise/WhoThisIsFor";
import { CodeWindow } from "@/components/enterprise/CodeWindow";
import { ReportMockup } from "@/components/enterprise/ReportMockup";
import { MonitoringDashboard } from "@/components/enterprise/MonitoringDashboard";
import { RelatedServices } from "@/components/enterprise/RelatedServices";
import { services, getServiceBySlug } from "@/lib/services-data";

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
      <ServiceHero
        slug={service.slug}
        eyebrow="Service"
        title={service.title}
        subtitle={service.summary}
      />

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <div>
            <h2 className="font-primary text-xl font-semibold text-neutral-900">Overview</h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">{service.overview}</p>
          </div>

          <div className="mt-14">
            <h2 className="font-primary text-xl font-semibold text-neutral-900">Solutions</h2>
            <div className="mt-5">
              <SolutionsGrid solutions={service.solutions} />
            </div>
          </div>

          <div className="mt-14">
            <span className="mb-3 flex items-center gap-2 font-technical text-[10px] uppercase tracking-wide text-neutral-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
              {service.representativeExample === "code" && "Representative Implementation Pattern"}
              {service.representativeExample === "report" && "Representative Deliverable"}
              {service.representativeExample === "dashboard" && "Representative Monitoring View"}
            </span>
            {service.representativeExample === "code" && (
              <CodeWindow filename={service.codeFilename} language={service.codeLang} code={service.codeSnippet} />
            )}
            {service.representativeExample === "report" && <ReportMockup />}
            {service.representativeExample === "dashboard" && <MonitoringDashboard />}
          </div>

          <div className="mt-14">
            <h2 className="font-primary text-xl font-semibold text-neutral-900">Methodology</h2>
            <div className="mt-5">
              <MethodologyFlow steps={service.methodology} />
            </div>
          </div>

          <div className="mt-14">
            <h2 className="font-primary text-xl font-semibold text-neutral-900">Proof Points</h2>
            <ul className="mt-4 space-y-3">
              {service.proofPoints.map((p) => (
                <li key={p} className="border-l-2 border-neutral-300 pl-4 text-sm leading-relaxed text-neutral-700">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14">
            <h2 className="font-primary text-xl font-semibold text-neutral-900">Who This Is For</h2>
            <div className="mt-5">
              <WhoThisIsFor items={service.whoThisIsFor} />
            </div>
          </div>

          <div className="mt-14 rounded-lg bg-infra-midnight p-8">
            <p className="font-primary text-lg font-semibold text-white">
              Need {service.title.toLowerCase()}?
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
              Talk to DTAI about the specific requirements and constraints of your project.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-tech-blue px-5 py-2.5 text-sm font-semibold text-infra-midnight transition-colors duration-micro hover:bg-white"
            >
              Contact Us
            </Link>
          </div>

          <RelatedServices items={otherServices} />
        </Container>
      </section>
    </>
  );
}
`;

fs.writeFileSync("app/(marketing)/services/[slug]/page.tsx", content);
console.log("Rewrote app/(marketing)/services/[slug]/page.tsx");
