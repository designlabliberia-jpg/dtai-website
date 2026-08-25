"use client";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function SanityStudioLink() {
  return (
    <Link
      href="/studio"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em] transition-colors"
      style={{ border: "1px solid var(--admin-border-strong)", color: "var(--admin-text-secondary)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--admin-brand)";
        e.currentTarget.style.color = "var(--admin-brand)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--admin-border-strong)";
        e.currentTarget.style.color = "var(--admin-text-secondary)";
      }}
    >
      <ExternalLink size={12} />
      Manage in Sanity Studio
    </Link>
  );
}
