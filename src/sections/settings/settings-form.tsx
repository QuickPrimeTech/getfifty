"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export const SettingsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Settings saved", {
      description: "Your account preferences have been updated.",
      position: "bottom-right",
    });

    setIsSubmitting(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <form
        onSubmit={handleSubmit}
        className="bg-background border border-border rounded-2xl p-6 shadow-card"
      >
        <FieldGroup className="gap-6">
          <Field>
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input id="fullName" type="text" defaultValue="Alex Kamau" />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
            <Input id="phone" type="tel" defaultValue="0712345678" />
            <FieldDescription>
              This number is used for M-Pesa withdrawals
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" defaultValue="alex@example.com" />
          </Field>
        </FieldGroup>

        <div className="mt-6">
          <Button
            type="submit"
            size="xl"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? <Spinner /> : <Save />}
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
