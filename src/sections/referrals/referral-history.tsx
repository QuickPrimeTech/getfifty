"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
const referrals = [
  {
    id: 1,
    name: "James Mwangi",
    date: "Mar 15, 2:34 PM",
    earned: "50/-",
    status: "active",
  },
  {
    id: 2,
    name: "Amina Hassan",
    date: "Mar 15, 11:02 AM",
    earned: "50/-",
    status: "active",
  },
  {
    id: 3,
    name: "Peter Ochieng",
    date: "Mar 14, 3:22 PM",
    earned: "50/-",
    status: "active",
  },
  {
    id: 4,
    name: "Grace Wanjiku",
    date: "Mar 14, 1:10 PM",
    earned: "50/-",
    status: "active",
  },
  {
    id: 5,
    name: "David Kiprop",
    date: "Mar 13, 9:45 AM",
    earned: "50/-",
    status: "active",
  },
  {
    id: 6,
    name: "Sarah Njeri",
    date: "Mar 12, 2:18 PM",
    earned: "50/-",
    status: "active",
  },
  {
    id: 7,
    name: "Brian Otieno",
    date: "Mar 11, 10:30 AM",
    earned: "50/-",
    status: "pending",
  },
  {
    id: 8,
    name: "Lucy Akinyi",
    date: "Mar 10, 4:12 PM",
    earned: "50/-",
    status: "active",
  },
];

export const ReferralHistory = () => {
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
        {referrals.map((ref) => (
          <div
            key={ref.id}
            className="flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{ref.name}</p>
                <p className="text-xs text-muted-foreground">{ref.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold payout-text text-primary">
                {ref.earned}
              </p>
              <p
                className={`text-xs ${ref.status === "pending" ? "text-accent" : "text-muted-foreground"}`}
              >
                {ref.status === "pending" ? "Pending" : "Active"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
