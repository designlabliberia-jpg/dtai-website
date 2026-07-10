import Link from "next/link";
import { Container } from "@/components/layout/Container";

const audiences = [
  {
    label: "Government Executive",
    prompt: "Explore how DTAI supports national platforms.",
    href: "/contact?inquiry=government",
  },
  {
    label: "Technical Director / CIO",
    prompt: "Review our architecture and engineering approach.",
    href: "/contact?inquiry=technical",
  },
  {
    label: "Procurement Officer",
    prompt: "Request documentation and governance details.",
    href: "/contact?inquiry=procurement",
  },
  {
    label: "International Partner",
    prompt: "Discuss collaboration and delivery capability.",
    href: "/contact?inquiry=partner",
  },
];

export function FinalConversion() {
  return (
    <section data-ambient-zone className="bg-infra-midnight py-24 text-white">
      <Container>
        <div className="mb-14 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
            Get in Touch
          </span>
          <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight md:text-4xl">
            Talk to DTAI
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-6 transition-colors duration-standard hover:border-tech-blue"
            >
              <div>
                <h3 className="font-primary text-base font-semibold text-white">
                  {a.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  {a.prompt}
                </p>
              </div>
              <span className="mt-6 inline-block font-technical text-xs uppercase tracking-wide text-tech-blue transition-colors duration-micro">
                Start a conversation &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
