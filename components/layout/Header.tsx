"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { DropdownPanel } from "@/components/ui/DropdownPanel";
import { MobileMenu } from "@/components/ui/MobileMenu";


type NavChild = { title: string; href: string};
type NavItem = { label: string; href?: string; children?: NavChild[]; viewAllHref?: string; viewAllLabel?: string };


const navItems: NavItem[] = [
  {
    label: "Services",
    href: "#capabilities",
  },
  {
    label: "Products",
    href: "#products",
  },
  {
    label: "Solutions",
    href: "/solutions",
  },
{
    label: "About Us",
    href: "/company/overview",
    viewAllHref: "/company/overview",
    viewAllLabel: "View All",
    children: [
      { title: "Overview", href: "/company/overview" },
      { title: "Leadership", href: "/company/leadership" },
      { title: "News", href: "/insights"},
      { title: "Careers", href: "/company/careers"},
      { title: "Case Studies", href: "/case-studies"},
      { title: "Engineering Philosophy", href: "/company/engineering-philosophy"},
      { title: "Our Approach", href: "/company/approach"},
    ],
  },
];

function useDropdown() {
  const [open, setOpen] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = useCallback(() => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => () => clear(), [clear]);

  return {
    open,
    openNow: useCallback((label: string) => { clear(); setOpen(label); }, [clear]),
    toggle: useCallback((label: string) => { clear(); setOpen((c) => (c === label ? null : label)); }, [clear]),
    scheduleClose: useCallback(() => { clear(); timer.current = setTimeout(() => setOpen(null), 250); }, [clear]),
    close: useCallback(() => { clear(); setOpen(null); }, [clear]),
  };
}

const activeBar = (active: boolean) =>
  `absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-tech-blue transition-transform duration-[var(--duration-standard)] ease-[var(--ease-standard)] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdown = useDropdown();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    startTransition(() => { setMobileOpen(false); dropdown.close(); });
  }, [pathname, dropdown.close]);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname],
  );

  const isDropdownActive = useCallback(
    (item: NavItem) =>
      (item.href ? isActive(item.href) : false) || (item.children?.some((c) => isActive(c.href)) ?? false),
    [isActive],
  );

  const handleMobileClose = useCallback(() => { setMobileOpen(false); dropdown.close(); }, [dropdown.close]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-[var(--duration-standard)] ${scrolled ? "border-b border-neutral-300/60 bg-white/85 shadow-sm backdrop-blur-md" : "border-b border-transparent bg-white"}`}
    >
      <div className={`h-px w-full bg-gradient-to-r from-tech-blue via-dtai-blue/50 to-transparent transition-opacity duration-[var(--duration-standard)] ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <Container className={`flex items-center justify-between transition-all duration-[var(--duration-standard)] ${scrolled ? "h-16" : "h-20"}`}>
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/assets/dtai-logo.png" alt="DTAI — Digital Technology Associates Inc." width={40} height={40} className="h-10 w-auto object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-technical text-sm tracking-wide text-neutral-900">DTAI</span>
            <span className="mt-0.5 hidden font-technical text-[9px] uppercase tracking-wider text-neutral-500 sm:block">
              Digital Technology Associates
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isDropdownActive(item);

            if (item.children) {
              const isOpen = dropdown.open === item.label;
              return (
                <div key={item.label} className="relative" onMouseEnter={() => dropdown.openNow(item.label)} onMouseLeave={dropdown.scheduleClose}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => dropdown.toggle(item.label)}
                    className={`group relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium transition-colors duration-micro ${active ? "text-brand" : "text-neutral-800 hover:text-brand"}`}
                  >
                    {item.label}
                    <ChevronRight className={`h-5 w-5 transition-transform duration-micro ${isOpen ? "rotate-90" : ""}`} />
                    <span className={activeBar(active)} />
                  </button>
                  <DropdownPanel items={item.children} isOpen={isOpen} isActive={isActive} onClose={dropdown.close} viewAllHref={item.viewAllHref} viewAllLabel={item.viewAllLabel} />
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href ?? "/"} className={`group relative px-3.5 py-2 text-sm font-medium transition-colors duration-micro ${active ? "text-brand" : "text-neutral-800 hover:text-brand"}`}>
                {item.label}
                <span className={activeBar(active)} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-micro hover:bg-tech-blue sm:inline-flex">
            Contact Us
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
              <span className={`absolute h-[1.5px] w-4 bg-neutral-900 transition-all duration-micro ${mobileOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-[1.5px] w-4 bg-neutral-900 transition-opacity duration-micro ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute h-[1.5px] w-4 bg-neutral-900 transition-all duration-micro ${mobileOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </span>
          </button>
        </div>
      </Container>

      <MobileMenu
        isOpen={mobileOpen}
        navItems={navItems}
        openDropdown={dropdown.open}
        onDropdownToggle={dropdown.toggle}
        isDropdownActive={isDropdownActive}
        isActive={isActive}
        onClose={handleMobileClose}
      />
    </header>
  );
}
