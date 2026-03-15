"use client";

import { cardAnim } from "@/lib/animations";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
export const ContactCards = () => {
  return (
    <motion.div
      {...cardAnim}
      transition={{ ...cardAnim.transition, delay: 0.3 }}
      className="grid sm:grid-cols-2 gap-4 mb-8"
    >
      <div className="bg-background border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Mail className="size-5 text-primary" />
        </div>
        <div>
          <p className="font-medium">Email Support</p>
          <p className="text-sm text-muted-foreground">support@getfifty.co</p>
        </div>
      </div>
      <div className="bg-background border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Phone className="size-5 text-primary" />
        </div>
        <div>
          <p className="font-medium">WhatsApp</p>
          <p className="text-sm text-muted-foreground">+254 712 345 678</p>
        </div>
      </div>
    </motion.div>
  );
};
