"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { jobListings, jobCategories } from "@/lib/careers-data";
import type { JobCategory } from "@/lib/careers-data";
import { CareersInterestForm } from "./CareersInterestForm";

type Filter = "All" | JobCategory;

export function OpenPositions() {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All"
      ? jobListings
      : jobListings.filter((j) => j.category === active);

  return (
    <section className="bg-white sm:py-8">
      <Container className="max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
          <span className="w-1 h-6 bg-brand" />
          <h1 className="font-technical text-sm uppercase tracking-widest text-neutral-500 whitespace-nowrap">Currently Open Positions</h1>
          <span className="w-1 h-6 bg-brand" />
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        </div>

        {/* Filter tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(["All", ...jobCategories] as Filter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${active === cat
                  ? "border-brand bg-brand text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400"
                }`}
            >
              {cat === "All" ? "View all" : cat}
            </button>
          ))}
        </div>

        {/* Job rows */}
        <div className="mt-8 divide-y divide-neutral-200">
          {filtered.length === 0 ? (
           <div className="mt-6 rounded-lg border border-neutral-300/60 p-6 sm:p-8">
            <CareersInterestForm />
            </div>
          ) : (
            filtered.map((job) => (
              <div key={job.id} className="py-7 border-b border-neutral-300 bg-white text-brand-700 hover:border-brand-400">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-primary text-lg font-bold text-brand">
                      {job.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      {job.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-700">
                        <MapPin size={11} strokeWidth={1.75} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-700">
                        <Clock size={11} strokeWidth={1.75} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={job.applyUrl}
                    className="flex shrink-0 items-center gap-1 font-primary text-base font-bold text-brand-500 hover:text-brand transition-colors"
                  >
                    Apply <ArrowUpRight size={16} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
