import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CapabilityCardProps {
  title: string;
  description: string;
  href: string;
}

export function CapabilityCard({ title, description, href }: CapabilityCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-standard hover:-translate-y-1 hover:border-tech-blue hover:shadow-lg">
      <div
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-tech-blue transition-transform duration-standard group-hover:scale-x-100"
        aria-hidden
      />
      <h3 className="font-primary font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
        {title}
      </h3>
      <p className="mt-4 leading-relaxed text-neutral-600">
        {description}
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 font-technical text-xs uppercase tracking-wide text-neutral-900 transition-colors hover:text-brand"
      >
        Learn More <ArrowRight size={14} />
      </Link>
    </div>
  );
}
