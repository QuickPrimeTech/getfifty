"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useUserQuery } from "@/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";

// Static schema
const withdrawSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Amount must be greater than 0"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => /^0[0-9]{9}$/.test(val) || /^[0-9]{9}$/.test(val),
      "Enter a valid Kenyan phone number (e.g. 0712345678)",
    ),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

export const WithdrawalForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isLoading } = useDashboardStats();
  const { data: user, isLoading: isUserLoading } = useUserQuery();

  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: "",
      phone: user?.phone || "",
    },
  });

  async function onSubmit(values: WithdrawFormValues) {
    const amount = Number(values.amount);

    if (!data) return; // safety check

    // Check balance
    if (amount > data.balance) {
      toast.error("Insufficient balance", {
        description: `Cannot withdraw more than ${data.balance.toLocaleString()}/-`,
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast("Withdrawal request submitted", {
      description: `KES ${amount.toLocaleString()} will be sent to ${values.phone}`,
      position: "bottom-right",
    });

    form.reset();
    setIsSubmitting(false);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardDescription className="text-xs text-muted-foreground uppercase tracking-widest">
                Available Balance
              </CardDescription>
              {isLoading ? (
                // Skeleton
                <div className="h-8 w-24 bg-muted rounded animate-pulse" />
              ) : (
                <CardTitle className="payout-text text-2xl font-extrabold text-primary">
                  {data?.balance.toLocaleString()}/-
                </CardTitle>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form id="withdraw-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="withdraw-amount">
                      Amount (KES)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="withdraw-amount"
                      type="number"
                      placeholder="Enter amount"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      Maximum withdrawal:{" "}
                      {isLoading ? (
                        <span className="inline-block w-12 h-3 bg-muted rounded animate-pulse" />
                      ) : (
                        data?.balance.toLocaleString()
                      )}
                      /-
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="withdraw-phone">
                      M-Pesa Number
                    </FieldLabel>
                    {isUserLoading ? (
                      <Skeleton className="h-7" />
                    ) : (
                      <Input
                        {...field}
                        id="withdraw-phone"
                        type="tel"
                        placeholder="e.g. 0712345678"
                        aria-invalid={fieldState.invalid}
                      />
                    )}
                    <FieldDescription>
                      Enter the M-Pesa number to receive the funds
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <div className="px-6 pb-6">
          <Button
            type="submit"
            size="xl"
            className="w-full"
            form="withdraw-form"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting && <Spinner className="mr-2" />}
            Withdraw to M-Pesa
          </Button>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        Withdrawals are processed instantly. No minimum amount. No fees.
      </p>
    </motion.div>
  );
};
