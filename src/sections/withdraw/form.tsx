"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Wallet, TrendingUp } from "lucide-react";
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
import { useState, useMemo, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useUserQuery } from "@/hooks/use-user";
import { useInvestorStatQuery } from "@/hooks/use-investor-stat";
import { Skeleton } from "@/components/ui/skeleton";
import { getWithdrawSchema, WithdrawFormValues } from "@/schemas/withdraw";
import { useQueryClient } from "@tanstack/react-query";
import { TransactionStatus } from "./transaction-status";

export const WithdrawalForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTxId, setActiveTxId] = useState(null);
  const { data, isLoading: isStatsLoading } = useDashboardStats();
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const { data: investorData, isLoading: isInvestorLoading } =
    useInvestorStatQuery();
  const queryClient = useQueryClient();

  // 1. Determine if they are actually an investor (pct > 0)
  const isActualInvestor = !!(
    investorData && investorData.investor_percentage > 0
  );

  // 2. Calculate Combined Total (Whole numbers only)
  const totalWithdrawable = useMemo(() => {
    const balance = data?.balance || 0;
    const bonus = isActualInvestor ? investorData?.expected_bonus_net || 0 : 0;
    // Floor it so 0.5 becomes 0 (can't withdraw cents)
    return balance + bonus;
  }, [data?.balance, investorData?.expected_bonus_net, isActualInvestor]);

  const isLoading = isStatsLoading || isInvestorLoading;

  const defaultValues = {
    amount: "",
    phone: "",
  };
  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(getWithdrawSchema(totalWithdrawable)),
    defaultValues,
  });

  // ADD THIS EFFECT:
  useEffect(() => {
    if (user?.phone) {
      // This manually pushes the phone number into the form field once loaded
      form.setValue("phone", user.phone, {
        shouldValidate: true,
        shouldDirty: false, // Keeps the form from thinking the user "touched" it
      });
    }
  }, [user?.phone, form]);

  async function onSubmit(values: WithdrawFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/payment/withdraw", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const result = await response.json(); // This is the ApiResponse<T>

      if (result.success) {
        toast.success("Request Sent", { description: result.message });
        form.reset(defaultValues);
        setActiveTxId(() => result.data.id);
        // 2. Refetch all dashboard and user data to show the new balance
        await queryClient.invalidateQueries();
      } else {
        // Handles 400, 402, and 500 errors
        toast.error("Withdrawal Error", { description: result.message });
      }
    } catch (err) {
      toast.error("Network Error", {
        description: "Could not reach the server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {activeTxId && (
        <div className="mb-4">
          <TransactionStatus transactionId={activeTxId} />
        </div>
      )}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardDescription className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                {isActualInvestor ? "Total Withdrawable" : "Available Balance"}
                {isActualInvestor && (
                  <TrendingUp className="size-3 text-emerald-500" />
                )}
              </CardDescription>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <CardTitle className="payout-text text-2xl font-extrabold text-primary">
                  {totalWithdrawable.toLocaleString()}/-
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
                      disabled={isLoading}
                    />
                    <FieldDescription>
                      Max:{" "}
                      {isLoading
                        ? "..."
                        : Math.floor(totalWithdrawable).toLocaleString()}
                      /-
                      {isActualInvestor && (
                        <span className="ml-1 text-[10px] text-emerald-600 font-medium">
                          (Bonus included)
                        </span>
                      )}
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
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <Input
                        {...field}
                        id="withdraw-phone"
                        type="tel"
                        placeholder="e.g. 0712345678"
                      />
                    )}
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
            disabled={isSubmitting || isLoading || totalWithdrawable <= 0}
          >
            {isSubmitting && <Spinner className="mr-2" />}
            Withdraw to M-Pesa
          </Button>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        Withdrawals are processed instantly. No fees.
      </p>
    </motion.div>
  );
};
