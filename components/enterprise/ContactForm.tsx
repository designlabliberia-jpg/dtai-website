"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitLead } from "@/lib/web3forms";

const inquiryTypes = [
  { value: "government", label: "Government Executive" },
  { value: "technical", label: "Technical Director / CIO" },
  { value: "procurement", label: "Procurement Officer" },
  { value: "partner", label: "International Partner" },
  { value: "other", label: "Other" },
];

type Status = "idle" | "submitting" | "submitted" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    const success = await submitLead({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      organization: String(form.get("organization") ?? ""),
      phone: String(form.get("phone") ?? ""),
      category: String(form.get("inquiryType") ?? "other"),
      message: String(form.get("message") ?? ""),
      source: "contact-form",
    });

    setStatus(success ? "submitted" : "error");
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
          rows={3}
          required
          disabled={status === "submitting"}
          placeholder="Tell us about your organization, timeline, and what you're looking to build."
          className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-md border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>Something went wrong sending your message. Please try again, or email us directly.</span>
        </div>
      )}

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
      </p>
    </form>
  );
}
