import { z } from "zod";

/** Discovery-session capture schema — shared by the form and the API route (arch §2). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about what you're trying to achieve.")
    .max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
