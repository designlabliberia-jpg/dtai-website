import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { RelatedIndustries } from "@/components/enterprise/RelatedIndustries";
import { industries, getIndustryBySlug } from "@/lib/industries-data";
import { capabilities } from "@/lib/capabilities-data";

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

  const otherIndustries = industries.filter((i) => i.slug !== slug);
  const relatedCaps = capabilities.filter((c) =>
    industry.relatedCapabilities.includes(c.slug)
  );

  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          Industry
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {industry.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-600">
          {industry.summary}
        </p>

        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Key Needs
          </h2>
          <ul className="mt-4 space-y-3">
            {industry.keyNeeds.map((k) => (
              <li key={k} className="border-l-2 border-tech-blue pl-4 text-sm leading-relaxed text-neutral-700">
                {k}
              </li>
            ))}
          </ul>
        </div>

        {relatedCaps.length > 0 && (
          <div className="mt-12">
            <h2 className="font-primary text-xl font-semibold text-neutral-900">
              How DTAI Addresses This
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Capabilities most relevant to {industry.title.toLowerCase()} engagements.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          </div>
        )}

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
            Talk to DTAI
          </Link>
        </div>

        <RelatedIndustries items={otherIndustries} />
      </Container>
    </section>
  );
}
