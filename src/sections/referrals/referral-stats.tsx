"use client";

import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useUserQuery } from "@/hooks/use-user";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ReferralStats = () => {
  const { data: stats, isLoading: isStatsLoading } = useDashboardStats();
  const { data: profileStats, isLoading: isUserLoading } = useUserQuery();

  const statItems = [
    {
      label: "Total Referrals",
      value: stats?.referrals_count,
      isLoading: isStatsLoading,
      className: "text-primary",
    },
    {
      label: "This Week",
      value: stats?.referrals_this_week, // Hardcoded for now per your original snippet
      isLoading: isStatsLoading,
    },
    {
      label: "Total Clicks",
      value: profileStats?.referralClicks,
      isLoading: isUserLoading,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {statItems.map((item) => (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                item?.className,
              )}
            >
              {item.value ?? 0}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};
