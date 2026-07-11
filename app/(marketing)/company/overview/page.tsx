import { Container } from "@/components/layout/Container";
import { CompanyNav } from "@/components/enterprise/CompanyNav";

export const metadata = {
  title: "Company Overview — DTAI",
  description:
    "Digital Technology Associates Incorporated (DTAI) — a Liberian technology company delivering innovative, secure, and scalable digital solutions across Africa.",
};

const whyChooseUs = [
  "Innovative and customer-focused solutions",
  "Experienced software engineering practices",
  "Secure, scalable, and reliable systems",
  "Modern technologies and international standards",
  "Dedicated technical support and maintenance",
  "Customized solutions tailored to client needs",
  "Commitment to quality, integrity, and excellence",
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
    <section className="bg-white py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <CompanyNav activeSlug="overview" />

          <div className="max-w-2xl">
            <span className="font-technical text-xs uppercase tracking-wide text-brand">
              Company Profile
            </span>
            <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              Transforming Ideas into Digital Solutions
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
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
              <ul className="mt-5 space-y-3">
                {whyChooseUs.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-tech-blue pl-4 text-sm leading-relaxed text-neutral-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <h2 className="font-primary text-xl font-semibold text-neutral-900">
                Our Core Values
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {coreValues.map((v) => (
                  <span
                    key={v}
                    className="rounded-full bg-neutral-100 px-3.5 py-1.5 text-sm font-medium text-neutral-700"
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
        </div>
      </Container>
    </section>
  );
}
