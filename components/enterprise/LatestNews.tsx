import { getInsights } from "@/sanity/lib/insights";
import { NewsGrid } from "@/components/enterprise/NewsGrid";

export async function LatestNews() {
  const insights = await getInsights();
  const latest = insights.slice(0, 4);

  if (latest.length === 0) return null;

  return (
    <section id="blog" className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
         <div className="mb-8 flex items-end justify-between">
            <h1 className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
              <span className="w-1 h-6 bg-brand rounded-full" />
               News & Blogs
              <span className="hidden sm:block w-48 h-px bg-brand" />
            </h1>
            <p className="mt-2 font-primary font-semibold tracking-tight text-neutral-900">
              Latest from DTAI
            </p>
          </div>
        <NewsGrid items={latest} />
      </div>
    </section>
  );
}
