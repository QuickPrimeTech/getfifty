import { ReferralCard } from "@/sections/dashboard/referral-card";
import { Stats } from "@/sections/dashboard/stats";
import { TransactionHistory } from "@/sections/dashboard/transaction-history";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - GetFifty",
  description:
    "Access your GetFifty referral dashboard, view your unique link, track earnings, and manage your account.",
  keywords: ["dashboard", "referral link", "earnings", "account"],
  robots: {
    index: false,
    follow: false,
  },
};

export default function Dashboard() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-display">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back. Here's your earnings overview.
        </p>
      </div>

      <Stats />
      <ReferralCard />
      <TransactionHistory />
    </>
  );
}
