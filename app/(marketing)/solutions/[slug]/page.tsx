import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { solutions, getSolutionBySlug } from "@/lib/solutions-data";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) return notFound();

  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          Solution
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {solution.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-600">
          {solution.summary}
        </p>

        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Focus Areas
          </h2>
          <ul className="mt-4 space-y-3">
            {solution.focusAreas.map((f) => (
              <li key={f} className="border-l-2 border-tech-blue pl-4 text-sm leading-relaxed text-neutral-700">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Proof Points
          </h2>
          <ul className="mt-4 space-y-3">
            {solution.proofPoints.map((p) => (
              <li key={p} className="border-l-2 border-neutral-300 pl-4 text-sm leading-relaxed text-neutral-700">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
