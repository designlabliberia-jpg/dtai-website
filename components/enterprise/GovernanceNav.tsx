import Link from "next/link";
import { governancePages } from "@/lib/governance-data";

export function GovernanceNav({ activeSlug }: { activeSlug: string }) {
  return (
    <nav className="space-y-1">
      {governancePages.map((g) => (
        <Link
          key={g.slug}
          href={`/security-and-governance/${g.slug}`}
          className={`block rounded-md px-3 py-2 text-sm transition-colors duration-micro ${
            g.slug === activeSlug
              ? "bg-brand/10 font-medium text-brand"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          {g.title}
        </Link>
      ))}
    </nav>
  );
}
