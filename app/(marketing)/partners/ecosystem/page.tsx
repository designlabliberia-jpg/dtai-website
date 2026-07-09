import { getPartnerCategoryBySlug } from "@/lib/partners-data";
import { PartnersNav } from "@/components/enterprise/PartnersNav";
import { Container } from "@/components/layout/Container";

export default function PartnersCategoryPage() {
  const category = getPartnerCategoryBySlug("ecosystem")!;

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <PartnersNav activeSlug="ecosystem" />
          <div className="max-w-2xl">
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              Partners
            </span>
            <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              {category.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              {category.summary}
            </p>
            <ul className="mt-10 space-y-3">
              {category.points.map((pt) => (
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
