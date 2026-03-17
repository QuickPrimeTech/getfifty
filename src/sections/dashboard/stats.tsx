"use client";
import { Wallet, Info, Banknote, UserPlus, ClockArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { cardAnim } from "@/lib/animations";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Assuming you have shadcn tooltip
import { toast } from "sonner";

const stats = [
  {
    label: "Account Balance",
    value: "312/-",
    icon: Wallet,
    color: "text-primary",
  },
  {
    label: "Total Earned",
    value: "2,350/-",
    icon: Banknote,
    color: "text-primary",
  },

  { label: "Referrals", value: "47", icon: UserPlus, color: "text-accent" },
  {
    label: "Pending",
    value: "150/-",
    icon: ClockArrowUp,
    description:
      "These are users who signed up with your link but haven't paid yet.",
    color: "text-muted-foreground",
  },
];

export const Stats = () => {
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
          className="bg-background border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
                {stat.description && (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <button className="text-muted-foreground/50 hover:text-primary transition-colors" />
                      }
                    >
                      <Info className="w-3.5 h-3.5" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-50 text-xs">
                      {stat.description}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p
              className={`text-xl md:text-3xl font-extrabold tracking-tight ${stat.color}`}
            >
              {stat.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
