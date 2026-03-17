export type PaymentStep = "payment" | "processing" | "failed" | "complete";
export type PaymentType = "deposit" | "withdrawal" | "referral_bonus";
export type CallbackResponse = {
  invoice_id: "YV5J98Y";
  state: "PENDING" | "PROCESSING" | "FAILED" | "COMPLETE";
  provider: "M-PESA" | "CARD";
  charges: string;
  net_amount: string;
  currency: "KES";
  value: string;
  account: string;
  api_ref: string;
  failed_reason: string;
  mpesa_reference: string;
};

export type STKResponse = {
  id: string;
  invoice: CallbackResponse;
};
