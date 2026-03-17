import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Smartphone } from "lucide-react";

export const PaymentError = () => {
  return (
    <div className="bg-destructive p-4 text-white text-center relative overflow-hidden rounded-b-xl">
      <div className="relative flex items-center justify-center">
        <Smartphone
          className="size-16 text-primary-foreground"
          strokeWidth={1.5}
        />
        <AlertTriangle className="absolute" strokeWidth={1} />
      </div>
      <DialogTitle className="text-xl font-black">Error Occurred</DialogTitle>
      <DialogDescription className="flex gap-1 justify-center items-center text-sm text-white/80 font-medium">
        An Error Occurred during the payment process
      </DialogDescription>
    </div>
  );
};
