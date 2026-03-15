"use client";

import { motion } from "framer-motion";

export const History = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="bg-background border border-border rounded-2xl p-6 shadow-card"
    >
      <h3 className="font-bold tracking-display mb-4">Link Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Clicks
          </p>
          <p className="payout-text text-2xl font-extrabold">312</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Conversions
          </p>
          <p className="payout-text text-2xl font-extrabold text-primary">47</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Rate
          </p>
          <p className="payout-text text-2xl font-extrabold">15%</p>
        </div>
      </div>
    </motion.div>
  );
};
