"use client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { syncAllArticlesFromSanity } from "@/lib/actions/articles";

export function SyncArticlesButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleSync() {
    setLoading(true);
    setMsg(null);
    const res = await syncAllArticlesFromSanity();
    setLoading(false);
    setMsg(res.ok ? `Synced ${res.count} article${res.count === 1 ? "" : "s"}` : "Sync failed — check server logs");
  }

  return (
    <div className="flex items-center gap-3">
      {msg && (
        <span className="font-technical text-[11px]" style={{ color: "var(--admin-text-muted)" }}>
          {msg}
        </span>
      )}
      <button
        onClick={handleSync}
        disabled={loading}
        className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em] transition-colors disabled:opacity-50"
        style={{ border: "1px solid var(--admin-border-strong)", color: "var(--admin-text-secondary)" }}
      >
        <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
        {loading ? "Syncing…" : "Sync from Sanity"}
      </button>
    </div>
  );
}
