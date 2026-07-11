import Link from "next/link";
import { Landmark, ClipboardCheck, Building2, Network, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeroBanner } from "@/components/enterprise/PageHeroBanner";
import { solutions } from "@/lib/solutions-data";

export const metadata = {
  title: "Solutions — DTAI",
  description: "Digital solutions DTAI builds for governments, institutions, and enterprises.",
};

const solutionIcons: Record<string, LucideIcon> = {
  "government-technology": Landmark,
  "election-technology": ClipboardCheck,
  "public-sector-platforms": Building2,
  "enterprise-systems": Network,
  "custom-digital-platforms": Layers,
};

export default function SolutionsPage() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-14">
          <PageHeroBanner
            eyebrow="Solutions"
            title="Purpose-built platforms for institutional needs"
            subtitle="Not templates — platforms built around how your institution actually operates, with the standards public and enterprise deployments require."
            icon={Layers}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => {
            const Icon = solutionIcons[s.slug] ?? Layers;
            return (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group relative block overflow-hidden rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-standard hover:-translate-y-1 hover:border-tech-blue hover:shadow-lg"
              >
                <div
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-tech-blue transition-transform duration-standard group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-infra-midnight transition-colors duration-standard group-hover:bg-brand">
                  <Icon size={20} className="text-tech-blue transition-colors duration-standard group-hover:text-white" strokeWidth={1.75} />
                </div>
                <h2 className="mt-5 font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {s.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-technical text-xs uppercase tracking-wide text-brand">
                  View solution
                  <span className="transition-transform duration-micro group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
