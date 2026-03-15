"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Secure Entry",
    description:
      "Pay 100/- via M-Pesa or card. You account is instantly activated and a unique link for you will be generated.",
    image: null,
  },
  {
    number: "02",
    title: "Share Your Link",
    description:
      "Share your unique link anywhere — WhatsApp, Telegram, socials, SMS e.t.c",
    image: "/share-link.png",
  },
  {
    number: "03",
    title: "Earn Per Referral",
    description:
      "Every person who joins through your link earns you 50/-. Paid instantly. No minimum withdrawal.",
    image: "/split-earn.png",
  },
];

export const Steps = () => {
  return (
    <section className="py-24 px-4 bg-secondary rounded-3xl">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-16"
        >
          How It Works
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-background border border-border rounded-[24px] p-6 flex flex-col shadow-card"
            >
              <span className="payout-text text-4xl font-extrabold text-border mb-4 select-none">
                {step.number}
              </span>
              {step.image && (
                <div className="relative h-40 flex items-center justify-center mb-4">
                  <Image
                    src={step.image}
                    alt={step.title}
                    className="h-full object-contain"
                    loading="lazy"
                    fill
                  />
                </div>
              )}
              {!step.image && (
                <div className="h-40 flex items-center justify-center mb-4 bg-secondary rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="payout-text text-xl font-bold text-primary">
                        100/-
                      </span>
                    </div>
                    <div className="w-8 h-[2px] bg-border" />
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
              )}
              <h3 className="text-xl font-bold tracking-display mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
