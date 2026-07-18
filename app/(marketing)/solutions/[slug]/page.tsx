import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Monitor, Leaf, TreePine, Building2, ShieldAlert, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CodeWindow } from "@/components/enterprise/CodeWindow";
import { RelatedSolutions } from "@/components/enterprise/RelatedSolutions";
import { InteractiveMapDemo } from "@/components/enterprise/InteractiveMapDemo";

const MAP_DATASET_BY_SLUG: Record<string, string> = {
  "gis-spatial-information-systems": "population",
  "gis-mapping-environment": "population",
  "biodiversity-mapping": "biodiversity",
  "water-resource-management": "water",
  "pollution-monitoring": "pollution",
  "disaster-risk-mapping": "disaster",
};
import { solutions, getSolutionBySlug } from "@/lib/solutions-data";

interface CategoryTheme {
  icon: LucideIcon;
  label: string;
  iconBg: string;
  iconColor: string;
  glow: string;
  cardAccentBg: string;
  numberColor: string;
  ctaBg: string;
  ctaHoverBg: string;
  ctaText: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  "digital-technology": {
    icon: Monitor,
    label: "Digital Technology",
    iconBg: "bg-tech-blue/10",
    iconColor: "text-tech-blue",
    glow: "rgba(0,166,255,0.14)",
    cardAccentBg: "bg-tech-blue",
    numberColor: "text-tech-blue",
    ctaBg: "bg-tech-blue",
    ctaHoverBg: "hover:bg-white",
    ctaText: "text-infra-midnight",
  },
  "environmental-technology": {
    icon: Leaf,
    label: "Eco Technology",
    iconBg: "bg-emerald-400/10",
    iconColor: "text-emerald-400",
    glow: "rgba(52,211,153,0.14)",
    cardAccentBg: "bg-emerald-400",
    numberColor: "text-emerald-500",
    ctaBg: "bg-emerald-500",
    ctaHoverBg: "hover:bg-white",
    ctaText: "text-infra-midnight",
  },
  "environmental-consulting": {
    icon: TreePine,
    label: "Environmental Advisory",
    iconBg: "bg-teal-400/10",
    iconColor: "text-teal-400",
    glow: "rgba(45,212,191,0.14)",
    cardAccentBg: "bg-teal-400",
    numberColor: "text-teal-500",
    ctaBg: "bg-teal-500",
    ctaHoverBg: "hover:bg-white",
    ctaText: "text-infra-midnight",
  },
  "smart-city-infrastructure": {
    icon: Building2,
    label: "Smart City & Green Infrastructure",
    iconBg: "bg-violet-400/10",
    iconColor: "text-violet-400",
    glow: "rgba(167,139,250,0.14)",
    cardAccentBg: "bg-violet-400",
    numberColor: "text-violet-500",
    ctaBg: "bg-violet-500",
    ctaHoverBg: "hover:bg-white",
    ctaText: "text-infra-midnight",
  },
  "climate-disaster-management": {
    icon: ShieldAlert,
    label: "Climate & Disaster Management",
    iconBg: "bg-amber-400/10",
    iconColor: "text-amber-400",
    glow: "rgba(251,191,36,0.14)",
    cardAccentBg: "bg-amber-400",
    numberColor: "text-amber-500",
    ctaBg: "bg-amber-500",
    ctaHoverBg: "hover:bg-white",
    ctaText: "text-infra-midnight",
  },
};

const DEFAULT_THEME = CATEGORY_THEMES["digital-technology"];

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

  const primaryCategory = solution.relatedServices?.[0];
  const theme = (primaryCategory && CATEGORY_THEMES[primaryCategory]) || DEFAULT_THEME;
  const Icon = theme.icon;
  const otherSolutions = solutions.filter((s) => s.slug !== slug).slice(0, 4);
  const mapDatasetKey = MAP_DATASET_BY_SLUG[solution.slug];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-infra-midnight pb-28 pt-20 text-white sm:pb-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 15% 20%, ${theme.glow}, transparent 65%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-6">
          <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/20" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/20" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/20" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/20" />
        </div>
        <Container className="relative max-w-3xl">
          <div className={`flex h-14 w-14 items-center justify-center rounded-lg ${theme.iconBg}`}>
            <Icon size={26} strokeWidth={1.75} className={theme.iconColor} />
          </div>
          <span className={`mt-5 block font-technical text-xs uppercase tracking-wide ${theme.iconColor}`}>
            {theme.label}
          </span>
          <h1 className="mt-2 font-primary text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            {solution.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            {solution.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#focus-areas"
              className={`inline-flex items-center gap-2 rounded-md ${theme.ctaBg} px-5 py-2.5 text-sm font-semibold ${theme.ctaText} transition-colors duration-micro ${theme.ctaHoverBg}`}
            >
              View Focus Areas
              <ArrowRight size={15} />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-micro hover:border-white/40"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>

      {/* Numbered focus area cards, overlapping the hero */}
      <Container id="focus-areas" className="relative -mt-16 scroll-mt-24 sm:-mt-20">
        <div className={`grid grid-cols-1 gap-5 ${solution.focusAreas.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {solution.focusAreas.map((f, i) => (
            <div
              key={f}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-lg"
            >
              <span className={`font-technical text-xs ${theme.numberColor}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">{f}</p>
            </div>
          ))}
        </div>
      </Container>

      {mapDatasetKey && <InteractiveMapDemo datasetKey={mapDatasetKey} />}

      <section className="bg-white pb-20 pt-16">
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

          {/* Live code panel — only when real snippet data exists */}
          {solution.snippet && (
            <div className="mt-10">
              <span className="mb-3 flex items-center gap-2 font-technical text-[10px] uppercase tracking-wide text-neutral-400">
                <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${theme.cardAccentBg}`} />
                Representative Implementation Pattern
              </span>
              <CodeWindow
                filename={solution.snippet.filename}
                language={solution.snippet.language}
                code={solution.snippet.code}
              />
            </div>
          )}

          {/* Proof points */}
          {solution.proofPoints.length > 0 && (
            <div className="mt-12">
              <h2 className="font-primary text-xl font-semibold text-neutral-900">
                Proof Points
              </h2>
              <div className="mt-5 space-y-3">
                {solution.proofPoints.map((p) => (
                  <div
                    key={p}
                    className={`border-l-2 pl-4 text-sm leading-relaxed text-neutral-700`}
                    style={{ borderColor: theme.glow.replace("0.14", "0.9") }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

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
              className={`mt-5 inline-flex items-center gap-2 rounded-md ${theme.ctaBg} px-5 py-2.5 text-sm font-semibold ${theme.ctaText} transition-colors duration-micro ${theme.ctaHoverBg}`}
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
