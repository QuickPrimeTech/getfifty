"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { usePaymentStore } from "@/stores/use-payment-store";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Loader, Smartphone } from "lucide-react";
import { toast } from "sonner";

export const PaymentPending = () => {
  const supabase = createClient();
  const invoiceId = usePaymentStore((state) => state.currentInvoiceId);
  const setStep = usePaymentStore((state) => state.setPaymentStep);
  const setResponseDescription = usePaymentStore(
    (state) => state.setResponseDescription,
  );

  useEffect(() => {
    if (!invoiceId) return;

    // 1. Create the subscription
    const channel = supabase
      .channel(`transaction-${invoiceId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "transactions",
          filter: `invoice_id=eq.${invoiceId}`,
        },
        (payload) => {
          const newStatus = payload.new.status;

          if (newStatus === "complete") {
            setStep("complete");
            toast.success("Payment Received! Account activated.");
          } else if (newStatus === "failed") {
            setStep("failed");
            setResponseDescription(payload.new.description);
            toast.error(payload.new.description);
          }
        },
      )
      .subscribe();

    // 2. Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [invoiceId, setStep, supabase]);

  return (
    <div className="bg-primary p-4 text-primary-foreground text-center relative overflow-hidden rounded-b-xl">
      {/* ... your existing UI ... */}
      <div className="relative flex items-center justify-center">
        <Smartphone
          className="size-16 text-primary-foreground"
          strokeWidth={1.5}
        />
        <Loader
          className="absolute text-primary-foreground animate-spin"
          strokeWidth={1}
          style={{ animationDuration: "3s" }}
        />
      </div>
      <DialogTitle className="flex gap-2 justify-center items-center text-xl font-black">
        Prompt Sent
        <CheckCircle className="size-4" />
      </DialogTitle>
      <DialogDescription className="flex gap-1 justify-center items-center text-sm text-primary-foreground/80 font-medium">
        Waiting for payment...
      </DialogDescription>
    </div>
  );
};
