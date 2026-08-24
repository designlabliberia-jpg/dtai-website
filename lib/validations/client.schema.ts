import { z } from "zod";

const e164Phone = z
  .string()
  .check(z.regex(/^\+[1-9]\d{6,14}$/, "Phone must be in E.164 format (e.g. +2319876543)"));

export const CLIENT_STATUSES = [
  "lead",
  "proposal_sent",
  "negotiating",
  "won",
  "lost",
] as const;

export type ClientStatus = (typeof CLIENT_STATUSES)[number];

export const clientSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(200, "Company name must be under 200 characters")
    .trim(),

  contactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(100, "Contact name must be under 100 characters")
    .check(z.regex(/^[\p{L}\p{M}'\-\s]+$/u, "Contact name contains invalid characters")),

  contactEmail: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email must be under 254 characters")
    .check(z.email("Enter a valid email address"))
    .transform((v) => v.toLowerCase().trim()),

  contactPhone: z
    .union([e164Phone, z.literal("")])
    .optional()
    .transform((v) => v || undefined),

  serviceInterest: z
    .string()
    .max(200, "Service interest must be under 200 characters")
    .trim()
    .optional(),

  status: z.enum(CLIENT_STATUSES, { error: "Select a valid status" }).default("lead"),

  estimatedValue: z
    .number()
    .positive("Estimated value must be greater than zero")
    .max(100_000_000, "Estimated value exceeds maximum allowed")
    .optional(),
});

export const clientNoteSchema = z.object({
  note: z
    .string()
    .min(1, "Note cannot be empty")
    .max(2000, "Note must be under 2000 characters")
    .trim(),
});

export type ClientInput = z.infer<typeof clientSchema>;
export type ClientNoteInput = z.infer<typeof clientNoteSchema>;
