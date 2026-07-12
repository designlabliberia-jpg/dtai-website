import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Landmark, ClipboardCheck, Building2, Network, Layers, ListChecks, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CodeWindow } from "@/components/enterprise/CodeWindow";
import { RelatedSolutions } from "@/components/enterprise/RelatedSolutions";
import { solutions, getSolutionBySlug } from "@/lib/solutions-data";

const solutionIcons: Record<string, LucideIcon> = {
  "government-technology": Landmark,
  "election-technology": ClipboardCheck,
  "public-sector-platforms": Building2,
  "enterprise-systems": Network,
  "custom-digital-platforms": Layers,
};

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};

  return {
    title: solution.title,
    description: solution.summary,
    openGraph: {
      title: `${solution.title} | DTAI`,
      description: solution.summary,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.title} | DTAI`,
      description: solution.summary,
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) return notFound();

  const Icon = solutionIcons[solution.slug] ?? Layers;
  const otherSolutions = solutions.filter((s) => s.slug !== slug);

  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative overflow-hidden bg-infra-midnight py-20 text-white">
        <div className="pointer-events-none absolute inset-6">
          <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
        </div>
        <Container className="max-w-3xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-tech-blue/10">
            <Icon size={26} strokeWidth={1.75} className="text-tech-blue" />
          </div>
          <span className="mt-5 block font-technical text-xs uppercase tracking-wide text-tech-blue">
            Solution
          </span>
          <h1 className="mt-2 font-primary text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            {solution.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            {solution.summary}
          </p>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          {/* Overview */}
          <div>
            <h2 className="font-primary text-xl font-semibold text-neutral-900">
              The Challenge
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              {solution.overview}
            </p>
          </div>

          {/* Live code panel */}
          <div className="mt-10">
            <span className="mb-3 flex items-center gap-2 font-technical text-[10px] uppercase tracking-wide text-neutral-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
              Representative Implementation Pattern
            </span>
            <CodeWindow
              filename={solution.snippet.filename}
              language={solution.snippet.language}
              code={solution.snippet.code}
            />
          </div>

          {/* Focus areas */}
          <div className="mt-12">
            <h2 className="flex items-center gap-2 font-primary text-xl font-semibold text-neutral-900">
              <ListChecks size={18} className="text-brand" strokeWidth={1.75} />
              Focus Areas
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {solution.focusAreas.map((f) => (
                <div
                  key={f}
                  className="rounded-lg border border-neutral-300/60 p-4 text-sm leading-relaxed text-neutral-700"
                >
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Proof points */}
          <div className="mt-12">
            <h2 className="flex items-center gap-2 font-primary text-xl font-semibold text-neutral-900">
              <ShieldCheck size={18} className="text-brand" strokeWidth={1.75} />
              Proof Points
            </h2>
            <div className="mt-5 space-y-3">
              {solution.proofPoints.map((p) => (
                <div
                  key={p}
                  className="border-l-2 border-tech-blue pl-4 text-sm leading-relaxed text-neutral-700"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-lg bg-infra-midnight p-8">
            <p className="font-primary text-lg font-semibold text-white">
              Considering {solution.title.toLowerCase()}?
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
              Talk to DTAI about the specific requirements and constraints of
              your project.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-tech-blue px-5 py-2.5 text-sm font-semibold text-infra-midnight transition-colors duration-micro hover:bg-white"
            >
              Contact Us
            </Link>
          </div>

          <RelatedSolutions items={otherSolutions} />
        </Container>
      </section>
    </>
  );
}
