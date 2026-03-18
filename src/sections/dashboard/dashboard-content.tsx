"use client";
import { useUserQuery } from "@/hooks/use-user";
import { ReferralCard } from "../link/referral-card";
import { Stats } from "./stats";
import { Spinner } from "@/components/ui/spinner";
import { ActivationCard } from "./activation-card";
import { QuickActions } from "./quick-actions";
import { ReferralHistory } from "@/sections/referrals/referral-history";

export const DashboardContent = () => {
  const { data: user, isLoading } = useUserQuery();

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
      <QuickActions />
      <ReferralHistory />
    </>
  );
};
