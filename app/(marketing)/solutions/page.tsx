import Link from "next/link";
import { Landmark, ClipboardCheck, Building2, Network, Layers, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MetricsPanel } from "@/components/enterprise/MetricsPanel";
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

const pillars = [
  {
    title: "Architecture",
    detail: "Every system begins with a documented architecture review before implementation, not after.",
  },
  {
    title: "Security Approach",
    detail: "Security requirements are defined at the design stage and verified at every deployment gate.",
  },
  {
    title: "Engineering Method",
    detail: "Standardized development, testing, and deployment workflows applied consistently across projects.",
  },
];

const metrics = [
  { value: "99.9%", label: "Platform uptime target across production systems" },
  { value: "AA", label: "WCAG accessibility compliance standard" },
  { value: "24/7", label: "Monitoring on mission-critical deployments" },
  { value: "Zero", label: "Tolerance policy on unreviewed production changes" },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-infra-midnight pb-32 pt-20 text-white sm:pb-40 sm:pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 70% at 15% 20%, rgba(0,166,255,0.14), transparent 65%)",
          }}
        />
        <div className="pointer-events-none absolute inset-6">
          <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
        </div>

        <Container className="relative max-w-3xl">
          <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
            Solutions
          </span>
          <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Purpose-built platforms for institutional needs
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-300">
            Not templates — platforms built around how your institution
            actually operates, with the standards public and enterprise
            deployments require.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#all-solutions"
              className="inline-flex items-center gap-2 rounded-md bg-tech-blue px-5 py-2.5 text-sm font-semibold text-infra-midnight transition-colors duration-micro hover:bg-white"
            >
              Explore Solutions
              <ArrowRight size={15} />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-micro hover:border-tech-blue hover:text-tech-blue"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>

      {/* Numbered pillar cards, overlapping the hero */}
      <Container className="relative -mt-20 sm:-mt-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-lg"
            >
              <span className="font-technical text-xs text-tech-blue">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-primary text-base font-semibold text-neutral-900">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Stats bar */}
      <section className="bg-white pt-16">
        <Container>
          <MetricsPanel metrics={metrics} />
        </Container>
      </section>

      {/* Solutions grid */}
      <section id="all-solutions" className="scroll-mt-24 bg-white py-20">
        <Container>
          <div className="mb-10 max-w-2xl">
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              All Solutions
            </span>
            <h2 className="mt-3 font-primary text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Platforms by domain
            </h2>
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
                  <h3 className="mt-5 font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {s.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-technical text-xs uppercase tracking-wide text-brand">
                    View solution
                    <ArrowRight size={13} className="transition-transform duration-micro group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
