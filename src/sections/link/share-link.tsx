"use client";
import { motion } from "framer-motion";
import { ReferralCard } from "../dashboard/referral-card";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ShareLink = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="bg-background border border-border rounded-[24px] p-4 shadow-card mb-6"
    >
      <div className="space-y-4">
        <ReferralCard />
        <Button variant={"outline"}>
          <Share2 className="w-4 h-4" /> Share Link
        </Button>
      </div>
    </motion.div>
  );
};
