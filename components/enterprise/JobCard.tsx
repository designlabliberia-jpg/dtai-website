"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { JobListing } from "@/lib/careers-data";

interface Props {
  job: JobListing;
  onApply: () => void;
}

export function JobCard({ job, onApply }: Props) {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 220;
  const truncated = (job.aboutJob?.length ?? 0) > LIMIT;

  return (
    <div className="px-5 py-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col items-center text-center pb-5 border-b border-neutral-200">
        <Image src="/assets/dtai-logo.png" alt="DTAI" width={56} height={56} className="mb-3" />
        <h2 className="font-primary text-xl font-bold text-brand">{job.title},</h2>
        <p className="text-sm text-neutral-500">Digital Technology Agency Inc, Monrovia</p>
      </div>

      {/* Qualifications */}
      {job.minQualifications && <QualSection label="Minimum qualifications:" items={job.minQualifications} />}
      {job.preferredQualifications && <QualSection label="Preferred qualifications:" items={job.preferredQualifications} />}

      {/* About */}
      {job.aboutJob && (
        <div className="border-t border-neutral-200 pt-5">
          <p className="text-sm font-semibold text-neutral-900">About the Job:</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            {expanded || !truncated ? job.aboutJob : job.aboutJob.slice(0, LIMIT) + "…"}
          </p>
          {truncated && (
            <button onClick={() => setExpanded(v => !v)} className="mt-2 flex items-center gap-1 text-sm font-medium text-brand hover:text-tech-blue transition-colors">
              {expanded ? "Show less" : "Read More"}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="pt-2">
        <button onClick={onApply} className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white hover:bg-tech-blue transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}

function QualSection({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-neutral-900">{label}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-neutral-600 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
