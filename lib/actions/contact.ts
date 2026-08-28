"use server";

import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations/contact.schema";
import { submitLead } from "@/lib/web3forms";

export type ContactActionState =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function deleteContactSubmission(id: string): Promise<void> {
  await db.contactSubmission.update({ where: { id }, data: { deletedAt: new Date() } });
}

export async function submitContact(
  _prev: ContactActionState | null,
  formData: FormData
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await db.contactSubmission.create({ data: parsed.data });

  // Fire-and-forget email backup — DB write already succeeded
  submitLead({
    name: parsed.data.name,
    email: parsed.data.email,
    category: "other",
    message: `[${parsed.data.subject}]\n\n${parsed.data.message}`,
    source: "contact-form",
  }).catch((err) => console.error("[web3forms] contact backup failed:", err));

  return { success: true };
}
