import { Compass } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeroBanner } from "@/components/enterprise/PageHeroBanner";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Engineering Philosophy",
  "How DTAI approaches the engineering of mission-critical digital systems."
);

const principles = [
  {
    title: "Build for decades, not demos",
    detail:
      "Systems are architected for long-term operation and maintenance. A platform that works at launch but cannot be maintained five years later is a liability, not an asset.",
  },
  {
    title: "Document the reasoning",
    detail:
      "Every architectural decision is recorded — not just what was built, but why. This keeps systems understandable as teams and administrations change.",
  },
  {
    title: "Verify before claiming",
    detail:
      "Service is demonstrated through working systems, documented methodology, and measurable outcomes — not through marketing language.",
  },
  {
    title: "Security as a design input",
    detail:
      "Security requirements are established at the architecture stage, not added after implementation. Every deployment is verified against them.",
  },
];

export default function EngineeringPhilosophyPage() {
  return (
    <>
      <PageHeroBanner
        eyebrow="Company"
        title="Engineering Philosophy"
        subtitle="How we build matters as much as what we build. This is the discipline institutions are relying on when they choose DTAI."
        icon={Compass}
      />

      <section className="bg-white py-24">
        <Container className="max-w-3xl">
          <div className="relative">
            <div className="absolute bottom-2 left-[15px] top-2 w-px bg-neutral-200" />
            <div className="space-y-8">
              {principles.map((p, i) => (
                <div key={p.title} className="relative flex gap-5">
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-tech-blue/40 bg-white">
                    <span className="font-technical text-xs text-tech-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h2 className="font-primary text-lg font-semibold text-neutral-900">
                      {p.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                      {p.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
