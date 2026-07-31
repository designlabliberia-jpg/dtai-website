import { Container } from "@/components/layout/Container";
import { ServiceCardLazy } from "@/components/enterprise/ServiceCardLazy";
import { services } from "@/lib/services-data";

export function ServiceOverview() {
  return (
    <section id="services" className="bg-blue-50 py-24">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          {/* Left — 40% */}
          <div className="lg:w-[40%] lg:sticky lg:top-24 flex flex-col justify-center">
            <p className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
              <span className="w-1 h-6 bg-brand rounded-full" />
              Core Services
              <span className="hidden sm:block w-64 h-px bg-brand" />
            </p>
            <h3 className="mt-4 font-primary font-semibold leading-snug tracking-tight text-neutral-900">
              Integrated Solutions for a {" "}
              <span className="text-brand">Digital & Sustainable</span> Future
            </h3>
          </div>

          {/* Right — 60% */}
          <div className="lg:w-[60%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <ServiceCardLazy
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
