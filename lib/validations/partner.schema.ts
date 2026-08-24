import { z } from "zod";

export const PARTNER_TYPES = ["logo", "category"] as const;

const httpsOrRelativeUrl = z
  .string()
  .min(1, "Image URL is required")
  .max(500, "Image URL must be under 500 characters")
  .refine(
    (v) => v.startsWith("/") || v.startsWith("https://"),
    "Image URL must be a relative path or HTTPS URL"
  );

export const partnerSchema = z.object({
  title: z.string().min(1, "Title is required").max(150).trim(),

  logoUrl: httpsOrRelativeUrl,

  type: z.enum(PARTNER_TYPES, { error: "Select a valid partner type" }),

  slug: z
    .string()
    .max(100, "Slug must be under 100 characters")
    .check(z.regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"))
    .optional(),

  summary: z
    .string()
    .max(500, "Summary must be under 500 characters")
    .trim()
    .optional(),

  points: z
    .array(z.string().min(1).max(300))
    .max(10, "Maximum 10 points allowed")
    .default([]),

  order: z.number().int().min(0).default(0),
}).refine(
  (data) => data.type === "logo" || (data.slug && data.slug.length > 0),
  { message: "Slug is required for category partners", path: ["slug"] }
);

export type PartnerInput = z.infer<typeof partnerSchema>;
