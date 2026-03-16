"use client";
import { useUserQuery } from "@/hooks/use-user";
import { ReferralCard } from "./referral-card";
import { Stats } from "./stats";
import { TransactionHistory } from "./transaction-history";
import { Spinner } from "@/components/ui/spinner";
import { ActivationCard } from "./activation-card";

export const DashboardContent = () => {
  const { data: user, isLoading } = useUserQuery();

  console.log("user --------->", user);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  // If user has no referral code, show the Paywall UI
  if (!user?.referralCode) {
    return <ActivationCard />;
  }

  // If user has a referral code, show the full Dashboard
  return (
    <>
      <Stats />
      <ReferralCard />
      <TransactionHistory />
    </>
  );
};
