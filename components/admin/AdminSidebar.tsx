"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Mail, Briefcase, Users, Settings, ChevronLeft, ChevronRight,
  LogOut, Package, Wrench, Lightbulb, Newspaper, UserCircle, Handshake,
  ClipboardList, Sun, Moon, ShieldCheck, CheckSquare,
} from "lucide-react";
import { NavItem } from "./NavItem";
import { NavSection } from "./NavSection";

interface AdminSidebarProps {
  unreadContacts: number;
  unreadApplications: number;
  permissions: Record<string, boolean>;
  roleName: string;
  userName: string;
  userEmail: string;
}

export function AdminSidebar({
  unreadContacts,
  unreadApplications,
  permissions,
  roleName,
  userName,
  userEmail,
}: Readonly<AdminSidebarProps>) {
  const [collapsed, setCollapsed] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    const light = saved === "light";
    document.documentElement.dataset.theme = light ? "light" : "";
    const id = setTimeout(() => setIsLight(light), 0);
    return () => clearTimeout(id);
  }, []);

  function toggleTheme() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.dataset.theme = next ? "light" : "";
    localStorage.setItem("admin-theme", next ? "light" : "dark");
  }

  const isSuperAdmin = roleName === "super_admin";
  const p = (key: string) => isSuperAdmin || permissions[key] === true;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const showContent    = p("products:read") || p("services:read") || p("solutions:read") || p("news:read");
  const showPeople     = p("leadership:read") || p("partners:read");
  const showCareers    = p("jobs:read");
  const showInbox      = p("contact:read");
  const showApps       = p("applications:read");
  const showPipeline   = p("pipeline:read");
  const showSettings   = p("settings:read");
  const showUsers      = p("users:read");
  const showRoles      = p("roles:read");
  const showApprovals  = p("approvals:review");

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
          <Link href="/" className="flex items-center justify-center w-full">
            <Image src="/assets/dtai-logo.png" alt="DTAI" width={26} height={26} className="object-contain" />
          </Link>
        ) : (
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/assets/dtai-logo.png" alt="DTAI" width={26} height={26} className="object-contain" />
            <div className="flex flex-col leading-none">
              <span className="font-technical text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--admin-text-inverse)" }}>DTAI</span>
              <span className="font-technical text-[8px] uppercase tracking-[0.15em]" style={{ color: "var(--admin-text-inverse-muted)" }}>Command</span>
            </div>
          </Link>
        )}
      </div>

      {/* ── Collapse toggle ─────────────────────────────────────────────── */}
      <button
        type="button"
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

        {(showInbox || showApps) && (
          <NavSection label="Inbox" collapsed={collapsed}>
            {showInbox && (
              <NavItem href="/admin/contact" label="Contact" icon={Mail} badge={unreadContacts} collapsed={collapsed} />
            )}
            {showApps && (
              <NavItem href="/admin/applications" label="Applications" icon={Briefcase} badge={unreadApplications} collapsed={collapsed} />
            )}
          </NavSection>
        )}

        {showContent && (
          <NavSection label="Content" collapsed={collapsed}>
            {p("products:read")  && <NavItem href="/admin/products"  label="Products"  icon={Package}   collapsed={collapsed} />}
            {p("services:read")  && <NavItem href="/admin/services"  label="Services"  icon={Wrench}    collapsed={collapsed} />}
            {p("solutions:read") && <NavItem href="/admin/solutions" label="Solutions" icon={Lightbulb} collapsed={collapsed} />}
            {p("news:read")      && <NavItem href="/admin/news"      label="News"      icon={Newspaper} collapsed={collapsed} />}
          </NavSection>
        )}

        {showPeople && (
          <NavSection label="People" collapsed={collapsed}>
            {p("leadership:read") && <NavItem href="/admin/leadership" label="Leadership" icon={UserCircle} collapsed={collapsed} />}
            {p("partners:read")   && <NavItem href="/admin/partners"   label="Partners"   icon={Handshake}  collapsed={collapsed} />}
          </NavSection>
        )}

        {showCareers && (
          <NavSection label="Careers" collapsed={collapsed}>
            <NavItem href="/admin/jobs" label="Job Listings" icon={ClipboardList} collapsed={collapsed} />
          </NavSection>
        )}

        {showPipeline && (
          <NavSection label="CRM" collapsed={collapsed}>
            <NavItem href="/admin/pipeline" label="Pipeline" icon={Users} collapsed={collapsed} />
          </NavSection>
        )}

        {showApprovals && (
          <NavSection label="Workflow" collapsed={collapsed}>
            <NavItem href="/admin/approvals" label="Approvals" icon={CheckSquare} collapsed={collapsed} />
          </NavSection>
        )}

        {(showSettings || showUsers || showRoles) && (
          <NavSection label="System" collapsed={collapsed}>
            {showSettings && <NavItem href="/admin/settings" label="Settings" icon={Settings}     collapsed={collapsed} />}
            {showUsers    && <NavItem href="/admin/users"    label="Users"    icon={Users}         collapsed={collapsed} />}
            {showRoles    && <NavItem href="/admin/roles"    label="Roles"    icon={ShieldCheck}   collapsed={collapsed} />}
          </NavSection>
        )}
      </nav>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div className="shrink-0 px-3 py-4" style={{ borderTop: "1px solid var(--admin-sidebar-border)" }}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-technical text-[11px] font-semibold uppercase"
            style={{ background: "rgba(0,166,255,0.15)", color: "var(--admin-accent)", border: "1px solid rgba(0,166,255,0.2)" }}
          >
            {userName.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-[11px] font-medium" style={{ color: "var(--admin-text-inverse)" }}>{userName}</p>
              <p className="truncate font-technical text-[9px]" style={{ color: "var(--admin-text-inverse-muted)" }}>{userEmail}</p>
            </div>
          )}
          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            <button
              type="button" onClick={toggleTheme}
              title={isLight ? "Switch to dark mode" : "Switch to light mode"}
              className="transition-colors"
              style={{ color: "var(--admin-text-inverse-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-inverse-muted)")}>
              {isLight ? <Moon size={13} /> : <Sun size={13} />}
            </button>
            <button
              type="button" onClick={handleLogout} title="Sign out"
              className="transition-colors"
              style={{ color: "var(--admin-text-inverse-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-inverse-muted)")}>
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
