import { SignUpForm } from "@/sections/auth/sign-up-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - GetFifty",
  description:
    "Sign up for GetFifty and get your unique referral link. Pay 100/- to join and start earning 50/- for every person you refer.",
  keywords: [
    "sign up",
    "create account",
    "register",
    "referral program",
    "earn money",
  ],
  openGraph: {
    title: "Create Account - GetFifty",
    description:
      "Join GetFifty today. Get your unique referral link and start earning.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
