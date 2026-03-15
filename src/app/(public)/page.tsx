import { HeroSection } from "@/sections/home/hero";
import { TrustBar } from "@/sections/home/trust-bar";
import { LinkCard } from "@/sections/home/link-card";
import { PayoutCalculator } from "@/sections/home/payout-calculator";
import { CTASection } from "@/sections/home/cta-section";
import { Steps } from "@/sections/home/steps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GetFifty - Pay 100, Earn 50 Per Referral",
  description:
    "Join the micro-affiliate network for 100/-. Earn 50/- for every person you bring in. No limits, no delays. Start earning today with your unique referral link.",
  keywords: [
    "referral program",
    "affiliate marketing",
    "earn money",
    "micro affiliate",
    "Kenya",
    "get paid per referral",
  ],
  openGraph: {
    title: "GetFifty - Pay 100, Earn 50 Per Referral",
    description:
      "Join the network for 100/-. Earn 50/- for every person you bring in. No limits, no delays.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TrustBar />
      <Steps />
      <LinkCard />
      <PayoutCalculator />
      <CTASection />
    </div>
  );
}
