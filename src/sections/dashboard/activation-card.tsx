"use client";
import { CheckCircle2, CreditCard, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { ActivationDialog } from "./activation-dialog";

export const ActivationCard = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <div className="bg-background border border-border rounded-3xl p-8 shadow-xl text-center hover:border-primary/20 transition-colors">
          {/* Icon Header */}
          <div className="w-16 h-16 bg-primary/10 rounded-4xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <Rocket className="size-8 text-primary" />
          </div>

          {/* Text Content */}
          <h2 className="text-2xl font-black mb-2 tracking-tight">
            Activate Your Account
          </h2>
          <p className="text-muted-foreground mb-8">
            Unlock your unique referral link and start earning{" "}
            <span className="text-foreground font-bold font-mono">
              Ksh 50/-
            </span>{" "}
            for every person you invite.
          </p>

          {/* Features List */}
          <div className="flex flex-wrap gap-5 mb-8 text-left">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
              <span className="font-medium">
                Lifetime access to the dashboard
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
              <span className="font-medium">Instant M-Pesa withdrawals</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
              <span className="font-medium">
                Unique referral link (Alphanumeric)
              </span>
            </div>
          </div>
          <ActivationDialog size={"xl"} className={"w-full"}>
            <CreditCard className="size-5" />
            Get Referral Link @100/- via M-Pesa
          </ActivationDialog>
          {/* Footer Footer */}
          <p className="text-[10px] text-muted-foreground mt-4 uppercase tracking-widest font-black">
            Secure Payment Powered by Safaricom
          </p>
        </div>
      </motion.div>
    </>
  );
};
