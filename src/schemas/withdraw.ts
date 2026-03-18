// @/schemas/withdraw.ts
import * as z from "zod";

export const getWithdrawSchema = (maxAmount?: number) =>
  z.object({
    amount: z
      .string()
      .min(1, "Amount is required")
      .refine((val) => !isNaN(Number(val)), "Must be a valid number")
      .refine((val) => Number(val) >= 50, "Minimum withdrawal is KES 50/-")
      // Check if maxAmount exists. If not, return true (valid).
      .refine(
        (val) => {
          if (maxAmount === undefined) return true;
          return Number(val) <= maxAmount;
        },
        {
          // We use a static string here, or an interpolated one since
          // maxAmount is available in the closure of the outer function.
          message: maxAmount
            ? `Maximum withdrawable is KES ${Math.floor(maxAmount).toLocaleString()}/-`
            : "Exceeds balance",
        },
      ),
    phone: z
      .string()
      .regex(
        /^(?:254|\+254|0)?(7|1)(?:(?:[0-9][0-9])|(?:0[0-3]))[0-9]{6}$/,
        "Enter a valid Safaricom number",
      ),
  });

export type WithdrawFormValues = z.infer<ReturnType<typeof getWithdrawSchema>>;
