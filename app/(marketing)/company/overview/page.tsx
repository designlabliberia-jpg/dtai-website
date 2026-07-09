import { Server, Landmark, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CompanyNav } from "@/components/enterprise/CompanyNav";

export const metadata = {
  title: "Company Overview — DTAI",
  description: "Digital Technology Associates Inc. — an African engineering company building mission-critical digital infrastructure.",
};

const roles: { icon: LucideIcon; title: string }[] = [
  { icon: Server, title: "Digital Infrastructure Builder" },
  { icon: Landmark, title: "Government Technology Partner" },
  { icon: Building2, title: "Enterprise Systems Engineering Company" },
];

export default function CompanyOverviewPage() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <CompanyNav activeSlug="overview" />
          <div className="max-w-2xl">
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              Company
            </span>
            <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              Digital Technology Associates Inc.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              DTAI is an African-owned engineering company building secure,
              scalable, mission-critical digital systems for governments,
              institutions, and enterprises.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {roles.map((r) => (
                <div
                  key={r.title}
                  className="flex items-center gap-3 rounded-md border border-neutral-300/60 px-4 py-3"
                >
                  <r.icon size={16} className="shrink-0 text-tech-blue" strokeWidth={1.75} />
                  <span className="text-sm font-medium text-neutral-800">{r.title}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-base leading-relaxed text-neutral-600">
              Our work spans election technology, public sector platforms,
              spatial systems, and custom institutional software &mdash;
              each built on the same engineering discipline: document the
              architecture, verify the security, and build for decades of
              operation, not a single launch.
            </p>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              DTAI remains authentically African and sovereign in how it
              builds, while holding itself to engineering standards
              recognized internationally.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
