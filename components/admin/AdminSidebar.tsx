"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Briefcase,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { NavItem } from "./NavItem";
import { NavSection } from "./NavSection";

interface AdminSidebarProps {
  unreadContacts: number;
  unreadApplications: number;
  role: string;
  userName: string;
  userEmail: string;
}

export function AdminSidebar({
  unreadContacts,
  unreadApplications,
  role,
  userName,
  userEmail,
}: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside
      style={{ width: collapsed ? 80 : 240 }}
      className="relative flex h-screen shrink-0 flex-col border-r border-neutral-200 bg-white transition-[width] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
    >
      {/* ── Header ─────────────────────────────── */}
      <div className="flex h-[44px] shrink-0 items-center px-6">
        {collapsed ? (
          <Link href="/admin" className="flex items-center justify-center">
            <Image src="/assets/dtai-logo.png" alt="DTAI" width={28} height={28} className="object-contain" />
          </Link>
        ) : (
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/assets/dtai-logo.png" alt="DTAI" width={28} height={28} className="object-contain" />
            <span className="font-technical text-xs font-semibold uppercase tracking-widest text-neutral-900">
              DTAI Admin
            </span>
          </Link>
        )}
      </div>

      {/* ── Collapse toggle ─────────────────────── */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-[38px] z-10 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-400 shadow-sm hover:text-neutral-700 transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* ── Nav ─────────────────────────────────── */}
      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-4">
        <NavSection label="Main" collapsed={collapsed}>
          <NavItem href="/admin" label="Dashboard" icon={LayoutDashboard} collapsed={collapsed} />
        </NavSection>

        <NavSection label="Inbox" collapsed={collapsed}>
          <NavItem
            href="/admin/contact"
            label="Contact"
            icon={Mail}
            badge={unreadContacts}
            collapsed={collapsed}
          />
          {(role === "super_admin" || role === "recruiter") && (
            <NavItem
              href="/admin/applications"
              label="Applications"
              icon={Briefcase}
              badge={unreadApplications}
              collapsed={collapsed}
            />
          )}
        </NavSection>

        {(role === "super_admin") && (
          <NavSection label="CRM" collapsed={collapsed}>
            <NavItem href="/admin/pipeline" label="Pipeline" icon={Users} collapsed={collapsed} />
          </NavSection>
        )}

        {role === "super_admin" && (
          <NavSection label="System" collapsed={collapsed}>
            <NavItem href="/admin/settings" label="Settings" icon={Settings} collapsed={collapsed} />
          </NavSection>
        )}
      </nav>

      {/* ── Footer ──────────────────────────────── */}
      <div className="shrink-0 border-t border-neutral-100 px-6 py-[44px] flex flex-col gap-1">
        <div className="flex h-10 items-center gap-3 overflow-hidden">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 font-technical text-xs font-semibold text-brand uppercase">
            {userName.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-medium text-neutral-900">{userName}</p>
              <p className="truncate font-technical text-[10px] text-neutral-400">{userEmail}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            title="Sign out"
            className="ml-auto shrink-0 text-neutral-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
