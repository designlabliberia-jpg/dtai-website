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

function DrawerLink({ href, onClick, active, children }: { href: string; onClick: () => void; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      prefetch={true}
      onClick={onClick}
      className={`py-1.5 transition-colors duration-micro ${active ? "text-brand" : "text-neutral-700 hover:text-brand"}`}
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
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-[var(--duration-standard)] md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-white z-50 shadow-2xl flex flex-col px-6 py-4 gap-5 text-sm font-medium transition-transform duration-[var(--duration-standard)] ease-[var(--ease-standard)] md:hidden ${
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
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => onDropdownToggle(item.label)}
                  className={`flex items-center gap-1 w-full py-1.5 transition-colors duration-micro ${active ? "text-brand" : "text-neutral-700 hover:text-brand"}`}
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
