import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
import { FacebookIcon, LinkedInIcon } from "@/components/enterprise/SocialIconLink";
import { Container } from "./Container";
import { HashLink } from "./HashLink";
import { siteConfig } from "@/lib/seo";
import { services, companyLinks } from "@/lib/services-data";

interface SiteSettings {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  contactEmail: string;
  whatsappNumber: string | null;
  facebookUrl: string | null;
  linkedinUrl: string | null;
}

function buildSocialLinks(s: SiteSettings) {
  const links: { icon: string; label: string; href: string }[] = [];
  if (s.whatsappNumber) links.push({ icon: "MessageCircle", label: "WhatsApp", href: `https://wa.me/${s.whatsappNumber.replace(/\D/g, "")}` });
  links.push({ icon: "Mail", label: "Email", href: `mailto:${s.contactEmail}` });
  if (s.facebookUrl) links.push({ icon: "Facebook", label: "Facebook", href: s.facebookUrl });
  if (s.linkedinUrl) links.push({ icon: "LinkedIn", label: "LinkedIn", href: s.linkedinUrl });
  return links;
}

const socialIconMap: Record<string, React.ElementType> = {
  MessageCircle: WhatsAppIcon,
  Mail,
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
};

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const name = settings?.name ?? siteConfig.name;
  const fullName = settings?.fullName ?? siteConfig.fullName;
  const tagline = settings?.tagline ?? siteConfig.tagline;
  const description = settings?.description ?? siteConfig.description;
  const logo = settings?.logoUrl ?? siteConfig.logo;
  const socials = settings ? buildSocialLinks(settings) : [];

  return (
    <footer className="border-t border-neutral-300/40 bg-infra-midnight text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_2fr]">
          {/* Left 60% — brand block */}
          <div className="max-w-lg">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt={name}
                width={36}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <span className="font-primary text-lg font-semibold text-white">
                {name}
              </span>
            </div>
            <p className="mt-2 font-technical text-[10px] uppercase tracking-wide text-tech-blue/70">
              {tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socials.map(({ icon, label, href }) => {
                const Icon = socialIconMap[icon];
                return (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors duration-micro hover:border-tech-blue hover:text-tech-blue"
                  >
                    {Icon && <Icon size={16} />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right 40% — link columns */}
          <div className="grid grid-cols-2 gap-8">
            {/* Services */}
            <div>
              <h3 className="mb-4 font-technical text-xs uppercase tracking-wide text-titanium-silver">
                Services
              </h3>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm text-neutral-300 transition-colors duration-micro hover:text-tech-blue"
                    >
                      {s.profile.eyebrow}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 font-technical text-xs uppercase tracking-wide text-titanium-silver">
                Company
              </h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    {link.href.includes("#") ? (
                      <HashLink
                        href={link.href}
                        className="text-sm text-neutral-300 transition-colors duration-micro hover:text-tech-blue"
                      >
                        {link.label}
                      </HashLink>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-300 transition-colors duration-micro hover:text-tech-blue"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} {fullName}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link
            href="/privacy-policy"
            className="text-xs text-neutral-400 transition-colors duration-micro hover:text-tech-blue"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-xs text-neutral-400 transition-colors duration-micro hover:text-tech-blue"
          >
            Terms of Service
          </Link>
        </div>
      </Container>
    </footer>
  );
}
