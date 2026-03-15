"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Lock } from "lucide-react";

const items = [
  { icon: Shield, label: "No minimum withdrawal" },
  { icon: Zap, label: "Instant payouts" },
  { icon: Lock, label: "Secure M-Pesa" },
];

export const TrustBar = () => {
  return (
    <section className="py-12 px-4 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-start md:items-center">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <item.icon className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium text-muted-foreground">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
