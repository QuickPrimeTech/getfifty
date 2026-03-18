"use client";

import { Wallet, UserPlus, ClockArrowUp, Banknote, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cardAnim } from "@/lib/animations";
import { toast } from "sonner";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useInvestorStatQuery } from "@/hooks/use-investor-stat";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const Stats = () => {
  const { data, isLoading } = useDashboardStats();
  const { data: investorStats, isLoading: investorLoading } =
    useInvestorStatQuery();

  const allStats = [
    {
      label: "Account Balance",
      value: data?.balance,
      icon: Wallet,
      color: "text-primary",
    },
    {
      label: "Total Earned",
      value: data?.total_earned,
      icon: Banknote,
      color: "text-primary",
    },
    {
      label: "Referrals",
      value: data?.referrals_count,
      icon: UserPlus,
      color: "text-accent",
    },
    {
      label: "Pending Referrals",
      value: data?.pending_users,
      icon: ClockArrowUp,
      description: "Users who signed up but haven't paid yet.",
      color: "text-muted-foreground",
    },
    {
      label: "Investor Bonus",
      value: investorStats?.expected_bonus_net,
      icon: Banknote,
      color: "text-emerald-600",
      description: `Your share of platform profit based on your ${investorStats?.investor_percentage}% investor share.`,
      isInvestor: true,
    },
  ];

  // 2. Logic: Only show investor card if they have a percentage > 0
  const visibleStats = allStats.filter((stat) => {
    if (stat.isInvestor) {
      // If loading, keep it in the list so the skeleton shows up in the right grid spot
      if (investorLoading) return true;
      // Otherwise, only show if they are actually an investor
      return investorStats && investorStats.investor_percentage > 0;
    }
    return true;
  });

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4",
        visibleStats.length === 5 ? "md:grid-cols-5" : "md:grid-cols-4",
      )}
    >
      {visibleStats.map((stat, i) => {
        const loading = stat.isInvestor ? investorLoading : isLoading;

        return (
          <motion.div
            key={stat.label}
            {...cardAnim}
            onClick={() => {
              if (stat.description) {
                toast.info(stat.label, { description: stat.description });
              }
            }}
            transition={{ ...cardAnim.transition, delay: i * 0.08 }}
            className="relative bg-background border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
                <stat.icon className={cn("size-4", stat.color)} />
              </div>

              {loading ? (
                <Skeleton className="h-8 w-20 md:h-10 md:w-24" />
              ) : (
                <p
                  className={cn(
                    "text-xl md:text-3xl font-extrabold tracking-tight",
                    stat.color,
                  )}
                >
                  {/* Handle 0 properly and format to whole Shillings */}
                  {stat.value !== undefined && stat.value !== null
                    ? Number(stat.value).toLocaleString()
                    : 0}
                </p>
              )}
            </div>

            {stat.description && (
              <Tooltip>
                <TooltipTrigger
                  className={"absolute bottom-4 right-4"}
                  render={<Button size={"icon-sm"} variant={"secondary"} />}
                >
                  <Info className="size-4" />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {stat.description}
                </TooltipContent>
              </Tooltip>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
