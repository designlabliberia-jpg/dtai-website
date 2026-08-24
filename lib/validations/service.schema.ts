import { z } from "zod";

const httpsOrRelativeUrl = z
  .string()
  .min(1, "Image URL is required")
  .max(500, "Image URL must be under 500 characters")
  .refine(
    (v) => v.startsWith("/") || v.startsWith("https://"),
    "Image URL must be a relative path or HTTPS URL"
  );

const nonEmptyStringArray = z
  .array(z.string().min(1).max(200))
  .min(1, "At least one item is required");

const methodologyStepSchema = z.object({
  title: z.string().min(1, "Step title is required").max(100).trim(),
  description: z.string().min(1, "Step description is required").max(500).trim(),
  icon: z.string().min(1, "Step icon is required").max(50).trim(),
  order: z.number().int().min(0).default(0),
});

export const serviceSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be under 100 characters")
    .check(z.regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only")),

  title: z.string().min(1, "Title is required").max(150).trim(),
  icon: z.string().min(1, "Icon is required").max(50).trim(),

  summary: z
    .string()
    .min(1, "Summary is required")
    .max(500, "Summary must be under 500 characters")
    .trim(),

  solutions: nonEmptyStringArray.max(20, "Maximum 20 solutions allowed"),

  methodology: z
    .array(methodologyStepSchema)
    .min(1, "At least one methodology step is required")
    .max(10, "Maximum 10 methodology steps allowed"),

  profileEyebrow: z.string().min(1, "Eyebrow is required").max(100).trim(),
  profileHeading: z.string().min(1, "Heading is required").max(150).trim(),
  profileHeadingAccent: z.string().max(150).trim().optional(),
  profileParagraphs: nonEmptyStringArray.max(10, "Maximum 10 paragraphs allowed"),
  profilePrimaryImageUrl: httpsOrRelativeUrl,
  profilePrimaryImageAlt: z.string().min(1, "Alt text is required").max(200).trim(),

  published: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
export type MethodologyStepInput = z.infer<typeof methodologyStepSchema>;
