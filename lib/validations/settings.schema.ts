import { z } from "zod";

const httpsUrl = z
  .string()
  .check(z.url("Must be a valid URL"))
  .refine((v) => v.startsWith("https://"), "URL must use HTTPS");

const optionalHttpsUrl = z
  .union([httpsUrl, z.literal("")])
  .optional()
  .transform((v) => v || undefined);

export const settingsSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be under 50 characters")
    .trim(),

  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(150, "Full name must be under 150 characters")
    .trim(),

  tagline: z
    .string()
    .min(1, "Tagline is required")
    .max(200, "Tagline must be under 200 characters")
    .trim(),

  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be under 500 characters")
    .trim(),

  logoUrl: z
    .string()
    .min(1, "Logo URL is required")
    .max(500, "Logo URL must be under 500 characters"),

  siteUrl: httpsUrl.max(200, "Site URL must be under 200 characters"),

  contactEmail: z
    .string()
    .min(1, "Contact email is required")
    .max(254, "Email must be under 254 characters")
    .check(z.email("Enter a valid email address"))
    .transform((v) => v.toLowerCase().trim()),

  whatsappNumber: z
    .union([
      z.string().check(z.regex(/^\+[1-9]\d{6,14}$/, "Must be in E.164 format (e.g. +2319876543)")),
      z.literal(""),
    ])
    .optional()
    .transform((v) => v || undefined),

  facebookUrl: z
    .union([
      httpsUrl.refine((v) => v.includes("facebook.com/"), "Must be a Facebook URL"),
      z.literal(""),
    ])
    .optional()
    .transform((v) => v || undefined),

  linkedinUrl: z
    .union([
      httpsUrl.refine((v) => v.includes("linkedin.com/"), "Must be a LinkedIn URL"),
      z.literal(""),
    ])
    .optional()
    .transform((v) => v || undefined),

  web3formsKey: z
    .string()
    .min(1, "Web3Forms key is required")
    .max(100, "Web3Forms key must be under 100 characters")
    .trim(),
});

export const pageSeoSchema = z.object({
  pageSlug: z
    .string()
    .min(1, "Page slug is required")
    .max(100, "Page slug must be under 100 characters")
    .check(z.regex(/^[a-z0-9/-]+$/, "Slug must be lowercase letters, numbers, hyphens, or slashes")),

  title: z
    .string()
    .max(70, "Title must be under 70 characters for SEO")
    .trim()
    .optional(),

  description: z
    .string()
    .max(160, "Description must be under 160 characters for SEO")
    .trim()
    .optional(),

  ogImageUrl: optionalHttpsUrl,
});

export type SettingsInput = z.infer<typeof settingsSchema>;
export type PageSeoInput = z.infer<typeof pageSeoSchema>;
