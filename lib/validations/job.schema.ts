import { z } from "zod";

export const JOB_TYPES = ["Full-time", "Part-time", "Contract"] as const;
export const JOB_CATEGORIES = ["Engineering", "Design", "Data & AI", "Operations", "Management"] as const;

const nonEmptyStringArray = z
  .array(z.string().min(1).max(500))
  .min(1, "At least one item is required");

export const jobSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be under 100 characters")
    .check(z.regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only")),

  title: z.string().min(1, "Title is required").max(150).trim(),

  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be under 1000 characters")
    .trim(),

  location: z.string().min(1, "Location is required").max(150).trim(),

  type: z.enum(JOB_TYPES, { error: "Select a valid job type" }),

  category: z.enum(JOB_CATEGORIES, { error: "Select a valid category" }),

  minQualifications: nonEmptyStringArray.max(15, "Maximum 15 minimum qualifications allowed"),

  preferredQualifications: z
    .array(z.string().min(1).max(500))
    .max(15, "Maximum 15 preferred qualifications allowed")
    .default([]),

  aboutJob: z
    .string()
    .max(2000, "About job must be under 2000 characters")
    .trim()
    .optional(),

  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export type JobInput = z.infer<typeof jobSchema>;
