"use client";

import Link from "next/link";
import { ShieldCheck, Users } from "lucide-react";
import { SettingsDrawer } from "./SettingsDrawer";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AccessControlDrawer({ open, onClose }: Props) {
  return (
    <SettingsDrawer title="Access Control" open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <p className="text-[12px] leading-relaxed" style={{ color: "var(--admin-text-muted)" }}>
          Manage roles with granular permissions, then assign users to those roles.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/admin/roles"
            onClick={onClose}
            className="group flex flex-col items-center gap-3 rounded-[var(--radius-md)] p-6 text-center transition-all"
            style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--admin-brand)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--admin-border)"; }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--admin-surface)" }}>
              <ShieldCheck size={22} style={{ color: "var(--admin-brand)" }} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-technical text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--admin-brand)" }}>Roles</span>
              <span className="text-[11px] leading-snug" style={{ color: "var(--admin-text-muted)" }}>Create roles & assign permissions</span>
            </div>
          </Link>

          <Link
            href="/admin/users"
            onClick={onClose}
            className="group flex flex-col items-center gap-3 rounded-[var(--radius-md)] p-6 text-center transition-all"
            style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--admin-brand)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--admin-border)"; }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--admin-surface)" }}>
              <Users size={22} style={{ color: "var(--admin-brand)" }} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-technical text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--admin-brand)" }}>Users</span>
              <span className="text-[11px] leading-snug" style={{ color: "var(--admin-text-muted)" }}>Create users & assign roles</span>
            </div>
          </Link>
        </div>
      </div>
    </SettingsDrawer>
  );
}
