import { SettingsForm } from "@/sections/settings/settings-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account preferences.",
};

export default function SettingsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-display">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account preferences.
        </p>
      </div>
      <SettingsForm />;
    </>
  );
}
