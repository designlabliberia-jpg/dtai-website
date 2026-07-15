import { getInsights } from "@/sanity/lib/insights";
import { NewsCarousel } from "@/components/enterprise/NewsCarousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function LatestNews() {
  const insights = await getInsights();
  const latest = insights.slice(0, 4);

  if (latest.length === 0) return null;

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              DTAI News & Blog
            </span>
            <h2 className="mt-2 font-primary font-semibold tracking-tight text-neutral-900">
              Latest from DTAI
            </h2>
          </div>
          <Link href="/insights"
            className="hidden font-technical text-xs uppercase tracking-wide text-tech-blue hover:text-brand sm:block"
          >
            View all News<ArrowRight className="inline-block h-3 w-3" />
          </Link>
        </div>

        <NewsCarousel items={latest} />
      </div>
    </section>
  );
}
