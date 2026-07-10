import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { solutions } from "@/lib/solutions-data";

export const metadata = {
  title: "Solutions — DTAI",
  description: "Digital solutions DTAI builds for governments, institutions, and enterprises.",
};

export default function SolutionsPage() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-14 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            Solutions
          </span>
          <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Purpose-built platforms for institutional needs
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group block rounded-lg border border-neutral-300/60 bg-white p-6 transition-all duration-standard hover:border-tech-blue hover:shadow-md"
            >
              <h2 className="font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {s.summary}
              </p>
              <span className="mt-4 inline-block font-technical text-xs uppercase tracking-wide text-brand">
                View solution &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
