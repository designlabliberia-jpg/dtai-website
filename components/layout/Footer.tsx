import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, Share2 } from "lucide-react";
import { Container } from "./Container";
import { HashLink } from "./HashLink";
import { siteConfig } from "@/lib/seo";
import { services, companyLinks, socialLinks } from "@/lib/services-data";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ElementType> = {
  MessageCircle,
  Mail,
  Facebook: FacebookIcon,
  Share2,
};

export function Footer() {
  return (
    <footer className="border-t border-neutral-300/40 bg-infra-midnight text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_2fr]">
          {/* Left 60% — brand block */}
          <div className="max-w-lg">
            <div className="flex items-center gap-3">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={36}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <span className="font-primary text-lg font-semibold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-2 font-technical text-[10px] uppercase tracking-wide text-tech-blue/70">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map(({ icon, label, href }) => {
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
                      {s.title}
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
          © {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
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
