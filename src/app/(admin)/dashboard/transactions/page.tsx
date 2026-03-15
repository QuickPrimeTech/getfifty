"use client";

import { transactions } from "@/sections/dashboard/transaction-history";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";
import { useState } from "react";

type FilterType = "all" | "earning" | "withdrawal" | "entry";

export default function DashboardTransactions() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((tx) => {
    const matchesFilter = filter === "all" || tx.type === filter;
    const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Earnings", value: "earning" },
    { label: "Withdrawals", value: "withdrawal" },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-display">
          Transactions
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Full history of your earnings and withdrawals.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Transaction List */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-background border border-border rounded-2xl shadow-card overflow-hidden"
      >
        <div className="divide-y divide-border">
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-muted-foreground text-sm">
              No transactions found.
            </div>
          )}
          {filtered.map((tx) => (
            <div
              key={tx.id}
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
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
