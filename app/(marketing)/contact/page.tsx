import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/enterprise/ContactForm";

export const metadata = {
  title: "Contact — DTAI",
  description:
    "Talk to DTAI about government, institutional, or enterprise digital infrastructure.",
};

const channels = [
  {
    icon: Mail,
    label: "General Inquiries",
    value: "info@dtai.example.com", // [PLACEHOLDER] replace with real address
  },
  {
    icon: Phone,
    label: "Direct Line",
    value: "+231 [PLACEHOLDER]",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "[PLACEHOLDER — street address, Monrovia, Liberia]",
  },
];

const audiences = [
  {
    tag: "Government",
    detail:
      "Ministries, agencies, and public institutions evaluating digital infrastructure or engineering partners.",
  },
  {
    tag: "Enterprise",
    detail:
      "Technical directors and CIOs scoping software, cloud, or data platform engagements.",
  },
  {
    tag: "Partners",
    detail:
      "Technology vendors and institutional collaborators exploring a working relationship with DTAI.",
  },
  {
    tag: "Careers",
    detail:
      "Engineers and specialists interested in joining the DTAI team — see Company → Careers.",
  },
];

const steps = [
  { step: "01", title: "Message received", detail: "Routed to the relevant team same day." },
  { step: "02", title: "Initial response", detail: "A DTAI team member replies within 1–2 business days." },
  { step: "03", title: "Scoping call", detail: "We schedule a call to understand your requirements in detail." },
];

export default function ContactPage() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            Contact
          </span>
          <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Talk to DTAI
          </h1>
          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            Tell us about your organization and what you&rsquo;re looking to
            build. A member of our engineering team will respond directly —
            no sales queue, no ticket number.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Info column */}
          <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="font-technical text-xs uppercase tracking-wide text-neutral-500">
                Who this reaches
              </h2>
              <div className="mt-4 space-y-4">
                {audiences.map((a) => (
                  <div
                    key={a.tag}
                    className="rounded-lg border border-neutral-300/60 p-4"
                  >
                    <span className="font-technical text-[11px] uppercase tracking-wide text-tech-blue">
                      {a.tag}
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                      {a.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-technical text-xs uppercase tracking-wide text-neutral-500">
                Direct channels
              </h2>
              <div className="mt-4 space-y-3">
                {channels.map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-infra-midnight">
                      <c.icon size={16} className="text-tech-blue" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="font-technical text-[10px] uppercase tracking-wide text-neutral-500">
                        {c.label}
                      </p>
                      <p className="text-sm font-medium text-neutral-900">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-infra-midnight p-5">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-tech-blue" strokeWidth={1.75} />
                <span className="font-technical text-[10px] uppercase tracking-wide text-titanium-silver">
                  What happens next
                </span>
              </div>
              <div className="mt-4 space-y-4">
                {steps.map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <span className="font-technical text-xs text-tech-blue">{s.step}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{s.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-neutral-400">
                        {s.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="rounded-lg border border-neutral-300/60 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
