import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CapabilityCard } from "@/components/enterprise/CapabilityCard";
import { capabilities } from "@/lib/capabilities-data";

const featured = capabilities
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, 3);

export function CapabilityOverview() {

  return (
    <section id="capabilities" className="bg-white py-8">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-primary font-semibold tracking-tight text-neutral-900">
            Core Services
          </h2>
          <p className="mt-4 text-neutral-600">
            Engineering excellence across the stack to deliver resilient digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {featured.map((cap) => (
            <CapabilityCard
              key={cap.slug}
              title={cap.title}
              description={cap.summary}
              href={`/capabilities/${cap.slug}`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/capabilities"
            className="group inline-flex items-center gap-2 font-technical text-sm uppercase tracking-wide text-brand transition-colors hover:text-brand/80"
          >
            View all services <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
