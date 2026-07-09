import Link from "next/link";

interface CapabilityCardProps {
  title: string;
  description: string;
  href: string;
}

export function CapabilityCard({ title, description, href }: CapabilityCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-standard hover:border-tech-blue hover:shadow-md"
    >
      <h3 className="font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>
      <span className="mt-4 inline-block font-technical text-xs uppercase tracking-wide text-tech-blue">
        View capability &rarr;
      </span>
    </Link>
  );
}
