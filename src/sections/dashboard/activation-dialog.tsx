"use client";
import { Button } from "@/components/ui/button";
import { Phone, SendHorizonal, ShieldCheck, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserQuery } from "@/hooks/use-user";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ActivationDialog = ({
  children,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { data: user } = useUserQuery();
  const [isOpen, onOpenChange] = useState(false);
  const router = useRouter();

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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Button onClick={handleOpen} {...props}>
        {children}
      </Button>
      <DialogContent className="sm:max-w-106 gap-0 rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-primary p-4 text-primary-foreground text-center relative overflow-hidden rounded-b-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Smartphone className="size-32 rotate-12" />
          </div>
          <Smartphone className="size-8 mx-auto mb-4" />
          <DialogTitle className="text-xl font-black">
            M-Pesa Checkout
          </DialogTitle>
          <DialogDescription className="text-sm text-primary-foreground/80 font-medium">
            Finalize your account activation
          </DialogDescription>
        </div>
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

            <div className="bg-info border border-info rounded-2xl p-4 flex gap-3 text-xs text-info-foreground leading-relaxed">
              <ShieldCheck className="size-5 text-info-foreground shrink-0" />
              <p>
                A STK Push prompt will be sent to your phone. Please{" "}
                <strong>enter your M-Pesa PIN</strong> to complete the
                transaction. Your code will unlock immediately after payment.
              </p>
            </div>

            <Button size={"xl"} className="w-full shadow-xl shadow-primary/10">
              Confirm & Send Prompt
              <SendHorizonal />
            </Button>
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
  );
};
