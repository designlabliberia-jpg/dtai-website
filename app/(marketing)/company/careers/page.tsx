import Link from "next/link";
import { ShieldCheck, FileText, Clock3, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeroBanner } from "@/components/enterprise/PageHeroBanner";
import { CareersInterestForm } from "@/components/enterprise/CareersInterestForm";

export const metadata = {
  title: "Careers — DTAI",
  description: "Join the engineering team building Africa's digital infrastructure.",
};

const traits: { icon: LucideIcon; title: string; detail: string }[] = [
  {
    icon: FileText,
    title: "Documentation discipline",
    detail: "You write down the reasoning, not just the code — for teammates and successors you'll never meet.",
  },
  {
    icon: ShieldCheck,
    title: "Security-minded by default",
    detail: "You treat security as part of the design, not a checklist item added before launch.",
  },
  {
    icon: Clock3,
    title: "Built for the long term",
    detail: "You think about how a system will be maintained in five years, not just whether it ships this quarter.",
  },
  {
    icon: Users,
    title: "Comfortable with institutional stakes",
    detail: "You understand that outages and errors here affect public services, not just user convenience.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeroBanner
        eyebrow="Company"
        title="Careers"
        subtitle="We're building long-term digital infrastructure for governments, institutions, and enterprises across Africa. That requires engineers, security practitioners, and delivery professionals who take that responsibility seriously."
        icon={Users}
      />

      <section className="bg-white py-24">
        <Container className="max-w-3xl">
          <div>
            <h2 className="font-primary text-lg font-semibold text-neutral-900">
              What we look for
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {traits.map((t) => (
                <div key={t.title} className="rounded-lg border border-neutral-300/60 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-infra-midnight">
                    <t.icon size={16} className="text-tech-blue" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-neutral-900">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="font-primary text-lg font-semibold text-neutral-900">
              Express Interest
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              We don&rsquo;t have specific openings listed right now, but
              we&rsquo;re always interested in hearing from people who fit
              what we look for. Tell us about yourself below, or meet the
              team on{" "}
              <Link href="/company/leadership" className="text-brand underline">
                our Leadership page
              </Link>{" "}
              first.
            </p>
            <div className="mt-6 rounded-lg border border-neutral-300/60 p-6 sm:p-8">
              <CareersInterestForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
