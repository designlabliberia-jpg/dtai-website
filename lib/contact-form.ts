import { contactSchema } from "@/lib/validations/contact.schema";
import { submitLead } from "@/lib/web3forms";

export type ContactStatus = "idle" | "submitting" | "submitted" | "error";

export const INQUIRY_OPTIONS = [
  { value: "government", label: "Government Executive" },
  { value: "technical", label: "Technical Director / CIO" },
  { value: "procurement", label: "Procurement Officer" },
  { value: "partner", label: "International Partner" },
  { value: "careers", label: "Careers / Talent Interest" },
  { value: "other", label: "General Inquiry" },
] as const;

const BASE_INPUT =
  "mt-2 w-full rounded-md border px-4 py-2.5 text-base text-neutral-900 outline-none sm:text-sm transition-colors duration-micro focus:ring-2 disabled:opacity-60";
const VALID = "border-neutral-300 focus:border-tech-blue focus:ring-tech-blue/20";
const INVALID = "border-red-400 focus:border-red-400 focus:ring-red-400/20";

export function inputClass(hasError: boolean, extra = "") {
  return `${BASE_INPUT} ${hasError ? INVALID : VALID}${extra ? ` ${extra}` : ""}`;
}

export function handlePhoneKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
  if (allowed.includes(e.key)) return;
  const input = e.currentTarget;
  if (e.key === "+" && input.selectionStart === 0 && !input.value.startsWith("+")) return;
  if (!/^\d$/.test(e.key)) e.preventDefault();
}

export function handlePhonePaste(e: React.ClipboardEvent<HTMLInputElement>) {
  e.preventDefault();
  const pasted = e.clipboardData.getData("text").replace(/[^\d+]/g, "");
  const sanitized = pasted.startsWith("+")
    ? "+" + pasted.slice(1).replace(/\+/g, "")
    : pasted.replace(/\+/g, "");
  const input = e.currentTarget;
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? 0;
  const merged = input.value.slice(0, start) + sanitized + input.value.slice(end);
  input.value = merged.replace(/(?!^)\+/g, "");
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

export function extractContactFields(form: FormData) {
  return {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    organization: String(form.get("organization") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim() || undefined,
    inquiryType: String(form.get("inquiryType") ?? ""),
    message: String(form.get("message") ?? "").trim(),
  };
}

export function validateContactForm(raw: ReturnType<typeof extractContactFields>) {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return {
      ok: false as const,
      errors: Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? ""])),
    };
  }
  return { ok: true as const, data: parsed.data };
}

export async function submitContactForm(
  data: ReturnType<typeof validateContactForm> & { ok: true },
  web3formsKey?: string
) {
  return submitLead(
    {
      name: data.data.name,
      email: data.data.email,
      organization: data.data.organization,
      phone: data.data.phone ?? "",
      category: data.data.inquiryType,
      message: data.data.message,
      source: "contact-form",
    },
    web3formsKey
  );
}
