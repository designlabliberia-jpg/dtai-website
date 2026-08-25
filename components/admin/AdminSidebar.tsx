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
  Package,
  Wrench,
  Lightbulb,
  Newspaper,
  UserCircle,
  Handshake,
  ClipboardList,
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

  const isSuperAdmin = role === "super_admin";
  const isEditor     = role === "editor" || isSuperAdmin;
  const isRecruiter  = role === "recruiter" || isSuperAdmin;
  const isSupport    = role === "support" || isSuperAdmin;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside
      style={{
        width: collapsed ? 64 : 220,
        background: "var(--admin-sidebar-bg)",
        borderRight: "1px solid var(--admin-sidebar-border)",
      }}
      className="relative flex h-screen shrink-0 flex-col transition-[width] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className="flex h-[52px] shrink-0 items-center px-4"
        style={{ borderBottom: "1px solid var(--admin-sidebar-border)" }}
      >
        {collapsed ? (
          <Link href="/admin" className="flex items-center justify-center w-full">
            <Image
              src="/assets/dtai-logo.png"
              alt="DTAI"
              width={26}
              height={26}
              className="object-contain"
            />
          </Link>
        ) : (
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image
              src="/assets/dtai-logo.png"
              alt="DTAI"
              width={26}
              height={26}
              className="object-contain"
            />
            <div className="flex flex-col leading-none">
              <span
                className="font-technical text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--admin-text-inverse)" }}
              >
                DTAI
              </span>
              <span
                className="font-technical text-[8px] uppercase tracking-[0.15em]"
                style={{ color: "var(--admin-text-inverse-muted)" }}
              >
                Command
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* ── Collapse toggle ─────────────────────────────────────────────── */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-[40px] z-10 flex h-6 w-6 items-center justify-center rounded-full transition-colors"
        style={{
          background: "var(--admin-surface)",
          border: "1px solid var(--admin-border)",
          color: "var(--admin-text-muted)",
          boxShadow: "var(--admin-shadow-panel)",
        }}
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </button>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-4">

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
          {isRecruiter && (
            <NavItem
              href="/admin/applications"
              label="Applications"
              icon={Briefcase}
              badge={unreadApplications}
              collapsed={collapsed}
            />
          )}
        </NavSection>

        {isEditor && (
          <NavSection label="Content" collapsed={collapsed}>
            <NavItem href="/admin/products"  label="Products"  icon={Package}   collapsed={collapsed} />
            <NavItem href="/admin/services"  label="Services"  icon={Wrench}    collapsed={collapsed} />
            <NavItem href="/admin/solutions" label="Solutions" icon={Lightbulb} collapsed={collapsed} />
            <NavItem href="/admin/news"      label="News"      icon={Newspaper} collapsed={collapsed} />
          </NavSection>
        )}

        {isEditor && (
          <NavSection label="People" collapsed={collapsed}>
            <NavItem href="/admin/leadership" label="Leadership" icon={UserCircle}  collapsed={collapsed} />
            <NavItem href="/admin/partners"   label="Partners"   icon={Handshake}   collapsed={collapsed} />
          </NavSection>
        )}

        {isRecruiter && (
          <NavSection label="Careers" collapsed={collapsed}>
            <NavItem href="/admin/jobs" label="Job Listings" icon={ClipboardList} collapsed={collapsed} />
          </NavSection>
        )}

        {isSuperAdmin && (
          <NavSection label="CRM" collapsed={collapsed}>
            <NavItem href="/admin/pipeline" label="Pipeline" icon={Users} collapsed={collapsed} />
          </NavSection>
        )}

        {isSuperAdmin && (
          <NavSection label="System" collapsed={collapsed}>
            <NavItem href="/admin/settings" label="Settings" icon={Settings} collapsed={collapsed} />
          </NavSection>
        )}
      </nav>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div
        className="shrink-0 px-3 py-4"
        style={{ borderTop: "1px solid var(--admin-sidebar-border)" }}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-technical text-[11px] font-semibold uppercase"
            style={{
              background: "rgba(0,166,255,0.15)",
              color: "var(--admin-accent)",
              border: "1px solid rgba(0,166,255,0.2)",
            }}
          >
            {userName.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p
                className="truncate text-[11px] font-medium"
                style={{ color: "var(--admin-text-inverse)" }}
              >
                {userName}
              </p>
              <p
                className="truncate font-technical text-[9px]"
                style={{ color: "var(--admin-text-inverse-muted)" }}
              >
                {userEmail}
              </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            title="Sign out"
            className="ml-auto shrink-0 transition-colors"
            style={{ color: "var(--admin-text-inverse-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-inverse-muted)")}
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
