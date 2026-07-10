import Link from "next/link";
import { Container } from "@/components/layout/Container";

const focusAreas = [
  {
    label: "Public Systems",
    detail: "Core platforms that government agencies depend on for daily service delivery.",
  },
  {
    label: "Election Technology",
    detail: "End-to-end technical workflows from polling station to verified results.",
  },
  {
    label: "National Platforms",
    detail: "Infrastructure built to operate reliably at a national scale, under scrutiny.",
  },
];

export function GovernmentTechnology() {
  return (
    <section data-ambient-zone className="bg-neutral-950 py-24 text-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
              Government Technology
            </span>
            <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight md:text-4xl">
              Built for institutions that cannot afford to fail
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-300">
              DTAI engineers systems for environments where reliability,
              auditability, and security are not optional features &mdash;
              they are the requirement. Every government-facing platform is
              built with a documented methodology, not assembled from
              off-the-shelf assumptions.
            </p>
            <Link
              href="/solutions/government-technology"
              className="mt-8 inline-block rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors duration-micro hover:border-tech-blue hover:text-tech-blue"
            >
              View Government Technology Solutions
            </Link>
          </div>

          <div className="space-y-4">
            {focusAreas.map((area) => (
              <div
                key={area.label}
                className="rounded-lg border border-white/10 bg-white/5 p-6"
              >
                <h3 className="font-technical text-sm uppercase tracking-wide text-tech-blue">
                  {area.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  {area.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
