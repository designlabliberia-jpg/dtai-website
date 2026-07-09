import { Container } from "@/components/layout/Container";
import { MetricsPanel } from "@/components/enterprise/MetricsPanel";

const metrics = [
  { value: "99.9%", label: "Platform uptime target across production systems" },
  { value: "AA", label: "WCAG accessibility compliance standard" },
  { value: "24/7", label: "Monitoring on mission-critical deployments" },
  { value: "Zero", label: "Tolerance policy on unreviewed production changes" },
];

const pillars = [
  {
    title: "Architecture",
    detail: "Every system begins with a documented architecture review before implementation, not after.",
  },
  {
    title: "Security Approach",
    detail: "Security requirements are defined at the design stage and verified at every deployment gate.",
  },
  {
    title: "Engineering Method",
    detail: "Standardized development, testing, and deployment workflows applied consistently across projects.",
  },
];

export function Evidence() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-14 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            Evidence
          </span>
          <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Engineering discipline, not marketing claims
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-lg border border-neutral-300/60 p-6"
            >
              <h3 className="font-primary text-lg font-semibold text-neutral-900">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-neutral-300/60 pt-10">
          <MetricsPanel metrics={metrics} />
        </div>
      </Container>
    </section>
  );
}
