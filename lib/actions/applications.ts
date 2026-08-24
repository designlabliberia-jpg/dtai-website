"use server";

import { db } from "@/lib/db";
import { applicationSchema } from "@/lib/validations/application.schema";

export type ApplicationActionState =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function deleteApplication(id: string): Promise<void> {
  await db.jobApplication.update({ where: { id }, data: { deletedAt: new Date() } });
}

export async function submitApplication(
  _prev: ApplicationActionState | null,
  formData: FormData
): Promise<ApplicationActionState> {
  const parsed = applicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    role: formData.get("role"),
    coverLetter: formData.get("coverLetter"),
    resumeUrl: formData.get("resumeUrl"),
    linkedinUrl: formData.get("linkedinUrl"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const job = await db.jobListing.findUnique({
    where: { slug: parsed.data.role, deletedAt: null },
    select: { id: true, active: true },
  });

  if (!job || !job.active) {
    return { success: false, error: "This position is no longer accepting applications." };
  }

  await db.jobApplication.create({
    data: {
      jobListingId: job.id,
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      coverLetter: parsed.data.coverLetter,
      resumeUrl: parsed.data.resumeUrl ?? null,
      linkedinUrl: parsed.data.linkedinUrl ?? null,
    },
  });

  return { success: true };
}
