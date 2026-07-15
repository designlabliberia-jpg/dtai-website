import Link from "next/link";
import { FileText } from "lucide-react";
import { MarketingPageShell } from "@/components/enterprise/MarketingPageShell";
import { caseStudies } from "@/lib/case-studies-data";

export const metadata = {
  title: "Case Studies — DTAI",
  description: "Documented engineering work across government and institutional projects.",
};

export default function CaseStudiesPage() {
  return (
    <MarketingPageShell eyebrow="Case Studies" title="Proof, documented">

        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group block rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-standard hover:border-tech-blue hover:shadow-md"
              >
                <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
                  {cs.industry}
                </span>
                <h3 className="mt-2 font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
                  {cs.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {cs.challenge}
                </p>
                <span className="mt-4 inline-block font-technical text-xs uppercase tracking-wide text-tech-blue">
                  Read case study &rarr;
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-lg border border-neutral-300/60 bg-infra-midnight p-10 sm:p-14">
            <div className="pointer-events-none absolute inset-4">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/5">
              <FileText size={20} className="text-tech-blue" strokeWidth={1.75} />
            </div>

            <h2 className="mt-6 max-w-md font-primary text-xl font-semibold text-white">
              Documented case studies are in preparation
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
              DTAI publishes case studies only once a project is complete and
              cleared for public reference. Check back soon, or contact us
              directly to discuss project references relevant to your
              evaluation.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-tech-blue px-5 py-2.5 text-sm font-semibold text-infra-midnight transition-colors duration-micro hover:bg-white"
            >
              Request project references
            </Link>
          </div>
        )}
    </MarketingPageShell>
  );
}
