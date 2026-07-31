"use client";

import { useState } from "react";
import { MapPin, Clock, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { jobListings, jobCategories } from "@/lib/careers-data";
import type { JobCategory, JobListing } from "@/lib/careers-data";
import { CareersInterestForm } from "./CareersInterestForm";
import { JobDetailPanel } from "./JobDetailPanel";
import { JobCard } from "./JobCard";

type Filter = "All" | JobCategory;

const spring = { type: "spring", damping: 30, stiffness: 300 } as const;

export function OpenPositions() {
  const [active, setActive] = useState<Filter>("All");
  const [selected, setSelected] = useState<JobListing | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);

  const filtered = active === "All" ? jobListings : jobListings.filter(j => j.category === active);

  const panelContent = selected && (
    <>
      {!applyOpen
        ? <JobCard job={selected} onApply={() => setApplyOpen(true)} />
        : <div className="px-5 py-6 space-y-4">
            <button onClick={() => setApplyOpen(false)} className="text-sm text-neutral-500 hover:text-brand transition-colors">← Back</button>
            <CareersInterestForm />
          </div>
      }
    </>
  );

  return (
    <section className="bg-white sm:py-8">
      <Container className="max-w-6xl">

        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
          <span className="w-1 h-6 bg-brand" />
          <h1 className="font-technical text-sm uppercase tracking-widest text-neutral-500 whitespace-nowrap">Currently Open Positions</h1>
          <span className="w-1 h-6 bg-brand" />
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["All", ...jobCategories] as Filter[]).map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${active === cat ? "border-brand bg-brand text-white" : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400"}`}>
              {cat === "All" ? "View all" : cat}
            </button>
          ))}
        </div>

        {/* Two-column row — both start at the same point, below filters */}
        <div className="flex gap-6 items-start">

          {/* Left — job cards */}
          <div className="min-w-0 flex-1 space-y-3">
            {filtered.length === 0
              ? <div className="rounded-lg border border-neutral-300/60 p-6 sm:p-8"><CareersInterestForm /></div>
              : filtered.map(job => (
                <div key={job.id}
                  onClick={() => { setSelected(job); setApplyOpen(false); }}
                  className={`cursor-pointer rounded-xl border p-5 transition-all ${selected?.id === job.id ? "border-brand bg-brand/5 shadow-sm" : "border-neutral-200 bg-white hover:border-brand/40 hover:shadow-sm"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="font-primary text-base font-bold text-brand">{job.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-500 line-clamp-2">{job.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"><MapPin size={11} strokeWidth={1.75} />{job.location}</span>
                        <span className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"><Clock size={11} strokeWidth={1.75} />{job.type}</span>
                        <span className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600">{job.category}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} strokeWidth={2} className={`shrink-0 mt-0.5 transition-colors ${selected?.id === job.id ? "text-brand" : "text-neutral-400"}`} />
                  </div>
                </div>
              ))
            }
          </div>

          {/* Right — sticky detail panel, desktop only, inline in the same row */}
          <AnimatePresence>
            {selected && (
              <motion.div
                key="detail"
                className="hidden lg:flex flex-col w-[42%] shrink-0 sticky top-6 self-start rounded-xl border border-neutral-200 bg-white shadow-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={spring}
              >
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 shrink-0">
                  <span className="text-xs font-technical uppercase tracking-widest text-neutral-400">Job Details</span>
                  <button onClick={() => setSelected(null)} aria-label="Close" className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 transition-colors"><X size={18} /></button>
                </div>
                <div>{panelContent}</div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </Container>

      {/* Mobile — bottom-sheet */}
      <div className="lg:hidden">
        <JobDetailPanel open={!!selected} onClose={() => setSelected(null)}>
          {panelContent}
        </JobDetailPanel>
      </div>
    </section>
  );
}
