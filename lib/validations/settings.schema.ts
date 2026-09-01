import { z } from "zod";

const httpsUrl = z
  .string()
  .check(z.url("Must be a valid URL"))
  .refine((v) => v.startsWith("https://"), "URL must use HTTPS");

const optionalHttpsUrl = z
  .union([httpsUrl, z.literal("")])
  .optional()
  .transform((v) => v || undefined);

/** E.164 — international numbers that always start with +country code (e.g. WhatsApp) */
const e164Phone = z
  .union([
    z.string().check(z.regex(/^\+[1-9]\d{6,14}$/, "Must be in E.164 format (e.g. +2319876543)")),
    z.literal(""),
  ])
  .optional()
  .transform((v) => v || undefined);

/**
 * Flexible phone — digits only, 6–15 chars.
 * Accepts toll-free (0800…), local (231…), or international without +.
 * The form strips non-digits before submitting; schema validates the result.
 */
const flexPhone = z
  .union([
    z
      .string()
      .check(z.regex(/^\d{4,15}$/, "Enter 4–15 digits, numbers only (e.g. 2319876543 or 08001234567)"))
      .transform((v) => v.trim()),
    z.literal(""),
  ])
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

  whatsappNumber: e164Phone,

  directLine: flexPhone,

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

const str = (max = 500) => z.string().max(max).trim().optional().default("");
const lines = () =>
  z.string().transform((v) =>
    v.split("\n").map((s) => s.trim()).filter(Boolean)
  ).pipe(z.string().array()).optional().default([]);

export const aboutProfileSchema = z.object({
  profileEyebrow:           str(100),
  profileHeading:           str(200),
  profileHeadingAccent:     str(200),
  profileParagraphs:        lines(),
  profilePrimaryImage:      str(),
  profilePrimaryImageAlt:   str(200),
  profileSecondaryImage:    str(),
  profileSecondaryImageAlt: str(200),
});

export const aboutMissionSchema = z.object({
  missionBody:              str(1000),
  missionPoints:            lines(),
  missionPrimaryImage:      str(),
  missionPrimaryImageAlt:   str(200),
  missionSecondaryImage:    str(),
  missionSecondaryImageAlt: str(200),
});

export const aboutVisionSchema = z.object({
  visionBody:              str(1000),
  visionPoints:            lines(),
  visionPrimaryImage:      str(),
  visionPrimaryImageAlt:   str(200),
  visionSecondaryImage:    str(),
  visionSecondaryImageAlt: str(200),
});

export const aboutValuesSchema = z.object({
  valuesLabels: lines(),
});

export const aboutCommitmentSchema = z.object({
  commitmentBody:              str(1000),
  commitmentPoints:            lines(),
  commitmentPrimaryImage:      str(),
  commitmentPrimaryImageAlt:   str(200),
  commitmentSecondaryImage:    str(),
  commitmentSecondaryImageAlt: str(200),
});

export const aboutWhySchema = z.object({
  whyTitle:         str(200),
  whyHeading:       str(200),
  whyHeadingAccent: str(200),
  why1Title: str(200), why1Description: str(1000),
  why2Title: str(200), why2Description: str(1000),
  why3Title: str(200), why3Description: str(1000),
  why4Title: str(200), why4Description: str(1000),
  why5Title: str(200), why5Description: str(1000),
  why6Title: str(200), why6Description: str(1000),
});

export const pageProfileSchema = z.object({
  careersEyebrow:          str(100),
  careersHeading:          str(200),
  careersHeadingAccent:    str(200),
  careersParagraphs:       lines(),
  careersPrimaryImageUrl:  str(),
  careersPrimaryImageAlt:  str(200),
  productsEyebrow:         str(100),
  productsHeading:         str(200),
  productsHeadingAccent:   str(200),
  productsParagraphs:      lines(),
  productsPrimaryImageUrl: str(),
  productsPrimaryImageAlt: str(200),
  servicesEyebrow:         str(100),
  servicesHeading:         str(200),
  servicesHeadingAccent:   str(200),
  servicesParagraphs:      lines(),
  servicesPrimaryImageUrl: str(),
  servicesPrimaryImageAlt: str(200),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
export type PageSeoInput = z.infer<typeof pageSeoSchema>;
