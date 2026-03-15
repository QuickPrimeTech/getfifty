import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import MechanismSection from "@/components/MechanismSection";
import LinkCard from "@/components/LinkCard";
import PayoutCalculator from "@/components/PayoutCalculator";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TrustBar />
      <MechanismSection />
      <LinkCard />
      <PayoutCalculator />
      <CTASection />
      <footer className="py-8 px-6 border-t border-border">
        <div className="container">
          <p className="text-sm text-muted-foreground">
            © 2026 LinkSplit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
