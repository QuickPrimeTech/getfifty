import { HeroSection } from "@/sections/home/hero";
import { TrustBar } from "@/sections/home/trust-bar";
import { LinkCard } from "@/sections/home/link-card";
import { PayoutCalculator } from "@/sections/home/payout-calculator";
import { CTASection } from "@/sections/home/cta-section";
import { Steps } from "@/sections/home/steps";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TrustBar />
      <Steps />
      <LinkCard />
      <PayoutCalculator />
      <CTASection />
      <footer className="py-8 px-6 border-t border-border">
        <div className="container">
          <p className="text-sm text-muted-foreground">
            © 2026 GetFifty. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
