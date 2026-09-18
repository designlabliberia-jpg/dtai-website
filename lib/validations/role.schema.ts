import { z } from "zod";
import { PERMISSIONS } from "@/lib/permissions";

const permissionKeys = Object.keys(PERMISSIONS) as [string, ...string[]];

export const roleSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50)
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
  label: z.string().min(2, "Label is required").max(80),
  permissions: z.record(z.enum(permissionKeys), z.boolean()).default({}),
});

export type RoleInput = z.infer<typeof roleSchema>;
