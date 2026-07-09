import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies-data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return notFound();

  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          {cs.industry} Case Study
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {cs.title}
        </h1>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {cs.outcomes.map((o) => (
            <div key={o.label} className="border-l-2 border-tech-blue pl-4">
              <div className="font-technical text-2xl font-semibold text-neutral-900">{o.metric}</div>
              <div className="mt-1 text-sm text-neutral-600">{o.label}</div>
            </div>
          ))}
        </div>

        {[
          ["Challenge", cs.challenge],
          ["Context", cs.context],
          ["Technical Approach", cs.technicalApproach],
          ["Architecture Overview", cs.architectureOverview],
          ["Security Considerations", cs.securityConsiderations],
          ["Lessons Learned", cs.lessonsLearned],
        ].map(([heading, body]) => (
          <div key={heading} className="mt-10">
            <h2 className="font-primary text-xl font-semibold text-neutral-900">{heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">{body}</p>
          </div>
        ))}

        <div className="mt-10">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">Stakeholders</h2>
          <ul className="mt-3 space-y-2">
            {cs.stakeholders.map((s) => (
              <li key={s} className="text-sm text-neutral-700">&bull; {s}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">Implementation Process</h2>
          <ul className="mt-3 space-y-2">
            {cs.implementationProcess.map((s) => (
              <li key={s} className="text-sm text-neutral-700">&bull; {s}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
