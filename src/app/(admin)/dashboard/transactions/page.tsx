"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { format } from "date-fns";
import { useTransactionsQuery } from "@/hooks/use-transactions";
import { Badge } from "@/components/ui/badge";

type FilterType = "all" | "earning" | "withdrawal" | "deposit";

export default function DashboardTransactions() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const { data: transactions = [], isLoading } = useTransactionsQuery();

  const filtered = transactions.filter((tx) => {
    const matchesFilter = filter === "all" || tx.type === filter;
    // We use 'description' or 'type' since your DB schema might not have 'name'
    const matchesSearch =
      tx.description?.toLowerCase().includes(search.toLowerCase()) ||
      tx.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Earnings", value: "earning" },
    { label: "Withdrawals", value: "withdrawal" },
    { label: "Deposits", value: "deposit" },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-display">
          Transactions
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Full history of your activity.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 sticky top-14.5 bg-background/80 backdrop-blur-sm py-2 border-b">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {filters.map((f) => (
              <Button
                key={f.value}
                onClick={() => setFilter(f.value)}
                variant={filter === f.value ? "default" : "outline"}
                size="sm"
              >
                {f.label}
              </Button>
            ))}
          </div>
          <InputGroup className="flex-1">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background border border-border rounded-2xl shadow-card overflow-hidden"
        >
          <div className="divide-y divide-border">
            {isLoading ? (
              <div className="px-5 py-12 text-center flex flex-col items-center gap-2">
                <Loader2 className="animate-spin text-primary size-6" />
                <p className="text-sm text-muted-foreground">
                  Loading transactions...
                </p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-5 py-12 text-center text-muted-foreground text-sm">
                No transactions found.
              </div>
            ) : (
              filtered.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        tx.type === "deposit"
                          ? "bg-primary/10"
                          : tx.type === "withdrawal"
                            ? "bg-destructive/10"
                            : "bg-blue-500/10"
                      }`}
                    >
                      {tx.type === "deposit" ? (
                        <ArrowDownLeft className="w-4 h-4 text-primary" />
                      ) : (
                        <ArrowUpRight
                          className={`w-4 h-4 ${tx.type === "withdrawal" ? "text-destructive" : "text-blue-500"}`}
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">
                        {tx.description || tx.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(tx.created_at), "MMM dd, h:mm a")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        tx.type === "deposit"
                          ? "text-primary"
                          : tx.type === "withdrawal"
                            ? "text-destructive"
                            : "text-foreground"
                      }`}
                    >
                      {tx.type === "withdrawal" ? "-" : "+"}Ksh{" "}
                      {tx.amount.toLocaleString()}
                    </p>
                    <Badge
                      variant={tx.status === "complete" ? "default" : "outline"}
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
