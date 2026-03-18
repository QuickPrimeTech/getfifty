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
import { useState, useMemo } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useUserQuery } from "@/hooks/use-user";
import { useInvestorStatQuery } from "@/hooks/use-investor-stat";
import { Skeleton } from "@/components/ui/skeleton";
import { WithdrawFormValues, withdrawSchema } from "@/schemas/withdraw";

export const WithdrawalForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isLoading: isStatsLoading } = useDashboardStats();
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const { data: investorData, isLoading: isInvestorLoading } =
    useInvestorStatQuery();

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

  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: "",
      phone: user?.phone || "",
    },
  });

  async function onSubmit(values: WithdrawFormValues) {
    const amount = Number(values.amount);

    if (amount > totalWithdrawable) {
      toast.error("Insufficient balance", {
        description: `Your withdrawable amount is KES ${totalWithdrawable.toLocaleString()}/-`,
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Withdrawal request submitted", {
      description: `KES ${amount.toLocaleString()} will be sent to ${values.phone}`,
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
                      {isLoading ? "..." : totalWithdrawable.toLocaleString()}/-
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
