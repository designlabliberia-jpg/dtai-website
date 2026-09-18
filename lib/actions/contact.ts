"use server";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/rbac";
import { contactSchema } from "@/lib/validations/contact.schema";
import { submitLead } from "@/lib/web3forms";

export type ContactActionState =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function deleteContactSubmission(id: string): Promise<void> {
  await requirePermission("contact:write");
  await db.contactSubmission.update({ where: { id }, data: { deletedAt: new Date() } });
}

export async function submitContact(
  _prev: ContactActionState | null,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    organization: String(formData.get("organization") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    inquiryType: String(formData.get("inquiryType") ?? ""),
    message: String(formData.get("message") ?? "").trim(),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await db.contactSubmission.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.inquiryType,
      message: parsed.data.message,
    },
  });

  // Fire-and-forget email backup — DB write already succeeded
  submitLead({
    name: parsed.data.name,
    email: parsed.data.email,
    organization: parsed.data.organization,
    phone: parsed.data.phone ?? "",
    category: parsed.data.inquiryType,
    message: parsed.data.message,
    source: "contact-form",
  }).catch((err) => console.error("[web3forms] contact backup failed:", err));

  return { success: true };
}
