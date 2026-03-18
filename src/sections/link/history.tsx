"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useUserQuery } from "@/hooks/use-user";
import { motion } from "framer-motion";

export const History = () => {
  const { data: profile, isLoading: profileLoading } = useUserQuery();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const isLoading = profileLoading || statsLoading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="bg-background border border-border rounded-2xl p-6 shadow-card"
    >
      <h3 className="font-bold tracking-display mb-4">Link Stats</h3>

      <div className="grid grid-cols-3 gap-4">
        {/* Clicks */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Clicks
          </p>
          {isLoading ? (
            <Skeleton className="h-6 w-12" />
          ) : (
            <p className="payout-text text-2xl font-extrabold">
              {profile?.referralClicks ?? 0}
            </p>
          )}
        </div>

        {/* Conversions */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Conversions
          </p>
          {isLoading ? (
            <Skeleton className="h-6 w-12" />
          ) : (
            <p className="payout-text text-2xl font-extrabold text-primary">
              {stats?.referrals_count ?? 0}
            </p>
          )}
        </div>

        {/* Rate */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Rate
          </p>
          {isLoading ? (
            <Skeleton className="h-6 w-12" />
          ) : (
            <p className="payout-text text-2xl font-extrabold">
              {profile?.referralClicks && profile.referralClicks > 0
                ? (
                    ((stats?.referrals_count ?? 0) / profile.referralClicks) *
                    100
                  ).toFixed(0)
                : 0}
              %
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
