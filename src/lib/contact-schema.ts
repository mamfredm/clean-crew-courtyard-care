import { z } from "zod";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?[\d\s()/-]{6,}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Bitte gebt euren Namen an." })
    .max(100, { message: "Der Name darf höchstens 100 Zeichen lang sein." }),
  contact: z
    .string()
    .trim()
    .max(255, { message: "Höchstens 255 Zeichen." })
    .refine((v) => emailRe.test(v) || phoneRe.test(v), {
      message: "Bitte eine gültige Telefonnummer oder E-Mail-Adresse angeben.",
    }),
  service: z
    .string()
    .trim()
    .min(1, { message: "Bitte wählt eine Dienstleistung aus." })
    .max(100),
  location: z
    .string()
    .trim()
    .min(2, { message: "Bitte gebt den Einsatzort an." })
    .max(200, { message: "Höchstens 200 Zeichen." }),
  message: z.string().trim().max(2000, { message: "Höchstens 2000 Zeichen." }).default(""),
  /** Honeypot gegen Spam-Bots – muss leer bleiben. */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
