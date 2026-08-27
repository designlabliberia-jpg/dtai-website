import { z } from "zod";

const isCloudinaryOrRelative = (v: string) =>
  v.startsWith("/") || v.startsWith("https://res.cloudinary.com/");

export const cloudinaryOrRelativeUrl = z
  .string()
  .min(1, "Image URL is required")
  .max(500, "Image URL must be under 500 characters")
  .refine(isCloudinaryOrRelative, "Image URL must be a relative path or Cloudinary URL");

export const optionalCloudinaryOrRelativeUrl = z
  .string()
  .max(500)
  .refine((v) => !v || isCloudinaryOrRelative(v), "Must be a relative path or Cloudinary URL")
  .optional();
