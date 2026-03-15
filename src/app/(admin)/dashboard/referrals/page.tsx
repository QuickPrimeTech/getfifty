import { ReferralHistory } from "@/sections/referrals/referral-history";
import { ReferralStats } from "@/sections/referrals/referral-stats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referrals History",
  description:
    "Track people who joined using your referral link, view earnings, and monitor referral activity in real time.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Referrals() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-display">
          Referrals
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          People who joined through your link.
        </p>
      </div>

      <ReferralStats />
      <ReferralHistory />
    </>
  );
}
