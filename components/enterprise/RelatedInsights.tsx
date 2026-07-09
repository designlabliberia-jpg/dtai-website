import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Insight } from "@/lib/insights-data";

interface RelatedInsightsProps {
  items: Insight[];
}

export function RelatedInsights({ items }: RelatedInsightsProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-20 border-t border-neutral-300/60 pt-12">
      <span className="font-technical text-xs uppercase tracking-wide text-neutral-500">
        More from DTAI
      </span>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((insight) => (
          <Link
            key={insight.slug}
            href={`/insights/${insight.slug}`}
            className="group flex items-center justify-between rounded-md border border-neutral-300/60 px-5 py-4 transition-all duration-micro hover:border-tech-blue hover:shadow-sm"
          >
            <span className="text-sm font-medium text-neutral-900 transition-colors duration-micro group-hover:text-brand">
              {insight.title}
            </span>
            <ArrowRight
              size={16}
              className="shrink-0 text-neutral-400 transition-all duration-micro group-hover:translate-x-1 group-hover:text-tech-blue"
              strokeWidth={1.75}
            />
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/insights"
          className="font-technical text-xs uppercase tracking-wide text-tech-blue hover:text-brand"
        >
          View all insights &rarr;
        </Link>
      </div>
    </div>
  );
}
