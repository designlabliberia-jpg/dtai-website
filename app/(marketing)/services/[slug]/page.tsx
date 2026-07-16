import { FadeInImage } from "@/components/enterprise/FadeInImage";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { MethodologyFlow } from "@/components/enterprise/MethodologyFlow";
import { RelatedServices } from "@/components/enterprise/RelatedServices";
import { services, getServiceBySlug } from "@/lib/services-data";

export function generateStaticParams() {
  return services.map((c) => ({ slug: c.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return notFound();
  const otherServices = services.filter((c) => c.slug !== slug);

  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          Service
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {service.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-600">
          {service.summary}
        </p>

        <div className="relative mt-10 w-full aspect-[21/9] overflow-hidden rounded-lg">
          <FadeInImage
            src={`/assets/services/${service.slug}.jpg`}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            quality={70}
            className="object-cover"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(7,24,39,0) 60%, rgba(7,24,39,0.5) 100%)",
            }}
          />
        </div>

        {service.solutions.length > 0 && (
          <div className="mt-10">
            <h2 className="font-primary text-xl font-semibold text-neutral-900">Solutions</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {service.solutions.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Methodology
          </h2>
          <div className="mt-5">
            <MethodologyFlow steps={service.methodology} />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Proof Points
          </h2>
          <ul className="mt-4 space-y-3">
            {service.proofPoints.map((p) => (
              <li
                key={p}
                className="border-l-2 border-neutral-300 pl-4 text-sm leading-relaxed text-neutral-700"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
        <RelatedServices items={otherServices} />
      </Container>
    </section>
  );
}
