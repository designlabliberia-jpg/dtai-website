import Link from "next/link";
import { ShieldCheck, FileText, Clock3, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CompanyNav } from "@/components/enterprise/CompanyNav";

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
    <section className="bg-white py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <CompanyNav activeSlug="careers" />
          <div className="max-w-2xl">
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              Company
            </span>
            <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              Careers
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              We&rsquo;re building long-term digital infrastructure for
              governments, institutions, and enterprises across Africa. That
              requires engineers, security practitioners, and delivery
              professionals who take that responsibility seriously.
            </p>

            <div className="mt-12">
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

            <div className="mt-12 rounded-lg border border-neutral-300/60 bg-neutral-50 p-8">
              <p className="text-sm text-neutral-600">
                Current openings will be listed here. In the meantime, meet
                the team on{" "}
                <Link href="/company/leadership" className="text-brand underline">
                  our Leadership page
                </Link>{" "}
                and reach out through our{" "}
                <Link href="/contact" className="text-brand underline">
                  contact page
                </Link>{" "}
                to introduce yourself.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
