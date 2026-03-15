"use client";

import { cardAnim } from "@/lib/animations";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
export const HelpHeader = () => {
  return (
    <motion.div {...cardAnim} className="mb-8 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
        <HelpCircle className="w-6 h-6 text-primary" />
      </div>
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-display mb-2">
        Help Center
      </h1>
      <p className="text-muted-foreground">
        Find answers or get in touch with our support team.
      </p>
    </motion.div>
  );
};
