import { PaymentStep } from "@/types/payment";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type PaymentState = {
  paymentStep: PaymentStep;
  currentInvoiceId: string | null;
  setPaymentStep: (step: PaymentStep) => void;
  setInvoiceId: (id: string | null) => void;
  responseDescription: string | null;
  setResponseDescription: (id: string | null) => void;
};

export const usePaymentStore = create<PaymentState>()(
  immer((set) => ({
    paymentStep: "payment",
    setPaymentStep: (step) => {
      set((state) => {
        state.paymentStep = step;
      });
    },
    currentInvoiceId: null,
    setInvoiceId: (id) =>
      set((state) => {
        state.currentInvoiceId = id;
      }),
    responseDescription: null,
    setResponseDescription: (desc) =>
      set((state) => {
        state.responseDescription = desc;
      }),
  })),
);
