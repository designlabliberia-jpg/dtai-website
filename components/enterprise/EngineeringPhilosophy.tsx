import { Container } from "@/components/layout/Container";

const principles = [
  {
    title: "Build for decades, not demos",
    detail: "Systems are architected for long-term operation and maintenance, not just launch day.",
  },
  {
    title: "Document the reasoning",
    detail: "Every architectural decision is recorded, so systems remain understandable as teams change.",
  },
  {
    title: "Verify before claiming",
    detail: "Capability is demonstrated through working systems and documented methodology, not assertion.",
  },
];

export function EngineeringPhilosophy() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              Engineering Philosophy
            </span>
            <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              How we build matters as much as what we build
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-600">
              DTAI&rsquo;s engineering discipline is the reason institutions
              can rely on what we deliver long after launch.
            </p>
          </div>

          <div className="space-y-8">
            {principles.map((p, i) => (
              <div key={p.title} className="flex gap-5">
                <span className="font-technical text-sm text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-primary text-lg font-semibold text-neutral-900">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {p.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
