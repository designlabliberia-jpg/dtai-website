"use client";

import Link from "next/link";
import { ArrowRight, Monitor, Leaf, TreePine, Building2, ShieldAlert } from "lucide-react";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <div className="group border-b border-neutral-200 last:border-b-0 transition-all duration-300">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lg:pointer-events-none w-full flex items-center gap-3 px-4 py-4 text-left"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
          <Icon size={18} />
        </span>
        <span className="font-primary font-bold group-hover:text-brand transition-colors duration-150 flex-1">
          {title}
        </span>
        <ArrowRight
          size={14}
          className={`lg:hidden text-brand transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>

      {/* Desktop: hover-driven expand */}
      <div className="hidden lg:grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
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

      {/* Mobile: click-driven expand */}
      <div className={`lg:hidden grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="px-4 pb-5 pt-1">
            <p className="text-sm leading-relaxed text-neutral-600">{description}</p>
            <Link
              href={href}
              className="mt-3 inline-flex items-center gap-1.5 font-technical text-xs uppercase tracking-wide text-brand hover:text-brand/80 transition-colors"
            >
              Learn more <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
