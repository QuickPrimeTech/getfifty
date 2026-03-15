"use client";

import { cardAnim } from "@/app/(admin)/dashboard/page";
import { motion } from "framer-motion";

export const ReferralCard = () => {
  return (
    <motion.div
      {...cardAnim}
      transition={{ ...cardAnim.transition, delay: 0.3 }}
      className="bg-foreground text-background rounded-2xl p-6 mb-8 shadow-card"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest opacity-60 mb-2">
            Your Referral Link
          </p>
          <code className="text-sm md:text-base font-mono opacity-80">
            linksplit.app/ref/user_882
          </code>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs opacity-60">Active</span>
        </div>
      </div>
    </motion.div>
  );
};
