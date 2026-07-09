import Link from "next/link";
import { Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { insights, getReadTimeMinutes } from "@/lib/insights-data";

export const metadata = {
  title: "DTAI Engineering Knowledge Platform",
  description: "Technical papers, engineering insight, and research from DTAI.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightsPage() {
  const [featured, ...rest] = insights;

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-14 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            DTAI Engineering Knowledge Platform
          </span>
          <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Insights &amp; Research
          </h1>
          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            Engineering perspective from the team building DTAI&rsquo;s
            systems — not marketing copy.
          </p>
        </div>

        {featured && (
          <Link
            href={`/insights/${featured.slug}`}
            className="group relative block overflow-hidden rounded-lg border border-neutral-300/60 bg-infra-midnight p-8 transition-all duration-standard hover:border-tech-blue sm:p-10"
          >
            <div className="pointer-events-none absolute inset-4">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
            </div>

            <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
              {featured.category}
            </span>
            <h2 className="mt-3 max-w-2xl font-primary text-2xl font-semibold text-white transition-colors duration-micro group-hover:text-tech-blue md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400">
              {featured.summary}
            </p>
            <div className="mt-6 flex items-center gap-4 font-technical text-[11px] uppercase tracking-wide text-neutral-500">
              <span>{formatDate(featured.publishDate)}</span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {getReadTimeMinutes(featured)} min read
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {rest.map((i) => (
              <Link
                key={i.slug}
                href={`/insights/${i.slug}`}
                className="group block rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-standard hover:border-tech-blue hover:shadow-md"
              >
                <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
                  {i.category}
                </span>
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
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
