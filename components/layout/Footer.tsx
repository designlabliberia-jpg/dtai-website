import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { siteConfig } from "@/lib/seo";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Software Engineering", href: "/services/software-engineering" },
      { label: "Digital Infrastructure", href: "/services/digital-infrastructure" },
      { label: "Cybersecurity", href: "/services/cybersecurity" },
      { label: "GIS & Spatial Technology", href: "/services/gis-spatial-technology" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Government Technology", href: "/solutions/government-technology" },
      { label: "Election Technology", href: "/solutions/election-technology" },
      { label: "Enterprise Systems", href: "/solutions/enterprise-systems" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Products", href: "/products" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "News & Insights", href: "/insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/company/overview" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const CONTACT_EMAIL = "dtaitechnologies758@gmail.com";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-300/40 bg-infra-midnight text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-blue/60 to-transparent" />

      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_2fr]">
          {/* Left — brand block */}
          <div className="max-w-sm">
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
            <p className="mt-3 font-technical text-[10px] uppercase tracking-wide text-tech-blue/70">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {siteConfig.description}
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group mt-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-neutral-300 transition-colors duration-micro hover:border-tech-blue/50 hover:text-white"
            >
              <Mail size={15} strokeWidth={1.75} className="text-tech-blue" />
              {CONTACT_EMAIL}
              <ArrowUpRight
                size={13}
                className="text-neutral-500 transition-transform duration-micro group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tech-blue"
              />
            </a>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-technical text-xs uppercase tracking-wide text-titanium-silver">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-300 transition-colors duration-micro hover:text-tech-blue"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
        <div className="flex items-center gap-2 order-2 sm:order-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-5 order-1 sm:order-2">
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
