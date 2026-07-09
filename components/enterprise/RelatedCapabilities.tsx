import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Capability } from "@/lib/capabilities-data";

interface RelatedCapabilitiesProps {
  items: Capability[];
}

export function RelatedCapabilities({ items }: RelatedCapabilitiesProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-20 border-t border-neutral-300/60 pt-12">
      <span className="font-technical text-xs uppercase tracking-wide text-neutral-500">
        Explore other capabilities
      </span>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((cap) => (
          <Link
            key={cap.slug}
            href={`/capabilities/${cap.slug}`}
            className="group flex items-center justify-between rounded-md border border-neutral-300/60 px-5 py-4 transition-all duration-micro hover:border-tech-blue hover:shadow-sm"
          >
            <span className="text-sm font-medium text-neutral-900 transition-colors duration-micro group-hover:text-brand">
              {cap.title}
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
          href="/capabilities"
          className="font-technical text-xs uppercase tracking-wide text-tech-blue hover:text-brand"
        >
          View all capabilities &rarr;
        </Link>
      </div>
    </div>
  );
}
