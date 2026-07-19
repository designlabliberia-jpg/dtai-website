import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ProductCardProps {
  name: string;
  description: string;
  features: string[];
  image: string;
  href: string;
  dark?: boolean;
  index?: number;
}

export function ProductCard({ name, description, features, image, href, dark = false, index = 0 }: ProductCardProps) {
  const imageRight = index % 2 !== 0;
  return (
    <div className={`group relative flex flex-col sm:flex-row overflow-hidden rounded-lg border border-neutral-300/60 ${imageRight ? "sm:flex-row-reverse" : ""} ${dark ? "bg-neutral-950" : "bg-white"}`}>
      {/* Image half */}
      <div className="relative h-48 sm:h-auto sm:w-1/2 shrink-0 overflow-hidden">
        <Image src={image} alt={name} fill loading="lazy" className="object-contain object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
      </div>

      {/* Content half */}
      <div className={`flex sm:w-1/2 flex-col justify-center p-6 sm:p-8 ${imageRight ? "sm:border-r" : "sm:border-l"} border-t sm:border-t-0 ${dark ? "border-neutral-800" : "border-neutral-200"}`}>
        <h3 className={`font-primary text-xl font-semibold leading-tight ${dark ? "text-white" : "text-neutral-900"}`}>
          {name}
        </h3>
        <p className={`mt-4 text-sm leading-relaxed ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
          {description}
        </p>

        {/* Features grid */}
        <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-2">
          {features.map((f) => (
            <div key={f} className={`flex items-center gap-1.5 text-sm ${dark ? "text-white" : "text-neutral-700"}`}>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-tech-blue" />
              {f}
            </div>
          ))}
        </div>

        <Link
          href={href}
          className={`mt-8 inline-flex items-center gap-2 font-technical text-xs uppercase tracking-wide transition-colors ${dark ? "text-white hover:text-tech-blue" : "text-neutral-900 hover:text-brand"}`}
        >
          Learn More <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
