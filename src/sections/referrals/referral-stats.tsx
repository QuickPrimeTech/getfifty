"use client";
import { motion } from "framer-motion";

export const ReferralStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background border border-border rounded-2xl p-5 shadow-card"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
          Total Referrals
        </p>
        <p className="payout-text text-3xl font-extrabold text-primary">47</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-background border border-border rounded-2xl p-5 shadow-card"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
          This Week
        </p>
        <p className="payout-text text-3xl font-extrabold">12</p>
      </motion.div>
    </div>
  );
};
