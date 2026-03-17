"use client";

import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Check, Smartphone, Sparkles } from "lucide-react";

export const PaymentSuccess = () => {
  return (
    <div className="bg-success p-4 text-white text-center relative overflow-hidden rounded-b-xl">
      {/* Animated background sparkles */}
      <Sparkles className="absolute top-2 right-2 size-12 opacity-20 animate-pulse" />
      <Sparkles className="absolute bottom-2 left-2 size-8 opacity-20 animate-bounce" />

      <div className="relative flex items-center justify-center mb-2">
        {/* Smartphone Base */}
        <Smartphone className="size-16 text-white/40" strokeWidth={1.5} />

        {/* Animated Check Icon */}
        <div className="absolute bg-white rounded-full p-2 animate-in zoom-in duration-500 fill-mode-forwards shadow-lg">
          <Check
            className="size-6 text-success animate-in slide-in-from-bottom-1 duration-300 delay-200"
            strokeWidth={3}
          />
        </div>
      </div>

      <DialogTitle className="text-xl font-black flex items-center justify-center gap-2">
        Payment Confirmed
      </DialogTitle>

      <DialogDescription className="text-sm text-white/90 font-medium max-w-[250px] mx-auto">
        Your account has been activated successfully. You can now access all
        features.
      </DialogDescription>
    </div>
  );
};
