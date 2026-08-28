"use client";

import Link from "next/link";
import { ChevronDown, X } from "lucide-react";

type NavChild = { title: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

type MobileMenuProps = Readonly<{
  isOpen: boolean;
  navItems: NavItem[];
  openDropdown: string | null;
  onDropdownToggle: (label: string) => void;
  isDropdownActive: (item: NavItem) => boolean;
  isActive: (href: string) => boolean;
  onClose: () => void;
}>;

function DrawerLink({ href, onClick, active, children }: Readonly<{ href: string; onClick: () => void; active: boolean; children: React.ReactNode }>) {
  return (
    <Link
      href={href}
      prefetch={true}
      onClick={onClick}
      className={`rounded-lg px-2 py-1.5 transition-colors duration-micro ${active ? "text-brand" : "text-neutral-700 hover:bg-neutral-100 hover:text-brand"}`}
    >
      {children}
    </Link>
  );
}

export function MobileMenu({ isOpen, navItems, openDropdown, onDropdownToggle, isDropdownActive, isActive, onClose }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Enter" || e.key === " " ? onClose() : undefined}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-[var(--duration-standard)] md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Close menu"
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-2/3 max-w-xs bg-white shadow-2xl flex flex-col px-6 py-4 gap-5 text-sm font-medium transition-transform duration-[var(--duration-standard)] ease-[var(--ease-standard)] md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button type="button" className="self-end p-1  text-neutral-500 hover:text-neutral-900" onClick={onClose} aria-label="Close menu">
          <X size={20} />
        </button>

        {navItems.map((item) => {
          const active = isDropdownActive(item);
          const expanded = openDropdown === item.label;

          if (item.children) {
            const btnClass = expanded ? "bg-brand text-white" : active ? "text-brand" : "text-neutral-700 hover:bg-neutral-100 hover:text-brand";
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => onDropdownToggle(item.label)}
                  className={`flex items-center gap-1 w-full rounded-lg px-2 py-1.5 transition-colors duration-micro ${btnClass}`}
                  aria-expanded={expanded}
                >
                  {item.label}
                  <ChevronDown size={14} className={`ml-auto transition-transform duration-micro ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded && (
                  <div className="mt-2 flex flex-col gap-1 pl-3 border-l-2 border-brand">
                    {item.children.map((child) => (
                      <DrawerLink key={child.href} href={child.href} onClick={onClose} active={isActive(child.href)}>
                        {child.title}
                      </DrawerLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <DrawerLink key={item.href} href={item.href ?? "/"} onClick={onClose} active={active}>
              {item.label}
            </DrawerLink>
          );
        })}
      </div>
    </>
  );
}
