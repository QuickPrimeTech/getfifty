"use client";
import { Wallet, UserPlus, ClockArrowUp, Banknote, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cardAnim } from "@/lib/animations";
import { toast } from "sonner";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Stats = () => {
  const { data, isLoading } = useDashboardStats();

  const stats = [
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
      description:
        "These are users who've signed up with your link but haven't paid yet.",
      color: "text-muted-foreground",
      header: "text-sm",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          {...cardAnim}
          onClick={() => {
            if (stat.description) {
              toast.info(stat.label, {
                description: stat.description,
              });
            }
          }}
          transition={{ ...cardAnim.transition, delay: i * 0.08 }}
          className="relative bg-background border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>

            {/* Display skeleton if loading */}
            {isLoading ? (
              <Skeleton className="h-8 w-20 md:h-10 md:w-24" />
            ) : (
              <p
                className={cn(
                  `text-xl md:text-3xl font-extrabold tracking-tight ${stat.color}`,
                )}
              >
                {stat.value}
              </p>
            )}
          </div>
          {stat.description && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <button className="absolute bottom-4 right-4 text-muted-foreground/50 hover:text-primary transition-colors" />
                }
              >
                <Info className="size-5 text-primary" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-50 text-xs">
                {stat.description}
              </TooltipContent>
            </Tooltip>
          )}
        </motion.div>
      ))}
    </div>
  );
};
