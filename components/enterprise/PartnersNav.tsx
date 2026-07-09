import Link from "next/link";
import { partnerCategories } from "@/lib/partners-data";

export function PartnersNav({ activeSlug }: { activeSlug: string }) {
  return (
    <nav className="space-y-1">
      {partnerCategories.map((p) => (
        <Link
          key={p.slug}
          href={`/partners/${p.slug}`}
          className={`block rounded-md px-3 py-2 text-sm transition-colors duration-micro ${
            p.slug === activeSlug
              ? "bg-brand/10 font-medium text-brand"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          {p.title}
        </Link>
      ))}
    </nav>
  );
}
