"use server";

import { db } from "@/lib/db";
import { clientSchema, clientNoteSchema } from "@/lib/validations/client.schema";
import type { ClientStatus } from "@/lib/validations/client.schema";

export type ClientActionState =
  | { success: true; id?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createClient(
  _prev: ClientActionState | null,
  formData: FormData
): Promise<ClientActionState> {
  const parsed = clientSchema.safeParse({
    companyName: formData.get("companyName"),
    contactName: formData.get("contactName"),
    contactEmail: formData.get("contactEmail"),
    contactPhone: formData.get("contactPhone"),
    serviceInterest: formData.get("serviceInterest"),
    status: formData.get("status") ?? "lead",
    estimatedValue: formData.get("estimatedValue")
      ? Number(formData.get("estimatedValue"))
      : undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const client = await db.client.create({ data: parsed.data });
  return { success: true, id: client.id };
}

export async function updateClient(
  id: string,
  _prev: ClientActionState | null,
  formData: FormData
): Promise<ClientActionState> {
  const parsed = clientSchema.safeParse({
    companyName: formData.get("companyName"),
    contactName: formData.get("contactName"),
    contactEmail: formData.get("contactEmail"),
    contactPhone: formData.get("contactPhone"),
    serviceInterest: formData.get("serviceInterest"),
    status: formData.get("status") ?? "lead",
    estimatedValue: formData.get("estimatedValue")
      ? Number(formData.get("estimatedValue"))
      : undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await db.client.update({ where: { id }, data: parsed.data });
  return { success: true };
}

export async function updateClientStatus(id: string, status: ClientStatus): Promise<void> {
  await db.client.update({ where: { id }, data: { status } });
}

export async function deleteClient(id: string): Promise<void> {
  await db.client.update({ where: { id }, data: { deletedAt: new Date() } });
}

export async function deleteClientNote(id: string): Promise<void> {
  await db.clientNote.update({ where: { id }, data: { deletedAt: new Date() } });
}

export async function addClientNote(
  clientId: string,
  _prev: ClientActionState | null,
  formData: FormData
): Promise<ClientActionState> {
  const parsed = clientNoteSchema.safeParse({ note: formData.get("note") });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await db.clientNote.create({ data: { clientId, note: parsed.data.note } });
  return { success: true };
}
