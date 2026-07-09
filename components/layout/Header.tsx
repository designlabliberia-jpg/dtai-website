"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
            priority
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
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative px-3.5 py-2 text-sm font-medium transition-colors duration-micro ${
                  active ? "text-brand" : "text-neutral-800 hover:text-brand"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-tech-blue transition-transform duration-[var(--duration-standard)] ease-[var(--ease-standard)] ${
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 border-r border-neutral-300/60 pr-4 lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
            <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-500">
              Systems Online
            </span>
          </div>

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
            onClick={() => setMobileOpen((v) => !v)}
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
            {navItems.map((item, i) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium transition-colors duration-micro ${
                    active
                      ? "bg-white/5 text-tech-blue"
                      : "text-neutral-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-technical text-[10px] text-neutral-500">
                    {String(i + 1).padStart(2, "0")}
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
