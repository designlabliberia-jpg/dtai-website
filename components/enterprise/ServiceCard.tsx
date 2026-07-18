import Link from "next/link";
import { ArrowRight, Monitor, Leaf, TreePine, Building2, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  Monitor,
  Leaf,
  TreePine,
  Building2,
  ShieldAlert,
};

export interface ServiceCardProps {
  title: string;
  icon: string;
  description: string;
  href: string;
  solutionsCount?: number;
}

export function ServiceCard({ title, icon, description, href, solutionsCount }: ServiceCardProps) {
  const Icon = serviceIconMap[icon] ?? Monitor;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-tech-blue hover:shadow-[0_20px_45px_-15px_rgba(0,166,255,0.35)]"
    >
      <div
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-tech-blue transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />

      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-infra-midnight transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand">
          <Icon
            size={20}
            className="text-tech-blue transition-colors duration-300 group-hover:text-white"
            strokeWidth={1.75}
          />
        </div>

        {typeof solutionsCount === "number" && (
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-technical text-[10px] uppercase tracking-wide text-neutral-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {solutionsCount} Solution Areas
          </span>
        )}
      </div>

      <h2 className="mt-5 font-primary text-lg font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-brand">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>

      <span className="mt-4 inline-flex items-center gap-1 font-technical text-xs uppercase tracking-wide text-brand">
        Explore service
        <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </Link>
  );
}
