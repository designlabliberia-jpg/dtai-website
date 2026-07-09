import Link from "next/link";
import { Container } from "./Container";

const navItems = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Company", href: "/company" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-300/40 bg-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-technical text-sm tracking-wide text-neutral-900">
            DTAI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-800 transition-colors duration-micro hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-micro hover:bg-tech-blue"
        >
          Talk to DTAI
        </Link>
      </Container>
    </header>
  );
}