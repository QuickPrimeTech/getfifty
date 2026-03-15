import { HelpHeader } from "@/sections/help/header";
import { Faqs } from "@/sections/help/faqs";
import { ContactCards } from "@/sections/help/contact-card";
import { ContactForm } from "@/sections/help/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Support",
  description:
    "Find answers to frequently asked questions or get in touch with our support team.",
};

export default function HelpPage() {
  return (
    <div className="container mx-auto max-w-3xl py-24 px-4">
      <HelpHeader />
      <Faqs />
      <ContactCards />
      <ContactForm />
    </div>
  );
}
