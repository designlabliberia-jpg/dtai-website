import Link from "next/link";
import {
  Landmark, ClipboardCheck, Banknote, GraduationCap, HeartPulse,
  Briefcase, ShoppingCart, Truck, Wheat, Palmtree, HandHeart, Building2, Globe2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeroBanner } from "@/components/enterprise/PageHeroBanner";
import { industries } from "@/lib/industries-data";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Industries",
  "Industries DTAI builds and operates digital systems for."
);

const industryIcons: Record<string, LucideIcon> = {
  government: Landmark,
  elections: ClipboardCheck,
  finance: Banknote,
  education: GraduationCap,
  healthcare: HeartPulse,
  enterprise: Briefcase,
  "retail-ecommerce": ShoppingCart,
  "logistics-transportation": Truck,
  "agriculture-agribusiness": Wheat,
  "hospitality-tourism": Palmtree,
  ngos: HandHeart,
  smes: Building2,
  "international-development-partners": Globe2,
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeroBanner
        eyebrow="Industries"
        title="Sectors we build for"
        subtitle="Every sector has different constraints — regulatory, operational, or infrastructural. We design systems around the realities of each one, not a one-size-fits-all template."
        icon={Globe2}
      />
      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => {
              const Icon = industryIcons[ind.slug] ?? Briefcase;
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="group relative block overflow-hidden rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-standard hover:-translate-y-1 hover:border-tech-blue hover:shadow-lg"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-tech-blue transition-transform duration-standard group-hover:scale-x-100" aria-hidden />
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-infra-midnight transition-colors duration-standard group-hover:bg-brand">
                    <Icon size={20} className="text-tech-blue transition-colors duration-standard group-hover:text-white" strokeWidth={1.75} />
                  </div>
                  <h2 className="mt-5 font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
                    {ind.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{ind.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-technical text-xs uppercase tracking-wide text-brand">
                    View industry
                    <span className="transition-transform duration-micro group-hover:translate-x-1">&rarr;</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
