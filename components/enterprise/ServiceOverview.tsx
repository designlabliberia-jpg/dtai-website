import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ServiceCardLazy } from "@/components/enterprise/ServiceCardLazy";
import { services } from "@/lib/services-data";
import { ServiceAmbientBackground } from "@/components/enterprise/ServiceAmbientBackground";

export function ServiceOverview() {
  return (
    <section id="services" className="relative overflow-hidden bg-blue-50 py-8">
      <ServiceAmbientBackground />
      <Container className="relative z-10">
        <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
              <span className="h-6 w-1 rounded-full bg-brand" />
              Core Services
              <span className="hidden h-px max-w-[12rem] flex-1 bg-brand sm:block" />
            </p>
            <h3 className="mt-2 font-primary font-semibold tracking-tight text-neutral-900">
              Integrated Solutions for a{" "}
              <span className="text-brand">Digital &amp; Sustainable</span> Future
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <p className="hidden max-w-xs text-sm leading-relaxed text-neutral-500 sm:block sm:text-right">
              Engineering domains DTAI builds and operates across, from software to sustainability.
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 font-technical text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:text-brand/80"
            >
              View All
              <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCardLazy
              key={service.slug}
              title={service.title}
              icon={service.icon}
              description={service.summary}
              href={`/services/${service.slug}`}
              solutionsCount={service.solutions.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
