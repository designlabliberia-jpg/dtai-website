import Link from "next/link";
import Image from "next/image";
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
    title: "Company",
    links: [
      { label: "About Us", href: "/company/overview" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-300/40 bg-infra-midnight text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Left — brand block */}
          <div className="max-w-xs">
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
            <p className="hidden sm:block mt-4 text-sm leading-relaxed text-neutral-400">
              {siteConfig.description}
            </p>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-technical text-xs uppercase tracking-wide text-titanium-silver">
                  {col.title}
                </h3>
                <ul className="space-y-2">
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
