"use client";

import Link from "next/link";
import { ArrowRight, Monitor, Leaf, TreePine, Building2, ShieldAlert } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
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
}

export function ServiceCard({ title, icon, description, href }: ServiceCardProps) {
  const Icon = iconMap[icon] ?? Monitor;

  return (
    <div className="group border-b border-neutral-200 last:border-b-0 transition-all duration-300">
      <div className="flex items-center gap-3 px-4 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
          <Icon size={18} />
        </span>
        <span className="font-primary font-bold group-hover:text-brand transition-colors duration-150">
          {title}
        </span>
      </div>

      <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="px-4 pb-5 pt-1">
            <p className="text-sm leading-relaxed text-neutral-600">{description}</p>
            <Link
              href={href}
              className="mt-3 inline-flex items-center gap-1.5 font-technical text-xs uppercase tracking-wide text-brand hover:text-brand/80 transition-colors"
            >
              Learn more <ArrowRight size={12} className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
