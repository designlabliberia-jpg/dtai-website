"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitLead } from "@/lib/web3forms";

type Status = "idle" | "submitting" | "submitted" | "error";

export function CareersInterestForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    const areaOfInterest = String(form.get("areaOfInterest") ?? "");
    const portfolio = String(form.get("portfolio") ?? "");
    const message = String(form.get("message") ?? "");

    const fullMessage = [
      `Area of Interest: ${areaOfInterest}`,
      portfolio ? `Portfolio / LinkedIn: ${portfolio}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const success = await submitLead({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      category: "careers",
      message: fullMessage,
      source: "careers-form",
    });

    setStatus(success ? "submitted" : "error");
  }

  if (status === "submitted") {
    return (
      <div className="flex flex-col items-center rounded-lg border border-tech-blue/40 bg-tech-blue/5 p-10 text-center">
        <CheckCircle2 size={28} className="text-tech-blue" strokeWidth={1.75} />
        <p className="mt-4 text-sm font-medium text-neutral-900">
          Thanks for reaching out.
        </p>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-neutral-600">
          We&rsquo;ve received your details. If a relevant opportunity comes
          up, someone from DTAI will be in touch.
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
      </div>

      <div>
        <label htmlFor="areaOfInterest" className="block text-sm font-medium text-neutral-900">
          Area of Interest <span className="text-tech-blue">*</span>
        </label>
        <input
          id="areaOfInterest"
          name="areaOfInterest"
          type="text"
          required
          placeholder="e.g. Software Engineering, Cybersecurity, IT Consulting"
          disabled={status === "submitting"}
          className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="portfolio" className="block text-sm font-medium text-neutral-900">
          Portfolio / LinkedIn <span className="text-neutral-500">(optional)</span>
        </label>
        <input
          id="portfolio"
          name="portfolio"
          type="url"
          placeholder="https://..."
          disabled={status === "submitting"}
          className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-900">
          Tell us about yourself <span className="text-tech-blue">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Your background, what you're looking for, and why DTAI."
          disabled={status === "submitting"}
          className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:border-tech-blue focus:ring-2 focus:ring-tech-blue/20 disabled:opacity-60"
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
          "Submit Interest"
        )}
      </button>
    </form>
  );
}
