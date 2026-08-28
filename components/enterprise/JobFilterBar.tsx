"use client";

import { Search, ChevronDown, XCircle, X, LayoutList, LayoutGrid } from "lucide-react";
import type { JobCategory } from "@/lib/careers-data";
import { jobCategories } from "@/lib/careers-data";

export type TypeFilter = "All" | "Full-time" | "Part-time" | "Contract";
export type CategoryFilter = "All" | JobCategory;
export type ViewMode = "list" | "grid";

interface JobFilterBarProps {
  readonly query: string;
  readonly onQueryChange: (v: string) => void;
  readonly category: CategoryFilter;
  readonly onCategoryChange: (v: CategoryFilter) => void;
  readonly type: TypeFilter;
  readonly onTypeChange: (v: TypeFilter) => void;
  readonly onReset: () => void;
  readonly hasFilters: boolean;
  readonly view: ViewMode;
  readonly onViewChange: (v: ViewMode) => void;
}

function SelectField({
  value, onChange, children,
}: Readonly<{
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex items-center">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none bg-transparent pl-2 pr-6 py-0 text-sm text-neutral-600 font-medium cursor-pointer outline-none hover:text-neutral-900 transition-colors"
      >
        {children}
      </select>
      <ChevronDown size={12} className="pointer-events-none absolute right-0 text-neutral-400" />
    </div>
  );
}

export function JobFilterBar({
  query, onQueryChange,
  category, onCategoryChange,
  type, onTypeChange,
  onReset, hasFilters,
  view, onViewChange,
}: JobFilterBarProps) {
  return (
    <div className="flex flex-wrap items-stretch rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden divide-x divide-neutral-200">

      {/* Search */}
      <div className="flex items-center gap-2 flex-1 min-w-[180px] px-4 py-2.5">
        <Search size={14} className="text-neutral-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by name or role"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="text-neutral-400 hover:text-neutral-700 transition-colors shrink-0"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Department */}
      <div className="flex items-center px-4 py-2.5">
        <SelectField value={category} onChange={v => onCategoryChange(v as CategoryFilter)}>
          <option value="All">All Departments</option>
          {jobCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </SelectField>
      </div>

      {/* Type */}
      <div className="flex items-center px-4 py-2.5">
        <SelectField value={type} onChange={v => onTypeChange(v as TypeFilter)}>
          <option value="All">All Types</option>
          {(["Full-time", "Part-time", "Contract"] as const).map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </SelectField>
      </div>

      {/* Reset */}
      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors whitespace-nowrap"
        >
          <XCircle size={14} />
          Reset
        </button>
      )}

      {/* View toggle */}
      <div className="flex items-center gap-0.5 px-3 py-2 ml-auto">
        <button
          type="button"
          onClick={() => onViewChange("list")}
          aria-label="List view"
          className={`p-1.5 rounded-md transition-colors ${
            view === "list"
              ? "bg-neutral-100 text-neutral-900"
              : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <LayoutList size={15} />
        </button>
        <button
          type="button"
          onClick={() => onViewChange("grid")}
          aria-label="Grid view"
          className={`p-1.5 rounded-md transition-colors ${
            view === "grid"
              ? "bg-neutral-100 text-neutral-900"
              : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <LayoutGrid size={15} />
        </button>
      </div>

    </div>
  );
}
