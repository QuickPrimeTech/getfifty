import { AccountForm } from "@/sections/account/account-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account preferences.",
};

export default function SettingsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-display">
          Account
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account information.
        </p>
      </div>
      <AccountForm />
    </>
  );
}
