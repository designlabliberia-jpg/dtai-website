import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { LikeButton } from "@/components/enterprise/LikeButton";
import { Container } from "@/components/layout/Container";
import { RelatedInsights } from "@/components/enterprise/RelatedInsights";
import { getInsights, getInsightBySlug, getReadTimeMinutes, coverImageUrl } from "@/sanity/lib/insights";
import { services } from "@/lib/services-data";

export const revalidate = 60;

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.summary,
    authors: [{ name: insight.author }],
    openGraph: {
      title: insight.title,
      description: insight.summary,
      type: "article",
      publishedTime: insight.publishDate,
      authors: [insight.author],
      images: [coverImageUrl(insight, 1200)],
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: insight.summary,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return notFound();

  const allInsights = await getInsights();
  const otherInsights = allInsights.filter((i) => i.slug !== slug);
  const relatedCaps = services.filter((c) =>
    (insight.relatedCapabilities ?? []).includes(c.slug)
  );

  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          {insight.category}
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {insight.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 font-technical text-xs uppercase tracking-wide text-neutral-500">
          <span>{insight.author}</span>
          <span className="text-neutral-300">&middot;</span>
          <span>{formatDate(insight.publishDate)}</span>
          <span className="text-neutral-300">&middot;</span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {getReadTimeMinutes(insight)} min read
          </span>
        </div>

        <div className="mt-6">
          <LikeButton slug={insight.slug} initialLikes={insight.likes ?? 0} />
        </div>

        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-lg sm:h-96">
          <Image
            src={coverImageUrl(insight, 1200)}
            alt={insight.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <p className="mt-8 text-lg leading-relaxed text-neutral-600">
          {insight.summary}
        </p>

        <div className="mt-10 space-y-8">
          {insight.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-primary text-xl font-semibold text-neutral-900">
                  {section.heading}
                </h2>
              )}
              <p className={`text-base leading-relaxed text-neutral-700 ${section.heading ? "mt-3" : ""}`}>
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {relatedCaps.length > 0 && (
          <div className="mt-12 rounded-lg border border-neutral-300/60 p-6">
            <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-500">
              Related Capabilities
            </span>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedCaps.map((ser) => (
                <Link
                  key={ser.slug}
                  href={`/services/${ser.slug}`}
                  className="rounded-full border border-neutral-300/60 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition-colors duration-micro hover:border-tech-blue hover:text-brand"
                >
                  {ser.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 rounded-lg bg-infra-midnight p-8">
          <p className="font-primary text-lg font-semibold text-white">
            Want to discuss this with our team?
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
            Talk to DTAI about how these engineering principles apply to
            your project.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-tech-blue px-5 py-2.5 text-sm font-semibold text-infra-midnight transition-colors duration-micro hover:bg-white"
          >
            Talk to DTAI
          </Link>
        </div>

        <RelatedInsights items={otherInsights} />
      </Container>
    </section>
  );
}
