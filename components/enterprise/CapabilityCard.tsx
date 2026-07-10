import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface CapabilityCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function CapabilityCard({ title, description, href, icon: Icon }: CapabilityCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-standard hover:-translate-y-1 hover:border-tech-blue hover:shadow-lg"
    >
      <div
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-tech-blue transition-transform duration-standard group-hover:scale-x-100"
        aria-hidden
      />
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-infra-midnight transition-colors duration-standard group-hover:bg-brand">
        <Icon size={20} className="text-tech-blue transition-colors duration-standard group-hover:text-white" strokeWidth={1.75} />
      </div>

      <h3 className="mt-5 font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 font-technical text-xs uppercase tracking-wide text-brand">
        View capability
        <span className="transition-transform duration-micro group-hover:translate-x-1">&rarr;</span>
      </span>
    </Link>
  );
}
