import { z } from "zod";

export const chatModeSchema = z.enum(["listener", "laugh", "brainstorm"]);

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1, "Message is required"),
  mode: chatModeSchema,
  affectiveState: z.string().trim().optional(),
  stressScore: z.coerce.number().min(0).max(100).optional(),
  name: z.string().trim().optional(),
});

export const brainDumpRequestSchema = z.object({
  text: z.string().trim().min(1, "Brain dump text is required"),
  mood: z.string().trim().optional(),
  sleep: z.coerce.number().min(0).max(24).optional(),
});
