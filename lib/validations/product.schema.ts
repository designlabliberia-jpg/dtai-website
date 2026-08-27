import { z } from "zod";
import { cloudinaryOrRelativeUrl, optionalCloudinaryOrRelativeUrl } from "./shared";

const nonEmptyStringArray = z
  .array(z.string().min(1).max(200))
  .min(1, "At least one item is required");

export const productSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be under 100 characters")
    .check(z.regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only")),

  name: z
    .string()
    .min(1, "Name is required")
    .max(150, "Name must be under 150 characters")
    .trim(),

  tagline: z
    .string()
    .min(1, "Tagline is required")
    .max(200, "Tagline must be under 200 characters")
    .trim(),

  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be under 1000 characters")
    .trim(),

  status: z.enum(["In Development", "Published"]),

  imageUrl: cloudinaryOrRelativeUrl,

  features: nonEmptyStringArray.max(20, "Maximum 20 features allowed"),

  builtFor: nonEmptyStringArray.max(10, "Maximum 10 built-for entries allowed"),

  relatedCapabilities: z
    .array(z.string().min(1).max(100))
    .default([]),

  profileEyebrow: z.string().min(1, "Eyebrow is required").max(100).trim(),
  profileHeading: z.string().min(1, "Heading is required").max(150).trim(),
  profileHeadingAccent: z.string().max(150).trim().optional(),
  profileParagraphs: nonEmptyStringArray.max(10, "Maximum 10 paragraphs allowed"),
  profilePrimaryImageUrl: cloudinaryOrRelativeUrl,
  profilePrimaryImageAlt: z.string().min(1, "Alt text is required").max(200).trim(),
  profileSecondaryImageUrl: optionalCloudinaryOrRelativeUrl,
  profileSecondaryImageAlt: z.string().max(200).trim().optional(),

  published: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export type ProductInput = z.infer<typeof productSchema>;
