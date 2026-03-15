"use client";

import { Link2, TrendingUp, Users, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { cardAnim } from "@/lib/animations";

const stats = [
  {
    label: "Total Earned",
    value: "2,350/-",
    icon: Wallet,
    color: "text-primary",
  },
  { label: "Referrals", value: "47", icon: Users, color: "text-accent" },
  {
    label: "Pending",
    value: "150/-",
    icon: TrendingUp,
    color: "text-muted-foreground",
  },
  { label: "Link Clicks", value: "312", icon: Link2, color: "text-primary" },
];

export const Stats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          {...cardAnim}
          transition={{ ...cardAnim.transition, delay: i * 0.08 }}
          className="bg-background border border-border rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </span>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </div>
          <p
            className={`payout-text text-2xl md:text-3xl font-extrabold ${stat.color}`}
          >
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
