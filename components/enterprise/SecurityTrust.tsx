import Link from "next/link";
import { Container } from "@/components/layout/Container";

const trustPillars = [
  {
    title: "Security Philosophy",
    detail: "Security is a design input, established before implementation begins — not a post-launch patch.",
    href: "/security-and-governance/philosophy",
  },
  {
    title: "Development Standards",
    detail: "Consistent, documented engineering standards applied across every project, every team.",
    href: "/security-and-governance/development-standards",
  },
  {
    title: "Data Protection",
    detail: "Data handling practices built around the sensitivity of institutional and citizen data.",
    href: "/security-and-governance/data-protection",
  },
  {
    title: "Governance Model",
    detail: "Clear accountability structures for how systems are reviewed, approved, and maintained.",
    href: "/security-and-governance/governance-model",
  },
];

export function SecurityTrust() {
  return (
    <section className="bg-neutral-950 py-24 text-white">
      <Container>
        <div className="mb-14 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
            Security &amp; Governance
          </span>
          <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight md:text-4xl">
            Trust engineered into every layer
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            Institutions entrust DTAI with systems that must withstand
            scrutiny. Our governance model exists to make that trust
            verifiable, not assumed.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {trustPillars.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="group rounded-lg border border-white/10 bg-white/5 p-6 transition-colors duration-standard hover:border-tech-blue"
            >
              <h3 className="font-primary text-lg font-semibold text-white transition-colors duration-micro group-hover:text-tech-blue">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                {pillar.detail}
              </p>
              <span className="mt-4 inline-block font-technical text-xs uppercase tracking-wide text-tech-blue">
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
