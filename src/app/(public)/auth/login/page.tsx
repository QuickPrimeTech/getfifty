import { LoginForm } from "@/sections/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - GetFifty",
  description:
    "Sign in to your GetFifty account to access your dashboard, view your referral link, and track your earnings.",
  keywords: ["login", "sign in", "account", "dashboard"],
  openGraph: {
    title: "Login - GetFifty",
    description:
      "Access your GetFifty dashboard and track your referral earnings.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
