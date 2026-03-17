import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Smartphone } from "lucide-react";

export const Payment = () => {
  return (
    <>
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
    </>
  );
};
