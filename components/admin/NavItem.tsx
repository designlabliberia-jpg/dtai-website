"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  collapsed?: boolean;
}

export function NavItem({ href, label, icon: Icon, badge, collapsed }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className="group relative flex h-9 items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 text-[13px] transition-colors duration-150"
      style={{
        background: active
          ? "var(--admin-sidebar-item-active-bg)"
          : "transparent",
        color: active
          ? "var(--admin-sidebar-item-active-text)"
          : "rgba(248,250,252,0.65)",
        fontWeight: active ? 500 : 400,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "var(--admin-sidebar-item-hover-bg)";
        if (!active) e.currentTarget.style.color = "rgba(248,250,252,0.9)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
        if (!active) e.currentTarget.style.color = "rgba(248,250,252,0.65)";
      }}
    >
      {/* Active left bar */}
      {active && (
        <span
          className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full"
          style={{ background: "var(--admin-accent)" }}
        />
      )}

      <Icon size={14} className="shrink-0" />

      {!collapsed && (
        <span className="flex-1 truncate">{label}</span>
      )}

      {/* Badge */}
      {!collapsed && badge != null && badge > 0 && (
        <span
          className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-technical text-[9px] font-semibold"
          style={{ background: "var(--admin-accent)", color: "#fff" }}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
      {collapsed && badge != null && badge > 0 && (
        <span
          className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--admin-accent)" }}
        />
      )}
    </Link>
  );
}
