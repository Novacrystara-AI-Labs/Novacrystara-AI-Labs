import { z } from "zod";

/**
 * Nova Helix live-demo request schema — separate from the general discovery
 * form: it captures hiring context (roles, volume, ATS) so the demo can be run
 * against the company's real requisitions. Shared by the form and /api/contact.
 */
export const hiringVolumes = [
  "1–5 hires / year",
  "6–25 hires / year",
  "26–100 hires / year",
  "100+ hires / year",
] as const;

export const novaHelixDemoSchema = z.object({
  kind: z.literal("nova-helix-demo"),
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid work email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(25)
    .regex(/^[+\d][\d\s()-]{5,}$/, "Please enter a valid phone number."),
  company: z.string().trim().min(2, "Please enter your company name.").max(120),
  jobTitle: z.string().trim().max(120).optional().or(z.literal("")),
  hiringVolume: z.enum(hiringVolumes, { message: "Please choose your hiring volume." }),
  roles: z
    .string()
    .trim()
    .min(3, "Which roles are you hiring for?")
    .max(300),
  ats: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type NovaHelixDemoInput = z.infer<typeof novaHelixDemoSchema>;
