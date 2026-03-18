import type { Metadata } from "next";
import { TransactionContent } from "@/sections/transactions/transactions-content";

export const metadata: Metadata = {
  title: "Transactions | Dashboard",
  description:
    "View the full history of your transactions, earnings, and withdrawals.",
};

export default function DashboardTransactions() {
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

      <TransactionContent />
    </>
  );
}
