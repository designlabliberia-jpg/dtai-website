import { z } from "zod";

const nonEmptyStringArray = z
  .array(z.string().min(1).max(200))
  .min(1, "At least one item is required");

export const solutionSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be under 100 characters")
    .check(z.regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only")),

  title: z.string().min(1, "Title is required").max(150).trim(),

  summary: z
    .string()
    .min(1, "Summary is required")
    .max(300, "Summary must be under 300 characters")
    .trim(),

  overview: z
    .string()
    .min(1, "Overview is required")
    .max(2000, "Overview must be under 2000 characters")
    .trim(),

  focusAreas: nonEmptyStringArray.max(10, "Maximum 10 focus areas allowed"),
  proofPoints: nonEmptyStringArray.max(10, "Maximum 10 proof points allowed"),
  relatedServices: nonEmptyStringArray.max(10, "Maximum 10 related services allowed"),

  snippetFilename: z.string().max(100).trim().optional(),
  snippetLanguage: z.string().max(50).trim().optional(),
  snippetCode: z.string().max(5000, "Code snippet must be under 5000 characters").optional(),

  published: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export type SolutionInput = z.infer<typeof solutionSchema>;
