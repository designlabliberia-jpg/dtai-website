import Link from "next/link";
import { ShoppingBag, HeartPulse, Vote, UserCheck } from "lucide-react";
import { MarketingPageShell } from "@/components/enterprise/MarketingPageShell";
import { ProductStatusBadge } from "@/components/enterprise/ProductStatusBadge";
import { products } from "@/lib/products-data";

const ICONS = {
  libgo: ShoppingBag,
  hospital: HeartPulse,
  "election-results": Vote,
  "party-agent": UserCheck,
};

export const metadata = {
  title: "Products — DTAI",
  description: "DTAI's flagship digital products, built for governments, institutions, and everyday life.",
};

export default function ProductsPage() {
  return (
    <MarketingPageShell
      eyebrow="Products"
      title="Our flagship digital solutions"
      subtitle="DTAI develops and operates its own portfolio of digital products, alongside custom platforms built for clients. As we grow, this portfolio continues to expand into education, agriculture, finance, public administration, logistics, and smart city initiatives."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {products.map((p) => {
          const Icon = ICONS[p.iconKey];
          return (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group block overflow-hidden rounded-lg border border-neutral-300/60 bg-white transition-all duration-standard hover:-translate-y-1 hover:border-tech-blue hover:shadow-lg"
            >
              <div className="relative flex h-40 items-center justify-center bg-infra-midnight">
                <div className="pointer-events-none absolute inset-3">
                  <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-tech-blue/40" />
                  <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-tech-blue/40" />
                  <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-tech-blue/40" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-tech-blue/40" />
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-tech-blue/15 transition-colors duration-standard group-hover:bg-brand">
                  <Icon size={26} className="text-tech-blue transition-colors duration-standard group-hover:text-white" strokeWidth={1.5} />
                </div>
                <div className="absolute right-3 top-3">
                  <ProductStatusBadge status={p.status} />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
                  {p.name}
                </h3>
                <p className="mt-1.5 font-technical text-xs uppercase tracking-wide text-tech-blue">
                  {p.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.features.slice(0, 4).map((f) => (
                    <span key={f} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
                      {f}
                    </span>
                  ))}
                  {p.features.length > 4 && (
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500">
                      +{p.features.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </MarketingPageShell>
  );
}
