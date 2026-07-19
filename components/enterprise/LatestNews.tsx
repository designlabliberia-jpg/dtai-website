import { getInsights } from "@/sanity/lib/insights";
import { NewsCarousel } from "@/components/enterprise/NewsCarousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function LatestNews() {
  const insights = await getInsights();
  const latest = insights.slice(0, 4);

  if (latest.length === 0) return null;

  return (
    <section id="blog" className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
              <span className="w-1 h-6 bg-brand rounded-full" />
               News & Blogs
              <span className="hidden sm:block w-48 h-px bg-brand" />
            </p>
            <h3 className="mt-2 font-primary font-semibold tracking-tight text-neutral-900">
              Latest from DTAI
            </h3>
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
