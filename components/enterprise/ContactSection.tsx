import React from "react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/enterprise/ContactForm";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SocialIconLink, FacebookIcon, LinkedInIcon } from "@/components/enterprise/SocialIconLink";

interface ContactInfo {
  contactEmail: string | null;
  directLine: string | null;
  whatsappNumber: string | null;
  facebookUrl: string | null;
  linkedinUrl: string | null;
  web3formsKey: string | null;
}

export function ContactSection({ info }: { readonly info?: ContactInfo | null }) {
  const channels = [
    ...(info?.contactEmail ? [{ icon: Mail, label: "Email Us", value: info.contactEmail, href: `mailto:${info.contactEmail}` }] : []),
    ...(info?.directLine ? [{ icon: Phone, label: "Direct Line", value: info.directLine, href: `tel:${info.directLine}` }] : []),
    { icon: MapPin, label: "General Inquiries", value: "Randall Street, Gibson Building, Monrovia", href: null },
  ];

  const socials = [
    ...(info?.whatsappNumber ? [{ icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${info.whatsappNumber.replace(/\D/g, "")}`, color: "#25D366" }] : []),
    ...(info?.facebookUrl ? [{ icon: FacebookIcon as React.ElementType, label: "Facebook", href: info.facebookUrl, color: "#1877F2" }] : []),
    ...(info?.linkedinUrl ? [{ icon: LinkedInIcon as React.ElementType, label: "LinkedIn", href: info.linkedinUrl, color: "#0A66C2" }] : []),
    ...(info?.contactEmail ? [{ icon: Mail, label: "Email", href: `mailto:${info.contactEmail}`, color: "#6B7280" }] : []),
  ];

  return (
    <section id="contact" className="py-8 sm:py-12">
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
            <ContactForm web3formsKey={info?.web3formsKey ?? undefined} />
          </div>

          {/* Info column */}
          <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start rounded-2xl overflow-hidden relative bg-[url('/assets/contact.jpg')] bg-cover bg-center">
            <div className="h-84" />
            <div className="relative -mt-6 mx-4 mb-4 rounded-2xl bg-white shadow-md p-6 space-y-6">
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