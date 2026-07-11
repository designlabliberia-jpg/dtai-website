import { FadeInImage } from "@/components/enterprise/FadeInImage";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { MethodologyFlow } from "@/components/enterprise/MethodologyFlow";
import { RelatedCapabilities } from "@/components/enterprise/RelatedCapabilities";
import { CodeWindow } from "@/components/enterprise/CodeWindow";
import { capabilities, getCapabilityBySlug } from "@/lib/capabilities-data";

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export default async function CapabilityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const capability = getCapabilityBySlug(slug);
  if (!capability) return notFound();
  const otherCapabilities = capabilities.filter((c) => c.slug !== slug);

  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          Capability
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {capability.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-600">
          {capability.summary}
        </p>

        <div className="relative mt-10 w-full aspect-[21/9] overflow-hidden rounded-lg">
          <FadeInImage
            src={`/assets/capabilities/${capability.slug}.jpg`}
            alt={capability.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            quality={70}
            className="object-cover"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(7,24,39,0) 60%, rgba(7,24,39,0.5) 100%)",
            }}
          />
        </div>

        <div className="mt-6">
          <CodeWindow
            filename={capability.codeFilename}
            language={capability.codeLang}
            code={capability.codeSnippet}
          />
        </div>

        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Methodology
          </h2>
          <div className="mt-5">
            <MethodologyFlow steps={capability.methodology} />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="font-primary text-xl font-semibold text-neutral-900">
            Proof Points
          </h2>
          <ul className="mt-4 space-y-3">
            {capability.proofPoints.map((p) => (
              <li
                key={p}
                className="border-l-2 border-neutral-300 pl-4 text-sm leading-relaxed text-neutral-700"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
        <RelatedCapabilities items={otherCapabilities} />
      </Container>
    </section>
  );
}
