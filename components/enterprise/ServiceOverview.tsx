import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/enterprise/ServiceCard";
import { services } from "@/lib/services-data";

export function ServiceOverview() {
  return (
    <section id="services" className="py-12">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          {/* Left — 40% */}
          <div className="lg:w-[40%] lg:sticky lg:top-24 flex flex-col justify-center">
            <h1 className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
              <span className="w-1 h-6 bg-brand rounded-full" />
              Core Services
              <span className="hidden sm:block w-64 h-px bg-brand" />
            </h1>
            <p className="mt-4 font-primary font-semibold leading-snug tracking-tight text-neutral-900">
              Integrated Solutions for a {" "}
              <span className="text-brand">Digital & Sustainable</span> Future
            </p>
          </div>

          {/* Right — 60% */}
          <div className="lg:w-[60%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  icon={service.icon}
                  description={service.summary}
                  href={`/services/${service.slug}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
