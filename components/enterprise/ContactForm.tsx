"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const inquiryTypes = [
  { value: "government", label: "Government Executive" },
  { value: "technical", label: "Technical Director / CIO" },
  { value: "procurement", label: "Procurement Officer" },
  { value: "partner", label: "International Partner" },
  { value: "other", label: "Other" },
];

type Status = "idle" | "submitting" | "submitted";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // TODO: wire to backend/email service — see outstanding item #4
    setTimeout(() => setStatus("submitted"), 600);
  }

  if (status === "submitted") {
    return (
      <div className="flex flex-col items-center rounded-lg border border-tech-blue/40 bg-tech-blue/5 p-10 text-center">
        <CheckCircle2 size={28} className="text-tech-blue" strokeWidth={1.75} />
        <p className="mt-4 text-sm font-medium text-neutral-900">
          Message received.
        </p>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-neutral-600">
          A member of the DTAI team will respond within 1–2 business days.
          You&rsquo;ll hear from us at the email address you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-900">
            Full Name <span className="text-tech-blue">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={status === "submitting"}
            className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-neutral-900">
            Organization <span className="text-tech-blue">*</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            required
            disabled={status === "submitting"}
            className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-900">
            Email <span className="text-tech-blue">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === "submitting"}
            className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-900">
            Phone <span className="text-neutral-600">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={status === "submitting"}
            className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
          />
        </div>
      </div>

      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium text-neutral-900">
          I am a... <span className="text-tech-blue">*</span>
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          disabled={status === "submitting"}
          className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
        >
          <option value="">Select one</option>
          {inquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-900">
          Message <span className="text-tech-blue">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={status === "submitting"}
          placeholder="Tell us about your organization, timeline, and what you're looking to build."
          className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-micro hover:bg-tech-blue disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="font-technical text-[11px] text-neutral-600">
        Fields marked <span className="text-tech-blue">*</span> are required.
        Submissions are not yet connected to a live email service — this is
        currently a UI preview.
      </p>
    </form>
  );
}
