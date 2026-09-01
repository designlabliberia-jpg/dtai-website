import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { SocialIconLink, FacebookIcon, LinkedInIcon } from "@/components/enterprise/SocialIconLink";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/enterprise/ContactForm";
import { createPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata = createPageMetadata(
  "Contact",
  "Talk to DTAI about government, institutional, or enterprise digital infrastructure."
);



export default async function ContactPage() {
  const s = await getSiteSettings();

  const channels = [
    ...(s?.contactEmail ? [{ icon: Mail, label: "Email Us", value: s.contactEmail, href: `mailto:${s.contactEmail}` }] : []),
    { icon: null, label: "General Inquiries", value: "Randall Street, Gibson Building, Monrovia Liberia", href: null },
  ];

  const socials = [
    ...(s?.whatsappNumber ? [{ icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${s.whatsappNumber.replace(/\D/g, "")}`, color: "#25D366" }] : []),
    ...(s?.facebookUrl ? [{ icon: FacebookIcon as React.ElementType, label: "Facebook", href: s.facebookUrl, color: "#1877F2" }] : []),
    ...(s?.linkedinUrl ? [{ icon: LinkedInIcon as React.ElementType, label: "LinkedIn", href: s.linkedinUrl, color: "#0A66C2" }] : []),
    ...(s?.contactEmail ? [{ icon: Mail, label: "Email", href: `mailto:${s.contactEmail}`, color: "#6B7280" }] : []),
  ];

  return (
    <section className="bg-white py-24">
      <Container>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* Form column */}
          <div className="rounded-lg border border-neutral-300/60 p-6 sm:p-8">
            <div className="max-w-2xl mb-8">
              <p className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
                <span className="w-1 h-6 bg-brand rounded-full" />
                Work With Us
                <span className="w-64 h-px bg-brand" />
              </p>
              <h3 className="mt-4 font-primary font-bold leading-snug tracking-tight text-neutral-900">
                We want to hear your{" "}
                <span className="text-brand">Big Ideas & Early Thoughts</span> and help optimize your institution.
              </h3>
            </div>


            <ContactForm web3formsKey={s?.web3formsKey} />
          </div>

          {/* Info column */}
          <div className="lg:sticky lg:top-28 lg:self-start rounded-2xl overflow-hidden relative bg-[url('/assets/contact.jpg')] bg-cover bg-center">
            {/* spacer so card sits in lower portion */}
            <div className="h-48" />

            {/* Floating white card */}
            <div className="relative -mt-6 mx-4 mb-4 rounded-2xl bg-white shadow-md p-6 space-y-6">
              {/* Channels grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {channels.map((c) => (
                  <div key={c.label} className="flex gap-2">
                    <span className="w-1 shrink-0 bg-brand rounded-full" />
                    <div>
                      <p className="font-technical text-xs font-bold text-neutral-800">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-neutral-500 hover:text-brand break-all">{c.value}</a>
                      ) : (
                        <p className="text-sm text-neutral-500">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social icons */}
              {socials.length > 0 && (
                <div className="flex items-center gap-3">
                  {socials.map(({ icon: Icon, label, href, color }) => (
                    <SocialIconLink key={label} href={href} label={label} color={color}>
                      <Icon size={16} />
                    </SocialIconLink>
                  ))}
                </div>
              )}


            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
