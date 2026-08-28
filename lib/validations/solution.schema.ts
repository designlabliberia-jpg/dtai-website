import { z } from "zod";

export const solutionSchema = z.object({
  title: z.string().min(1, "Title is required").max(150).trim(),
  summary: z.string().min(1, "Summary is required").max(300).trim(),
  serviceId: z.string().cuid().optional(),
  published: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export type SolutionInput = z.infer<typeof solutionSchema>;
