import { z } from "zod";

export const accountSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z
    .string()
    .regex(
      /^(?:254|\+254|0)?(7|1)(?:(?:[0-9][0-9])|(?:0[0-3]))[0-9]{6}$/,
      "Enter a valid Safaricom number",
    ),
  email: z.string().email("Invalid email address"),
});

export type AccountFormValues = z.infer<typeof accountSchema>;
