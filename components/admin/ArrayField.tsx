"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface ArrayFieldProps {
  label: string;
  name: string;
  defaultValue?: string[];
  placeholder?: string;
  error?: string;
  maxItems?: number;
}

export function ArrayField({
  label,
  name,
  defaultValue = [],
  placeholder = "Add item…",
  error,
  maxItems = 20,
}: ArrayFieldProps) {
  const [items, setItems] = useState<string[]>(defaultValue);
  const [draft, setDraft] = useState("");

  function add() {
    const trimmed = draft.trim();
    if (!trimmed || items.length >= maxItems) return;
    setItems((prev) => [...prev, trimmed]);
    setDraft("");
  }

  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-technical text-[10px] uppercase tracking-[0.1em]"
        style={{ color: "var(--admin-text-secondary)" }}
      >
        {label}
      </label>

      {/* Hidden inputs for form submission */}
      {items.map((item, i) => (
        <input key={i} type="hidden" name={name} value={item} />
      ))}

      {/* Items list */}
      {items.length > 0 && (
        <div className="flex flex-col gap-1">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2"
              style={{
                background: "var(--admin-surface-2)",
                border: "1px solid var(--admin-border)",
              }}
            >
              <span
                className="flex-1 text-sm"
                style={{ color: "var(--admin-text-primary)" }}
              >
                {item}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="shrink-0 transition-colors"
                style={{ color: "var(--admin-text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add input */}
      {items.length < maxItems && (
        <div className="flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="flex-1 rounded-[var(--radius-sm)] px-3 py-2 text-sm outline-none transition-colors"
            style={{
              background: "var(--admin-surface)",
              border: "1px solid var(--admin-border-strong)",
              color: "var(--admin-text-primary)",
            }}
          />
          <button
            type="button"
            onClick={add}
            disabled={!draft.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] transition-colors disabled:opacity-40"
            style={{
              background: "var(--admin-brand)",
              color: "#fff",
            }}
          >
            <Plus size={14} />
          </button>
        </div>
      )}

      {error && (
        <p
          className="font-technical text-[10px]"
          style={{ color: "var(--admin-danger)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
