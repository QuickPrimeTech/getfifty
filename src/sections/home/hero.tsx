"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NetworkAnimation = dynamic(
  () =>
    import("@/components/network-animation").then((m) => m.NetworkAnimation),
  { ssr: false },
);

export const HeroSection = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Only load animation on desktop
    if (window.innerWidth >= 768) {
      setShowAnimation(true);
    }
  }, []);

  return (
    <section className="pt-[18vh] pb-8 px-4 overflow-hidden">
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
              Earn <span className="text-primary">50</span> for every paying{" "}
              <span className="text-primary">Joiner.</span>
            </h1>

            <p className="text-lg text-muted-foreground text-left max-w-[45ch] mb-10 leading-relaxed">
              Join the network for 100/-. Get a link. Earn 50/- for every person
              that joins through your link. No limits, no delays.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size={"xl"}
                nativeButton={false}
                render={<Link href="/auth/create-account" />}
              >
                Get Your Link Now <ArrowRight />
              </Button>

              <Button
                variant={"outline"}
                size={"xl"}
                nativeButton={false}
                render={<Link href="/auth/login" />}
              >
                Login to Dashoard
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative hidden md:block h-[400px] w-full"
          >
            {showAnimation && <NetworkAnimation />}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
