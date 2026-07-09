import { getGovernancePageBySlug } from "@/lib/governance-data";
import { GovernanceNav } from "@/components/enterprise/GovernanceNav";
import { Container } from "@/components/layout/Container";

export default function GovernancePage() {
  const page = getGovernancePageBySlug("philosophy")!;

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <GovernanceNav activeSlug="philosophy" />
          <div className="max-w-2xl">
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              Security &amp; Governance
            </span>
            <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              {page.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              {page.summary}
            </p>
            <ul className="mt-10 space-y-3">
              {page.points.map((pt) => (
                <li key={pt} className="border-l-2 border-tech-blue pl-4 text-sm leading-relaxed text-neutral-700">
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
