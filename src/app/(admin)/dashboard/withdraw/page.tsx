import { WithdrawalForm } from "@/sections/withdraw/form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Withdraw - GetFifty",
  description:
    "Withdraw your earnings to M-Pesa instantly. No minimum amount, no fees. Enter your amount and phone number to receive your funds.",
  keywords: ["withdraw", "mpesa", "payout", "earnings", "cash out"],
  robots: {
    index: false,
    follow: false,
  },
};

export default function Withdraw() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-display">
          Withdraw
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Send your earnings to M-Pesa instantly.
        </p>
      </div>
      <WithdrawalForm />
    </>
  );
}
