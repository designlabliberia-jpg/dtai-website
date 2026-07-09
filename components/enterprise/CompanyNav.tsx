import Link from "next/link";
import {
  Building2,
  Users,
  Compass,
  Workflow,
  Briefcase,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const companyPages: { slug: string; title: string; icon: LucideIcon }[] = [
  { slug: "overview", title: "Overview", icon: Building2 },
  { slug: "leadership", title: "Leadership", icon: Users },
  { slug: "engineering-philosophy", title: "Engineering Philosophy", icon: Compass },
  { slug: "approach", title: "Our Approach", icon: Workflow },
  { slug: "careers", title: "Careers", icon: Briefcase },
];

export function CompanyNav({ activeSlug }: { activeSlug: string }) {
  return (
    <nav className="lg:sticky lg:top-28 lg:self-start">
      <span className="block font-technical text-[10px] uppercase tracking-wide text-neutral-400">
        Company
      </span>
      <div className="mt-3 space-y-1">
        {companyPages.map((p) => {
          const active = p.slug === activeSlug;
          const Icon = p.icon;
          return (
            <Link
              key={p.slug}
              href={`/company/${p.slug}`}
              className={`group flex items-center gap-2.5 rounded-md border-l-2 px-3 py-2.5 text-sm transition-colors duration-micro ${
                active
                  ? "border-tech-blue bg-brand/5 font-medium text-brand"
                  : "border-transparent text-neutral-600 hover:border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              <Icon
                size={15}
                strokeWidth={1.75}
                className={active ? "text-tech-blue" : "text-neutral-400 group-hover:text-neutral-600"}
              />
              {p.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
