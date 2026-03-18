"use client";

import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useUserQuery } from "@/hooks/use-user";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ReferralStats = () => {
  const { data: stats, isLoading: isStatsLoading } = useDashboardStats();
  const { data: profileStats, isLoading: isUserLoading } = useUserQuery();

  const clicks = profileStats?.referralClicks ?? 0;
  const referrals = stats?.referrals_count ?? 0;

  const conversionRate =
    clicks > 0 ? ((referrals / clicks) * 100).toFixed(1) : "0.0";

  const statItems = [
    {
      label: "Total Referrals",
      value: referrals,
      isLoading: isStatsLoading,
      className: "text-primary",
    },
    {
      label: "Referrals (Last 7 days)",
      value: stats?.referrals_this_week ?? 0,
      isLoading: isStatsLoading,
    },
    {
      label: "Total Clicks",
      value: clicks,
      isLoading: isUserLoading,
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      isLoading: isStatsLoading || isUserLoading,
      className:
        parseInt(conversionRate) >= 20
          ? "text-green-500"
          : parseInt(conversionRate) >= 10
            ? "text-yellow-500"
            : "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.05,
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-background border border-border rounded-2xl p-5 shadow-card"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
            {item.label}
          </p>
          {item.isLoading ? (
            <div className="h-9 w-16 bg-muted animate-pulse rounded-md" />
          ) : (
            <p
              className={cn(
                "payout-text text-3xl font-extrabold tracking-tight",
                item.className,
              )}
            >
              {item.value}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};
