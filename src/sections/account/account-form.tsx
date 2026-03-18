"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { useUserQuery } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AccountFormValues, accountSchema } from "@/schemas/account";

export const AccountForm = () => {
  const { data: user, isLoading } = useUserQuery();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
    },
  });

  // Sync server data to form when it loads
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: AccountFormValues) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: values.fullName,
          phone: values.phone,
        })
        .eq("id", user?.profileId);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Account profile updated successfully");
    } catch (error: any) {
      toast.error("Error", { description: error.message });
    }
  };

  if (isLoading)
    return (
      <div className="p-12 flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background border border-border rounded-2xl p-6 shadow-card"
      >
        <FieldGroup className="gap-6">
          {/* Full Name Field */}
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. John Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone Field */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="tel"
                  aria-invalid={fieldState.invalid}
                  placeholder="0712345678 or +254712345678"
                />
                <FieldDescription>
                  Used for your M-Pesa withdrawals.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email Field (Read Only) */}
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  disabled
                  className="bg-muted/50 cursor-not-allowed"
                />
                <FieldDescription>Managed via Google/Auth.</FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>

        <div className="mt-6">
          <Button
            type="submit"
            size="xl"
            disabled={form.formState.isSubmitting}
            className="w-full sm:w-auto"
          >
            {form.formState.isSubmitting ? (
              <Spinner />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
