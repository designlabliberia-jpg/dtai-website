"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Code2, Leaf, FileCheck2, Building2, AlertTriangle, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import type { Solution } from "@/lib/solutions-data";
import { solutionCategories, primaryCategory } from "@/lib/solution-categories";

const categoryIcon: Record<string, LucideIcon> = {
  "digital-technology": Code2,
  "environmental-technology": Leaf,
  "environmental-consulting": FileCheck2,
  "smart-city-infrastructure": Building2,
  "climate-disaster-management": AlertTriangle,
};

interface CategoryTheme {
  iconBg: string;
  iconText: string;
  topBar: string;
  chip: string;
}

const categoryTheme: Record<string, CategoryTheme> = {
  "digital-technology": {
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
    topBar: "bg-blue-500",
    chip: "bg-blue-50 text-blue-700",
  },
  "environmental-technology": {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    topBar: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700",
  },
  "environmental-consulting": {
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    topBar: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700",
  },
  "smart-city-infrastructure": {
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    topBar: "bg-violet-500",
    chip: "bg-violet-50 text-violet-700",
  },
  "climate-disaster-management": {
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
    topBar: "bg-rose-500",
    chip: "bg-rose-50 text-rose-700",
  },
};

function SolutionCard({ solution }: { solution: Solution }) {
  const category = primaryCategory(solution.relatedServices);
  const Icon = categoryIcon[category] ?? Layers;
  const theme = categoryTheme[category] ?? categoryTheme["digital-technology"];
  const tags = solution.focusAreas.slice(0, 2);
  const codeLines = solution.snippet?.code.split("\n").filter(Boolean).slice(0, 2) ?? [];

  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-neutral-300/60 bg-white p-5 sm:p-6 transition-all duration-standard hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-standard group-hover:scale-x-100 ${theme.topBar}`}
        aria-hidden
      />

      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md transition-colors duration-standard group-hover:bg-neutral-900 ${theme.iconBg}`}>
        <Icon size={20} className={`transition-colors duration-standard group-hover:text-white ${theme.iconText}`} strokeWidth={1.75} />
      </div>

      <h3 className="mt-5 font-primary text-lg font-semibold text-neutral-900 transition-colors duration-micro group-hover:text-brand">
        {solution.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{solution.summary}</p>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ${theme.chip}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {codeLines.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-md bg-infra-midnight">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="ml-2 truncate font-technical text-[10px] text-white/50">
              {solution.snippet?.filename}
            </span>
          </div>
          <pre className="overflow-hidden px-3 py-2 font-technical text-[11px] leading-relaxed">
            {codeLines.map((line, i) => (
              <code
                key={i}
                className={`block truncate ${i === 0 ? "text-tech-blue/90" : "text-white/40"}`}
              >
                {line}
              </code>
            ))}
          </pre>
        </div>
      )}

      <span className="mt-4 inline-flex items-center gap-1 pt-2 font-technical text-xs uppercase tracking-wide text-brand">
        View solution
        <span className="transition-transform duration-micro group-hover:translate-x-1">&rarr;</span>
      </span>
    </Link>
  );
}

export function SolutionsExplorer({ solutions }: { solutions: Solution[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of solutions) {
      const cat = primaryCategory(s.relatedServices);
      map[cat] = (map[cat] ?? 0) + 1;
    }
    return map;
  }, [solutions]);

  const visibleCategories =
    activeCategory === "all"
      ? solutionCategories
      : solutionCategories.filter((c) => c.id === activeCategory);

  const q = query.trim().toLowerCase();

  function solutionsFor(categoryId: string) {
    return solutions
      .filter((s) => primaryCategory(s.relatedServices) === categoryId)
      .filter(
        (s) =>
          q === "" ||
          s.title.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q)
      );
  }

  const totalVisible = visibleCategories.reduce(
    (sum, c) => sum + solutionsFor(c.id).length,
    0
  );

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-10 space-y-5 sm:mb-12 sm:space-y-6">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search solutions..."
              className="w-full rounded-md border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-tech-blue focus:outline-none focus:ring-1 focus:ring-tech-blue"
            />
          </div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-micro sm:text-sm ${
                activeCategory === "all"
                  ? "bg-brand text-white"
                  : "border border-neutral-300 text-neutral-600 hover:border-tech-blue hover:text-brand"
              }`}
            >
              All Solutions ({solutions.length})
            </button>
            {solutionCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-micro sm:text-sm ${
                  activeCategory === c.id
                    ? "bg-brand text-white"
                    : "border border-neutral-300 text-neutral-600 hover:border-tech-blue hover:text-brand"
                }`}
              >
                {c.shortLabel} ({counts[c.id] ?? 0})
              </button>
            ))}
          </div>
        </div>

        {totalVisible === 0 && (
          <p className="py-16 text-center text-neutral-500">
            No solutions match &ldquo;{query}&rdquo;. Try a different search term.
          </p>
        )}

        <div className="space-y-16 sm:space-y-20">
          {visibleCategories.map((category) => {
            const items = solutionsFor(category.id);
            if (items.length === 0) return null;
            const Icon = categoryIcon[category.id] ?? Layers;
            const theme = categoryTheme[category.id];
            return (
              <div key={category.id}>
                <div className="mb-6 flex items-start gap-3 border-b border-neutral-200 pb-5 sm:mb-8 sm:gap-4 sm:pb-6">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${theme.iconBg}`}>
                    <Icon size={18} className={theme.iconText} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-primary text-lg font-semibold text-neutral-900 sm:text-xl">
                      {category.label}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">{category.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {items.map((s) => (
                    <SolutionCard key={s.slug} solution={s} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
