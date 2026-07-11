import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Landmark,
  ClipboardCheck,
  Banknote,
  GraduationCap,
  HeartPulse,
  Briefcase,
  ShoppingCart,
  Truck,
  Wheat,
  Palmtree,
  HandHeart,
  Building2,
  Globe2,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { RelatedIndustries } from "@/components/enterprise/RelatedIndustries";
import { IndustryFlow } from "@/components/enterprise/IndustryFlow";
import { industries, getIndustryBySlug } from "@/lib/industries-data";
import { capabilities } from "@/lib/capabilities-data";

const industryIcons: Record<string, LucideIcon> = {
  government: Landmark,
  elections: ClipboardCheck,
  finance: Banknote,
  education: GraduationCap,
  healthcare: HeartPulse,
  enterprise: Briefcase,
  "retail-ecommerce": ShoppingCart,
  "logistics-transportation": Truck,
  "agriculture-agribusiness": Wheat,
  "hospitality-tourism": Palmtree,
  ngos: HandHeart,
  smes: Building2,
  "international-development-partners": Globe2,
};

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return {
    title: industry.title,
    description: industry.summary,
    openGraph: {
      title: `${industry.title} | DTAI`,
      description: industry.summary,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} | DTAI`,
      description: industry.summary,
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) return notFound();

  const Icon = industryIcons[industry.slug] ?? Briefcase;
  const otherIndustries = industries.filter((i) => i.slug !== slug);
  const relatedCaps = capabilities.filter((c) =>
    industry.relatedCapabilities.includes(c.slug)
  );

  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-lg bg-infra-midnight p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-4">
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-tech-blue/10">
            <Icon size={26} strokeWidth={1.75} className="text-tech-blue" />
          </div>
          <span className="mt-5 block font-technical text-xs uppercase tracking-wide text-tech-blue">
            Industry
          </span>
          <h1 className="mt-2 font-primary text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            {industry.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            {industry.summary}
          </p>
        </div>

        {/* Why this matters */}
        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Why This Matters
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {industry.overview}
          </p>
        </div>

        <div className="mt-12">
          <IndustryFlow keyNeeds={industry.keyNeeds} />
        </div>

        {/* Key needs */}
        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            What {industry.title} Organizations Need
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {industry.keyNeeds.map((need) => (
              <div
                key={need}
                className="flex items-start gap-3 rounded-lg border border-neutral-300/60 p-4"
              >
                <CheckCircle2
                  size={18}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-tech-blue"
                />
                <p className="text-sm leading-relaxed text-neutral-700">{need}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How DTAI helps */}
        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            How DTAI Helps
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {industry.approach}
          </p>

          {relatedCaps.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {relatedCaps.map((cap) => (
                <Link
                  key={cap.slug}
                  href={`/capabilities/${cap.slug}`}
                  className="group rounded-md border border-neutral-300/60 p-4 transition-all duration-micro hover:border-tech-blue hover:shadow-sm"
                >
                  <span className="font-technical text-[10px] uppercase tracking-wide text-brand">
                    Capability
                  </span>
                  <p className="mt-1.5 text-sm font-medium text-neutral-900 transition-colors duration-micro group-hover:text-brand">
                    {cap.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-lg bg-infra-midnight p-8">
          <p className="font-primary text-lg font-semibold text-white">
            Working in {industry.title.toLowerCase()}?
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

        <RelatedIndustries items={otherIndustries} />
      </Container>
    </section>
  );
}
