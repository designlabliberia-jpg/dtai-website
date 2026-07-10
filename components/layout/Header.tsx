"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { capabilities } from "@/lib/capabilities-data";
import { industries } from "@/lib/industries-data";
import { solutions } from "@/lib/solutions-data";

type NavItem = {
  label: string;
  href?: string;
  children?: { title: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/capabilities",
    children: capabilities.map((capability) => ({
      title: capability.title,
      href: `/capabilities/${capability.slug}`,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    children: industries.map((industry) => ({
      title: industry.title,
      href: `/industries/${industry.slug}`,
    })),
  },
    {
    label: "Solutions",
    href: "/solutions",
    children: solutions.map((solution) => ({
      title: solution.title,
      href: `/solutions/${solution.slug}`,
    })),
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Company", href: "/company/overview" },
];

function getDesktopLinkClasses(active: boolean) {
  return `group relative px-3.5 py-2 text-sm font-medium transition-colors duration-micro ${
    active ? "text-brand" : "text-neutral-800 hover:text-brand"
  }`;
}

function getMobileLinkClasses(active: boolean) {
  return `flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium transition-colors duration-micro ${
    active
      ? "bg-white/5 text-tech-blue"
      : "text-neutral-200 hover:bg-white/5 hover:text-white"
  }`;
}

function getActiveIndicatorClasses(active: boolean) {
  return `absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-tech-blue transition-transform duration-[var(--duration-standard)] ease-[var(--ease-standard)] ${
    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
  }`;
}

function getDropdownLinkClasses(active: boolean) {
  return `rounded-md px-3 py-2 text-sm transition-colors ${
    active
      ? "bg-tech-blue/10 text-tech-blue"
      : "text-neutral-300 hover:bg-white/5 hover:text-white"
  }`;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setHoveredDropdown(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isDropdownActive = (item: NavItem) => {
    if (item.href && isActive(item.href)) {
      return true;
    }

    return item.children?.some((child) => isActive(child.href)) ?? false;
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
    setHoveredDropdown(null);
  };

  const handleDropdownToggle = (label: string) => {
    setHoveredDropdown((current) => (current === label ? null : label));
    setOpenDropdown((current) => (current === label ? null : label));
  };

  const handleDropdownLeave = (label: string) => {
    window.setTimeout(() => {
      setOpenDropdown((current) => (current === label ? null : current));
      setHoveredDropdown((current) => (current === label ? null : current));
    }, 180);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-[var(--duration-standard)] ${
        scrolled
          ? "border-b border-neutral-300/60 bg-white/85 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-white"
      }`}
    >
      <div
        className={`h-px w-full bg-gradient-to-r from-tech-blue via-dtai-blue/50 to-transparent transition-opacity duration-[var(--duration-standard)] ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <Container
        className={`flex items-center justify-between transition-all duration-[var(--duration-standard)] ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/assets/dtai-logo.png"
            alt="DTAI — Digital Technology Associates Inc."
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="font-technical text-sm tracking-wide text-neutral-900">
              DTAI
            </span>
            <span className="mt-0.5 hidden font-technical text-[9px] uppercase tracking-wider text-neutral-500 sm:block">
              Digital Technology Associates
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isDropdownActive(item);

            if (item.children) {
              const isOpen = openDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredDropdown(item.label);
                    setOpenDropdown(item.label);
                  }}
                  onMouseLeave={() => handleDropdownLeave(item.label)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => handleDropdownToggle(item.label)}
                    className={`group relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium transition-colors duration-micro ${
                      active ? "text-brand" : "text-neutral-800 hover:text-brand"
                    }`}
                  >
                    {item.label}
                    <ChevronRight
                      className={`h-5 w-5 transition-transform duration-micro ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                    <span className={getActiveIndicatorClasses(active)} />
                  </button>

                  {isOpen ? (
                    <div
                      className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg"
                      onMouseEnter={() => setHoveredDropdown(item.label)}
                      onMouseLeave={() => handleDropdownLeave(item.label)}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeDropdowns}
                          className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            isActive(child.href)
                              ? "bg-brand/10 text-brand"
                              : "text-neutral-700 hover:bg-neutral-50 hover:text-brand"
                          }`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href ?? "/"}
                className={getDesktopLinkClasses(active)}
              >
                {item.label}
                <span className={getActiveIndicatorClasses(active)} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-micro hover:bg-tech-blue sm:inline-flex"
          >
            Talk to DTAI
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-300 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span
                className={`absolute h-[1.5px] w-4 bg-neutral-900 transition-all duration-micro ${
                  mobileOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4 bg-neutral-900 transition-opacity duration-micro ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4 bg-neutral-900 transition-all duration-micro ${
                  mobileOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        className={`overflow-hidden border-t border-neutral-300/40 bg-infra-midnight transition-all duration-[var(--duration-standard)] ease-[var(--ease-standard)] md:hidden ${
          mobileOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="relative py-5">
          <div className="pointer-events-none absolute inset-4">
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
          </div>

          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => {
              const active = isDropdownActive(item);

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="rounded-md border border-white/10 bg-white/5"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDropdown((current) => (current === item.label ? null : item.label))}
                      className={getMobileLinkClasses(active)}
                    >
                      <span>{item.label}</span>
                      <span className="font-technical text-[10px] text-neutral-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>

                    {openDropdown === item.label ? (
                      <div className="flex flex-col gap-1 border-t border-white/10 px-2 pb-2 pt-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={getDropdownLinkClasses(isActive(child.href))}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href ?? "/"}
                  className={getMobileLinkClasses(active)}
                >
                  <span>{item.label}</span>
                  <span className="font-technical text-[10px] text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="mt-3 rounded-md bg-tech-blue px-5 py-3 text-center text-sm font-semibold text-infra-midnight"
            >
              Talk to DTAI
            </Link>

            <div className="mt-4 flex items-center gap-1.5 border-t border-white/10 pt-4">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
              <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-500">
                Systems Online
              </span>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
