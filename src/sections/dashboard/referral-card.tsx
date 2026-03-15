"use client";

import { cardAnim } from "@/lib/animations";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReferralCard = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "linksplit.app/ref/user_882";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      {...cardAnim}
      transition={{ ...cardAnim.transition, delay: 0.3 }}
      className="relative bg-card p-0.5 overflow-hidden rounded-2xl mb-8 shadow-card border border-border"
    >
      {/* Spinning gradient border */}
      <div className="absolute top-1/2 left-1/2 w-[110%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-emerald-500 via-purple-500 to-rose-500 animate-[spin_3s_linear_infinite]" />

      {/* Main card */}
      <div className="bg-card relative text-card-foreground rounded-2xl px-6 py-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
            Your Referral Link
          </p>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <code className="bg-muted rounded-sm flex-1 px-3 py-1 text-sm md:text-base font-mono text-foreground block truncate">
              {referralLink}
            </code>
            <div className="flex items-center gap-3">
              {/* Active indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary">Active</span>
              </div>

              {/* Copy button */}
              <Button
                size="sm"
                onClick={handleCopy}
                className="gap-2 min-w-25 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
