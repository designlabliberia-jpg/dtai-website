import Link from "next/link";
import { Container } from "@/components/layout/Container";

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

const linkCls = (active: boolean) =>
  `flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium transition-colors duration-micro ${active ? "bg-white/5 text-tech-blue" : "text-neutral-200 hover:bg-white/5 hover:text-white"}`;

export function MobileMenu({ isOpen, navItems, openDropdown, onDropdownToggle, isDropdownActive, isActive, onClose }: MobileMenuProps) {
  return (
    <div
      className={`overflow-hidden border-t border-neutral-300/40 bg-infra-midnight transition-all duration-[var(--duration-standard)] ease-[var(--ease-standard)] md:hidden ${isOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0"}`}
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
            const counter = (
              <span className="font-technical text-[10px] text-neutral-500">
                {String(index + 1).padStart(2, "0")}
              </span>
            );

            if (item.children) {
              return (
                <div key={item.label} className="rounded-md border border-white/10 bg-white/5">
                  <button type="button" onClick={() => onDropdownToggle(item.label)} className={linkCls(active)}>
                    <span>{item.label}</span>
                    {counter}
                  </button>
                  {openDropdown === item.label && (
                    <div className="flex flex-col gap-1 border-t border-white/10 px-2 pb-2 pt-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={`rounded-md px-3 py-2 text-sm transition-colors ${isActive(child.href) ? "bg-tech-blue/10 text-tech-blue" : "text-neutral-300 hover:bg-white/5 hover:text-white"}`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href ?? "/"} className={linkCls(active)}>
                <span>{item.label}</span>
                {counter}
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
