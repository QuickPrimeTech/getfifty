import { motion } from "framer-motion";
import networkHero from "@/assets/network-hero.png";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="py-[12vh] md:py-[18vh] px-6 overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              Micro-Affiliate Network
            </p>
            <h1 className="text-[clamp(2.5rem,10vw,5rem)] font-extrabold leading-[0.9] tracking-display mb-8">
              Pay <span className="text-muted-foreground">100.</span>
              <br />
              Earn <span className="text-primary">50.</span>
            </h1>
            <p className="text-lg text-muted-foreground text-left max-w-[45ch] mb-10 leading-relaxed">
              Join the network for 100/-. Earn 50/- for every person you bring
              in. No limits, no delays.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileTap={{ y: 2 }}
                  className="h-14 px-8 bg-primary text-primary-foreground font-bold rounded-full text-base transition-colors hover:opacity-90"
                >
                  Get Your Link Now
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button
                  whileTap={{ y: 2 }}
                  className="h-14 px-8 bg-secondary text-secondary-foreground font-bold rounded-full text-base transition-colors hover:opacity-90 border border-border"
                >
                  View Dashboard
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative hidden md:block"
          >
            <Image
              src={networkHero}
              alt="Referral network visualization showing interconnected nodes"
              className="w-full max-w-lg mx-auto"
              loading="lazy"
              fill
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
