import { Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/enterprise/ContactForm";

const channels = [
  { label: "Email Us", value: "info@dtai.com" },
  { label: "Direct Line", value: "+231 [PLACEHOLDER]" },
  { label: "General Inquiries", value: "Randall Street, Gibson Building, Monrovia" },
];

const steps = [
  { step: "01", title: "Message received", detail: "Routed to the relevant team same day." },
  { step: "02", title: "Initial response", detail: "A DTAI team member replies within 1–2 business days." },
  { step: "03", title: "Scoping call", detail: "We schedule a call to understand your requirements in detail." },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-blue-50 py-16 sm:py-24">
      <Container>
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* Form column */}
          <div className="rounded-lg bg-white border border-neutral-300/60 p-6 sm:p-8">
            <div className="max-w-2xl mb-8">
              <p className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
                <span className="w-1 h-6 bg-brand rounded-full" />
                Work With Us
                <span className="hidden sm:block w-64 h-px bg-brand" />
              </p>
              <h3 className="mt-4 font-primary font-bold leading-snug tracking-tight text-neutral-900">
                We want to hear your {" "}
                <span className="text-brand">Big Ideas & Early Thoughts</span> and help optimize your institution.
              </h3>
            </div>
            <ContactForm />
          </div>

          {/* Info column */}
          <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start rounded-2xl overflow-hidden relative bg-[url('/assets/contact.jpg')] bg-cover bg-center">
            <div className="h-48" />
            <div className="relative -mt-6 mx-4 mb-4 rounded-2xl bg-white shadow-md p-6 space-y-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {channels.map((c) => (
                  <div key={c.label} className="flex gap-2">
                    <span className="w-1 shrink-0 bg-brand rounded-full" />
                    <div>
                      <p className="font-technical text-xs font-bold text-neutral-800">{c.label}</p>
                      {c.label === "Email Us" ? (
                        <a href={`mailto:${c.value}`} className="text-sm text-neutral-500 hover:text-brand">{c.value}</a>
                      ) : c.label === "Direct Line" ? (
                        <a href={`tel:${c.value}`} className="text-sm text-neutral-500 hover:text-brand">{c.value}</a>
                      ) : (
                        <p className="text-sm text-neutral-500">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-tech-blue" strokeWidth={1.75} />
                  <span className="font-technical text-[10px] uppercase tracking-wide">What happens next</span>
                </div>
                <div className="space-y-3">
                  {steps.map((s) => (
                    <div key={s.step} className="flex gap-3">
                      <span className="font-technical text-xs text-tech-blue">{s.step}</span>
                      <div>
                        <p className="text-sm font-medium">{s.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
