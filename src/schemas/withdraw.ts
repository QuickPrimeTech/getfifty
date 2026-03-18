// @/schemas/withdraw.ts
import * as z from "zod";

export const withdrawSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    // Updated logic for 10/- minimum
    .refine((val) => Number(val) >= 10, "Minimum withdrawal is KES 10/-"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => /^0[0-9]{9}$/.test(val) || /^[0-9]{9}$/.test(val),
      "Enter a valid Kenyan phone number (e.g. 0712345678)",
    ),
});

export type WithdrawFormValues = z.infer<typeof withdrawSchema>;
