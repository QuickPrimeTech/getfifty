"use client";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUserQuery } from "@/hooks/use-user";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { usePaymentStore } from "@/stores/use-payment-store";
import { Payment } from "./payment-steps/payment";
import { PaymentPending } from "./payment-steps/pending";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { useCreateDeposit } from "@/hooks/use-payments";
import { PaymentError } from "./payment-steps/error";
import { cn } from "@/lib/utils";
import { PaymentSuccess } from "./payment-steps/success";

export const ActivationDialog = ({
  children,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { data: user } = useUserQuery();
  const [isOpen, onOpenChange] = useState(false);
  const paymentStep = usePaymentStore((state) => state.paymentStep);
  const setPaymentStep = usePaymentStore((state) => state.setPaymentStep);
  const setInvoiceId = usePaymentStore((state) => state.setInvoiceId);
  const responseDescription = usePaymentStore(
    (state) => state.responseDescription,
  );
  const depositMutation = useCreateDeposit();

  const stepInfo = [
    {
      step: "payment",
      icon: <ShieldCheck className="size-5 text-info-foreground shrink-0" />,
      content: (
        <>
          A STK Push prompt will be sent to your phone. Please{" "}
          <strong>enter your M-Pesa PIN</strong> to complete the transaction.
          Your code will unlock immediately after payment.
        </>
      ),
      className: "bg-info border-info text-info-foreground",
    },
    {
      step: "processing",
      icon: <CheckCircle className="size-5 text-success-foreground shrink-0" />,
      content: (
        <>
          A STK Push prompt has been sent to your phone. Please{" "}
          <strong>enter your M-Pesa PIN</strong> to complete the transaction.
          Your code will unlock immediately after payment.
        </>
      ),
      className: "bg-success border-success text-success-foreground",
    },
    {
      step: "failed",
      icon: <AlertTriangle className="size-5 text-white shrink-0" />,
      content: `Reason for failure: ${responseDescription}`,
      className: "bg-destructive border-destructive",
    },
    {
      step: "complete",
      icon: <CheckCircle className="size-5 text-success-foreground shrink-0" />,
      content: (
        <>
          <span>
            We have <strong>successfully received</strong> your payment. You
            will get an email confirming you've signed up.
          </span>
          <Button
            title="Close dialog"
            onClick={() => onOpenChange(() => false)}
            size={"sm"}
            variant={"secondary"}
            className={"mt-3"}
          >
            Close
          </Button>
        </>
      ),
      className: "bg-success border-success text-success-foreground",
    },
  ];

  // Find the active step info based on current store state
  const activeStep =
    stepInfo.find((s) => s.step === paymentStep) || stepInfo[0];

  const handleOpen = () => {
    if (!user?.phone) {
      toast.warning("Phone Number Missing", {
        description: (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">
              We need your M-Pesa number to send the activation prompt.
            </p>
            <Button
              size="sm"
              variant="default"
              className="w-fit h-8 text-xs px-3 shadow-none"
              render={<Link href={"/dashboard/account"} />}
            >
              <Phone className="mr-2 size-3" />
              Go to Account
            </Button>
          </div>
        ),
        duration: 5000,
      });
      return;
    }
    onOpenChange((open) => !open);
    setPaymentStep("payment");
  };

  const handlePayment = () => {
    if (!user) return;
    depositMutation.mutate(user, {
      onSuccess: ({ data }) => {
        toast.success(`A payment request has been sent to ${user.phone}`);
        setInvoiceId(data.invoice_id);
        setPaymentStep("processing");
      },
      onError: (error) => {
        toast.error(error.response?.data.message);
      },
    });
  };

  return (
    <>
      <Button onClick={handleOpen} {...props}>
        {children}
      </Button>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-106 gap-0 rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          {paymentStep === "payment" && <Payment />}
          {paymentStep === "processing" && <PaymentPending />}
          {paymentStep === "complete" && <PaymentSuccess />}
          {paymentStep === "failed" && <PaymentError />}

          <ScrollArea className={"h-[50vh]"}>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-dashed">
                  <span className="text-muted-foreground font-medium">
                    Amount to Pay
                  </span>
                  <span className="text-xl font-black">Ksh 100.00</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-dashed">
                  <span className="text-muted-foreground font-medium">
                    To Phone Number
                  </span>
                  <span className="font-bold font-mono">
                    {user?.phone || "07XXXXXXXX"}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "border rounded-2xl p-4 flex gap-3 text-xs text-white leading-relaxed",
                  activeStep.className,
                )}
              >
                {activeStep.icon}
                <p>{activeStep.content}</p>
              </div>
              {(paymentStep === "payment" || paymentStep === "failed") && (
                <Button
                  size={"xl"}
                  onClick={handlePayment}
                  disabled={depositMutation.isPending}
                  className="group w-full shadow-xl shadow-primary/10 cursor-pointer"
                >
                  {depositMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <Spinner className={"size-5"} />
                      <span>Sending Prompt....</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {paymentStep === "payment"
                        ? "Confirm & Send Prompt"
                        : "Retry Payment"}
                      <Send
                        size={18}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  )}
                </Button>
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>

          <div className="bg-muted/50 p-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
              Secure Safaricom Integration
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
