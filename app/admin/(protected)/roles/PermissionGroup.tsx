"use client";

import { PERMISSIONS } from "@/lib/permissions";
import type { Permission } from "@/lib/permissions";

interface PermissionGroupProps {
  label: string;
  keys: readonly Permission[];
  checked: Record<string, boolean>;
}

export function PermissionGroup({ label, keys, checked }: PermissionGroupProps) {
  return (
    <div
      className="rounded-[var(--radius-md)] p-4"
      style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
    >
      <p
        className="mb-3 font-technical text-[9px] uppercase tracking-[0.15em]"
        style={{ color: "var(--admin-brand)" }}
      >
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {keys.map((key) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 rounded p-1.5 transition-colors hover:bg-[var(--admin-surface-2)]"
          >
            <input
              type="checkbox"
              name={`perm:${key}`}
              value="true"
              defaultChecked={checked[key] ?? false}
              className="h-3.5 w-3.5 accent-[var(--admin-brand)]"
            />
            <span className="text-[11px] leading-snug" style={{ color: "var(--admin-text-secondary)" }}>
              {PERMISSIONS[key]}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
