import { ReferralCard } from "@/sections/dashboard/referral-card";
import { History } from "@/sections/link/history";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Link - GetFifty",
  description:
    "Get your unique referral link and share it to start earning 50/- for every person you refer. Track your link performance and sharing history.",
  keywords: [
    "referral link",
    "share link",
    "invite friends",
    "earn money",
    "affiliate link",
  ],
  robots: {
    index: false,
    follow: false,
  },
};
export default function DashboardLink() {
  return (
    <>
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-display">
          My Link
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Share your unique link to start earning.
        </p>
      </div>
      <ReferralCard />
      <History />
    </>
  );
}
