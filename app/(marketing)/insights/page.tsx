import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { MarketingPageShell } from "@/components/enterprise/MarketingPageShell";
import { getInsights, getReadTimeMinutes, coverImageUrl } from "@/sanity/lib/insights";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "News & Blog",
  "Technical papers, engineering insight, and research from DTAI."
);

export const revalidate = 60;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default async function InsightsPage() {
  const insights = await getInsights();
  const [featured, ...rest] = insights;

  return (
    <MarketingPageShell
      eyebrow="DTAI Engineering Knowledge Platform"
      title="News & Blog"
      subtitle="Engineering perspective from the team building DTAI's systems — not marketing copy."
    >
      {featured && (
        <Link
          href={`/insights/${featured.slug}`}
          className="group relative block overflow-hidden rounded-lg border border-neutral-300/60 bg-infra-midnight transition-all duration-standard hover:border-tech-blue"
        >
          <div className="relative h-56 w-full overflow-hidden sm:h-72">
            <Image
              src={coverImageUrl(featured, 1200)}
              alt={featured.title}
              fill
              className="object-cover opacity-70 transition-opacity duration-standard group-hover:opacity-90"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-infra-midnight via-infra-midnight/40 to-transparent" />
          </div>

          <div className="relative p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-4 top-0">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
            </div>
            <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">{featured.category}</span>
            <h2 className="mt-3 max-w-2xl font-primary text-2xl font-semibold text-white transition-colors duration-micro group-hover:text-tech-blue md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400">{featured.summary}</p>
            <div className="mt-6 flex items-center gap-4 font-technical text-[11px] uppercase tracking-wide text-neutral-500">
              <span>{formatDate(featured.publishDate)}</span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {getReadTimeMinutes(featured)} min read
              </span>
            </div>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rest.map((i) => (
            <Link
              key={i.slug}
              href={`/insights/${i.slug}`}
              className="group block overflow-hidden rounded-lg border border-neutral-300/60 bg-white transition-all duration-standard hover:border-tech-blue hover:shadow-md"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={coverImageUrl(i, 600)}
                  alt={i.title}
                  fill
                  className="object-cover transition-transform duration-standard group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">{i.category}</span>
                <h3 className="mt-2 font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
                  {i.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{i.summary}</p>
                <div className="mt-4 flex items-center gap-3 font-technical text-[10px] uppercase tracking-wide text-neutral-400">
                  <span>{formatDate(i.publishDate)}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {getReadTimeMinutes(i)} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {insights.length === 0 && (
        <p className="text-sm text-neutral-500">No articles published yet.</p>
      )}
    </MarketingPageShell>
  );
}
