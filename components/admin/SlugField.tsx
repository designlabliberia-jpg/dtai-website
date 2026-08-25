"use client";

import { useState, useEffect } from "react";
import { Lock, Unlock } from "lucide-react";

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

interface SlugFieldProps {
  name?: string;
  sourceValue?: string;   // value from the name/title field to derive slug from
  defaultValue?: string;  // existing slug when editing
  error?: string;
}

export function SlugField({
  name = "slug",
  sourceValue = "",
  defaultValue = "",
  error,
}: SlugFieldProps) {
  const [locked, setLocked] = useState(!!defaultValue);
  const [slug, setSlug] = useState(defaultValue || toSlug(sourceValue));

  useEffect(() => {
    if (!locked) setSlug(toSlug(sourceValue));
  }, [sourceValue, locked]);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-technical text-[10px] uppercase tracking-[0.1em]"
        style={{ color: "var(--admin-text-secondary)" }}
      >
        Slug
      </label>

      <div className="flex gap-2">
        <div
          className="flex flex-1 items-center overflow-hidden rounded-[var(--radius-sm)]"
          style={{
            background: locked ? "var(--admin-surface-2)" : "var(--admin-surface)",
            border: error
              ? "1px solid var(--admin-danger)"
              : "1px solid var(--admin-border-strong)",
          }}
        >
          <span
            className="shrink-0 px-3 font-technical text-[11px]"
            style={{ color: "var(--admin-text-muted)" }}
          >
            /
          </span>
          <input
            id={name}
            name={name}
            value={slug}
            readOnly={locked}
            onChange={(e) => !locked && setSlug(e.target.value)}
            className="flex-1 bg-transparent py-2 pr-3 font-technical text-sm outline-none"
            style={{ color: "var(--admin-text-primary)" }}
          />
        </div>

        <button
          type="button"
          onClick={() => setLocked((l) => !l)}
          title={locked ? "Unlock to edit manually" : "Lock to auto-generate from title"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] transition-colors"
          style={{
            background: "var(--admin-surface-2)",
            border: "1px solid var(--admin-border-strong)",
            color: locked ? "var(--admin-brand)" : "var(--admin-text-muted)",
          }}
        >
          {locked ? <Lock size={13} /> : <Unlock size={13} />}
        </button>
      </div>

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
