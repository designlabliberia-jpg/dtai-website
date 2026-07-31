import Image from "next/image";
import {
  Lightbulb,
  Code2,
  ShieldCheck,
  Globe,
  LifeBuoy,
  Settings2,
  Award,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Company Overview",
  "Digital Technology Associates Incorporated (DTAI) — a Liberian technology company delivering innovative, secure, and scalable digital solutions across Africa."
);

const whyChooseUs: { text: string; icon: LucideIcon }[] = [
  { text: "Innovative and customer-focused solutions", icon: Lightbulb },
  { text: "Experienced software engineering practices", icon: Code2 },
  { text: "Secure, scalable, and reliable systems", icon: ShieldCheck },
  { text: "Modern technologies and international standards", icon: Globe },
  { text: "Dedicated technical support and maintenance", icon: LifeBuoy },
  { text: "Customized solutions tailored to client needs", icon: Settings2 },
  { text: "Commitment to quality, integrity, and excellence", icon: Award },
];

const coreValues = [
  "Innovation",
  "Integrity",
  "Excellence",
  "Professionalism",
  "Accountability",
  "Customer Satisfaction",
  "Collaboration",
  "Continuous Learning",
  "Security",
  "Social Responsibility",
];

export default function CompanyOverviewPage() {
  return (
    <>
      {/* Full-bleed photo hero */}
      <section className="relative h-72 w-full overflow-hidden sm:h-96">
        <Image
          src="/assets/hero/team-at-work1.jpg"
          alt="The DTAI team at work"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-infra-midnight via-infra-midnight/50 to-transparent" />
        <div className="pointer-events-none absolute inset-6">
          <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/60" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/60" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/60" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/60" />
        </div>
        <Container className="absolute inset-x-0 bottom-0 max-w-3xl pb-8">
          <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
            Company Profile
          </span>
          <h1 className="mt-2 max-w-xl font-primary text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            Transforming Ideas into Digital Solutions
          </h1>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-neutral-600">
              Digital Technology Associates Incorporated (DTAI) is a
              Liberian technology company committed to delivering
              innovative, secure, and scalable digital solutions that
              empower governments, businesses, healthcare institutions,
              non-governmental organizations, and communities across
              Liberia and Africa.
            </p>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              Founded with a vision to accelerate digital transformation,
              DTAI develops modern software applications, enterprise
              information systems, mobile applications, web platforms,
              cloud-based solutions, and digital consulting services that
              improve efficiency, transparency, and service delivery.
            </p>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              Our goal is to bridge the technology gap by designing
              solutions that are practical, affordable, and tailored to the
              unique needs of African institutions and businesses.
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-neutral-300/60 p-6">
                <h2 className="font-technical text-xs uppercase tracking-wide text-brand">
                  Our Vision
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                  To become one of Africa&rsquo;s leading technology
                  companies, delivering world-class digital solutions that
                  transform organizations, improve lives, and drive
                  sustainable development.
                </p>
              </div>
              <div className="rounded-lg border border-neutral-300/60 p-6">
                <h2 className="font-technical text-xs uppercase tracking-wide text-brand">
                  Our Mission
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                  To provide innovative, reliable, and secure technology
                  solutions that help organizations improve productivity,
                  enhance decision-making, and deliver exceptional services
                  through digital transformation.
                </p>
              </div>
            </div>

            <div className="mt-14">
              <h2 className="font-primary text-xl font-semibold text-neutral-900">
                Why Choose DTAI?
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {whyChooseUs.map(({ text, icon: Icon }) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 rounded-lg border border-neutral-300/60 p-4"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand/10">
                      <Icon size={16} strokeWidth={1.75} className="text-brand" />
                    </span>
                    <p className="text-sm leading-relaxed text-neutral-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h2 className="font-primary text-xl font-semibold text-neutral-900">
                Our Core Values
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {coreValues.map((v) => (
                  <span
                    key={v}
                    className="rounded-full border border-neutral-300/60 bg-neutral-50 px-3.5 py-1.5 text-sm font-medium text-neutral-700"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-14 rounded-lg bg-infra-midnight p-8">
              <h2 className="font-technical text-xs uppercase tracking-wide text-titanium-silver">
                Our Commitment
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                At Digital Technology Associates Incorporated, we believe
                technology should solve real-world challenges and create
                lasting value. We are committed to building trusted
                partnerships with our clients by delivering solutions that
                are innovative, secure, efficient, and sustainable.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                Whether supporting digital government, improving healthcare
                delivery, enabling smarter businesses, or developing
                next-generation mobile applications, DTAI is dedicated to
                helping organizations embrace the future with confidence.
              </p>
              <p className="mt-5 font-technical text-sm text-tech-blue">
                Innovating Today. Transforming Tomorrow.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
