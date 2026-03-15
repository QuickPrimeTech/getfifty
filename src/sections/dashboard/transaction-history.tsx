"use client";

import { cardAnim } from "@/app/(admin)/dashboard/page";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "earning",
    name: "James Mwangi",
    amount: "+50/-",
    date: "Today, 2:34 PM",
    status: "completed",
  },
  {
    id: 2,
    type: "earning",
    name: "Amina Hassan",
    amount: "+50/-",
    date: "Today, 11:02 AM",
    status: "completed",
  },
  {
    id: 3,
    type: "withdrawal",
    name: "M-Pesa Withdrawal",
    amount: "-500/-",
    date: "Yesterday, 5:15 PM",
    status: "completed",
  },
  {
    id: 4,
    type: "earning",
    name: "Peter Ochieng",
    amount: "+50/-",
    date: "Yesterday, 3:22 PM",
    status: "completed",
  },
  {
    id: 5,
    type: "earning",
    name: "Grace Wanjiku",
    amount: "+50/-",
    date: "Yesterday, 1:10 PM",
    status: "completed",
  },
  {
    id: 6,
    type: "earning",
    name: "David Kiprop",
    amount: "+50/-",
    date: "Mar 13, 9:45 AM",
    status: "completed",
  },
  {
    id: 7,
    type: "withdrawal",
    name: "M-Pesa Withdrawal",
    amount: "-1,000/-",
    date: "Mar 12, 6:00 PM",
    status: "completed",
  },
  {
    id: 8,
    type: "earning",
    name: "Sarah Njeri",
    amount: "+50/-",
    date: "Mar 12, 2:18 PM",
    status: "completed",
  },
  {
    id: 9,
    type: "earning",
    name: "Brian Otieno",
    amount: "+50/-",
    date: "Mar 11, 10:30 AM",
    status: "pending",
  },
  {
    id: 10,
    type: "entry",
    name: "Network Entry Fee",
    amount: "-100/-",
    date: "Mar 1, 8:00 AM",
    status: "completed",
  },
];

export const TransactionHistory = () => {
  return (
    <motion.div
      {...cardAnim}
      transition={{ ...cardAnim.transition, delay: 0.4 }}
      className="bg-background border border-border rounded-2xl shadow-card overflow-hidden"
    >
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="font-bold tracking-display">Transaction History</h2>
        <span className="text-xs text-muted-foreground">
          {transactions.length} transactions
        </span>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 + i * 0.04 }}
            className="flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  tx.type === "earning"
                    ? "bg-primary/10"
                    : tx.type === "withdrawal"
                      ? "bg-destructive/10"
                      : "bg-secondary"
                }`}
              >
                {tx.type === "earning" ? (
                  <ArrowDownLeft className="w-4 h-4 text-primary" />
                ) : (
                  <ArrowUpRight
                    className={`w-4 h-4 ${tx.type === "withdrawal" ? "text-destructive" : "text-muted-foreground"}`}
                  />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-bold payout-text ${
                  tx.type === "earning"
                    ? "text-primary"
                    : tx.type === "withdrawal"
                      ? "text-destructive"
                      : "text-foreground"
                }`}
              >
                {tx.amount}
              </p>
              <p
                className={`text-xs ${tx.status === "pending" ? "text-accent" : "text-muted-foreground"}`}
              >
                {tx.status === "pending" ? "Pending" : "Completed"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
