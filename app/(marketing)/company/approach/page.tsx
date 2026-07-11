import { Container } from "@/components/layout/Container";
import { ProcessTimeline } from "@/components/enterprise/ProcessTimeline";

export const metadata = {
  title: "Our Approach — DTAI",
  description: "How DTAI delivers digital infrastructure projects from requirements to long-term operation.",
};

const steps = [
  { title: "Requirements & Context", detail: "Understand the institutional, operational, and regulatory context before any design begins." },
  { title: "Architecture & Review", detail: "Document the technical architecture and subject it to review before implementation." },
  { title: "Build & Verify", detail: "Implement against documented standards, with security and testing gates at each stage." },
  { title: "Deploy & Operate", detail: "Deploy with monitoring, documentation, and handover in place from day one." },
  { title: "Maintain & Evolve", detail: "Support long-term operation and evolution as institutional needs change." },
];

export default function OurApproachPage() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              Company
            </span>
            <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              Our Approach
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              A consistent delivery process applied across every engagement,
              regardless of project size or sector.
            </p>

            <div className="mt-10">
              <ProcessTimeline steps={steps} />
            </div>
          </div>
      </Container>
    </section>
  );
}
