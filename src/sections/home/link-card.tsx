"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export const LinkCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("link.site/ref/user_882");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4">
      <div className="container max-w-[55ch]">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Your Dashboard
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="p-6 bg-secondary border border-border rounded-[24px] flex flex-col gap-4 shadow-card"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Your Unique Link
            </span>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="p-4 bg-background border border-border rounded-xl flex items-center justify-between gap-4">
            <code className="text-foreground font-mono text-sm truncate">
              link.site/ref/user_882
            </code>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shrink-0"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
