"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import {
  type ContactStatus,
  INQUIRY_OPTIONS,
  inputClass,
  handlePhoneKeyDown,
  handlePhonePaste,
  extractContactFields,
  validateContactForm,
  submitContactForm,
} from "@/lib/contact-form";

interface ContactFormProps {
  web3formsKey?: string;
}

export function ContactForm({ web3formsKey }: ContactFormProps) {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = validateContactForm(extractContactFields(new FormData(e.currentTarget)));

    if (!result.ok) {
      setFieldErrors(result.errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    const success = await submitContactForm(result, web3formsKey);
    setStatus(success ? "submitted" : "error");
  }

  if (status === "submitted") {
    return (
      <div className="flex flex-col items-center rounded-lg border border-tech-blue/40 bg-tech-blue/5 p-10 text-center">
        <CheckCircle2 size={28} className="text-tech-blue" strokeWidth={1.75} />
        <p className="mt-4 text-sm font-medium text-neutral-900">Message received.</p>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-neutral-600">
          A member of the DTAI team will respond within 1–2 business days.
          You&rsquo;ll hear from us at the email address you provided.
        </p>
      </div>
    );
  }

  const disabled = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-900">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name" name="name" type="text" autoComplete="name"
            placeholder="John Mulbah" disabled={disabled}
            className={inputClass(!!fieldErrors.name)}
          />
          {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-neutral-900">
            Organization <span className="text-red-600">*</span>
          </label>
          <input
            id="organization" name="organization" type="text" autoComplete="organization"
            placeholder="Acme Corporation" disabled={disabled}
            className={inputClass(!!fieldErrors.organization)}
          />
          {fieldErrors.organization && <p className="mt-1 text-xs text-red-600">{fieldErrors.organization}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-900">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email" name="email" type="email" autoComplete="email"
            placeholder="craft@example.com" disabled={disabled}
            className={inputClass(!!fieldErrors.email)}
          />
          {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-900">
            Phone <span className="text-neutral-500 font-normal">(optional)</span>
          </label>
          <input
            id="phone" name="phone" type="tel" autoComplete="tel"
            placeholder="Include country code (e.g. +1)" inputMode="tel" disabled={disabled}
            onKeyDown={handlePhoneKeyDown} onPaste={handlePhonePaste}
            className={inputClass(!!fieldErrors.phone)}
          />
          {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p> }
        </div>
      </div>

      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium text-neutral-900">
          Inquiry Type <span className="text-red-600">*</span>
        </label>
        <select
          id="inquiryType" name="inquiryType" disabled={disabled} defaultValue=""
          className={inputClass(!!fieldErrors.inquiryType, "bg-white")}
        >
          <option value="" disabled>Select an inquiry type</option>
          {INQUIRY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {fieldErrors.inquiryType && <p className="mt-1 text-xs text-red-600">{fieldErrors.inquiryType}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-900">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message" name="message" rows={3} disabled={disabled}
          placeholder="Tell us about your organization, timeline, and what you're looking to build."
          className={inputClass(!!fieldErrors.message, "rounded-lg")}
        />
        {fieldErrors.message && <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-md border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>Something went wrong sending your message. Please try again, or email us directly.</span>
        </div>
      )}

      <button
        type="submit" disabled={disabled}
        className="inline-flex items-center gap-2 rounded-md border border-brand bg-brand px-6 py-3 text-sm font-semibold text-white transition-all duration-micro hover:bg-transparent hover:text-brand disabled:opacity-70"
      >
        {disabled ? (
          <><Loader2 size={16} className="animate-spin" /> Sending...</>
        ) : "Send Message"}
      </button>

      {Object.keys(fieldErrors).length > 0 && (
        <p className="font-technical text-[11px] text-neutral-600">
          Fields marked <span className="text-red-600">*</span> are required.
        </p>
      )}
    </form>
  );
}
