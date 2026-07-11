import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

const footerColumns = [
  {
    title: "Capabilities",
    links: [
      { label: "Software Engineering", href: "/capabilities/software-engineering" },
      { label: "Digital Infrastructure", href: "/capabilities/digital-infrastructure" },
      { label: "Cybersecurity", href: "/capabilities/cybersecurity" },
      { label: "GIS & Spatial Technology", href: "/capabilities/gis-spatial-technology" },
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
      { label: "Overview", href: "/company/overview" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
  {
    title: "Governance",
    links: [
      { label: "Security Philosophy", href: "/security-and-governance/philosophy" },
      { label: "Governance Model", href: "/security-and-governance/governance-model" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-300/40 bg-infra-midnight text-white">
      <Container className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
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
      </Container>
      <Container className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/dtai-logo.png"
            alt="DTAI"
            width={28}
            height={28}
            className="h-7 w-auto object-contain"
          />
          <p className="text-xs text-neutral-300">
            © {new Date().getFullYear()} Digital Technology Associates Inc. (DTAI). All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/privacy-policy"
            className="text-xs text-neutral-300 transition-colors duration-micro hover:text-tech-blue"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-xs text-neutral-300 transition-colors duration-micro hover:text-tech-blue"
          >
            Terms of Service
          </Link>
        </div>
      </Container>
    </footer>
  );
}
