"use client";
import { useUserQuery } from "@/hooks/use-user"; // Adjust path
import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export const OnboardingBanner = () => {
  const { data: user, isLoading } = useUserQuery();
  const pathname = usePathname();
  console.log("pathname", pathname);

  // Don't show anything while loading or if phone already exists
  if (isLoading || (user && user.phone) || pathname === "/dashboard/account")
    return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="overflow-hidden"
      >
        <div className="mb-6 p-4 bg-warning rounded-2xl flex flex-col md:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warning/70 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-warning-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-warning-foreground">
                Complete your profile
              </h4>
              <p className="text-xs text-warning-foreground">
                Add your M-Pesa number to enable instant withdrawals to your
                phone.
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            render={<Link href="/dashboard/account" />}
          >
            Setup Account <ArrowRight className="size-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
