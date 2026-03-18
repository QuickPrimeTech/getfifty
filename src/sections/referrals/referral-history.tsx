"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useTransactionsQuery } from "@/hooks/use-transactions";
import { format } from "date-fns";

export const ReferralHistory = () => {
  const { data: transactions = [], isLoading } = useTransactionsQuery();

  // Only take the 7 most recent earnings (referrals)
  const recentReferrals = transactions
    .filter((tx) => tx.type === "earning")
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-background border border-border rounded-2xl shadow-card overflow-hidden"
    >
      <div className="p-5 border-b border-border">
        <h2 className="font-bold tracking-display">Recent Referrals</h2>
      </div>
      <div className="divide-y divide-border">
        {isLoading ? (
          <div className="px-5 py-12 text-center text-muted-foreground">
            Loading referrals...
          </div>
        ) : recentReferrals.length === 0 ? (
          <div className="px-5 py-12 text-center text-muted-foreground">
            No referrals yet.
          </div>
        ) : (
          recentReferrals.map((ref) => (
            <div
              key={ref.id}
              className="flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {ref.referred_user_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(ref.created_at), "MMM dd, h:mm a")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold payout-text text-primary">
                  +Ksh {ref.amount.toLocaleString()}
                </p>
                <p
                  className={`text-xs ${ref.status !== "complete" ? "text-accent" : "text-muted-foreground"}`}
                >
                  {ref.status !== "complete" ? "Pending" : "Active"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};
