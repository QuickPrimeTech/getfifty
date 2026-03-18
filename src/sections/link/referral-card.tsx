"use client";
import { cardAnim } from "@/lib/animations";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserQuery } from "@/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButton } from "@/components/ui/share-button";
import { toast } from "sonner";

export const ReferralCard = () => {
  const [copied, setCopied] = useState(false);
  const { data: user, isLoading } = useUserQuery();

  // Construct the dynamic link based on the user's referralCode
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const referralLink = user?.referralCode
    ? `${baseUrl}/join/${user.referralCode}`
    : "Link not generated yet";

  const handleCopy = async () => {
    if (!user?.referralCode) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      {...cardAnim}
      transition={{ ...cardAnim.transition, delay: 0.3 }}
      className="relative bg-card p-0.5 overflow-hidden rounded-2xl shadow-card border border-border"
    >
      {/* Spinning gradient border - Only shows when active */}
      {user?.referralCode && (
        <div className="absolute top-1/2 left-1/2 w-[110%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-emerald-500 via-purple-500 to-rose-500 animate-[spin_3s_linear_infinite]" />
      )}

      {/* Main card */}
      <div className="bg-card relative text-card-foreground rounded-2xl px-6 py-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
            Your Referral Link
          </p>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Link Container with Skeleton */}
            {isLoading ? (
              <Skeleton className="h-9 flex-1 rounded-sm bg-muted animate-pulse" />
            ) : (
              <code
                className={`bg-muted rounded-sm flex-1 px-3 py-1 text-sm md:text-base font-mono block truncate ${!user?.referralCode && "text-muted-foreground italic"}`}
              >
                {referralLink}
              </code>
            )}

            <div className="flex items-center gap-3">
              {/* Active/Inactive indicator with Skeleton */}
              {isLoading ? (
                <Skeleton className="h-7 w-20 rounded-full bg-muted animate-pulse" />
              ) : user?.referralCode ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-primary">
                    Active
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                  <Lock className="size-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Inactive
                  </span>
                </div>
              )}

              {/* Copy button */}
              <Button
                size="sm"
                variant={"outline"}
                onClick={handleCopy}
                disabled={isLoading || !user?.referralCode}
                className="gap-2 min-w-25 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </Button>
              <ShareButton
                shareData={{
                  title: "Join GetFifty",
                  text: `Join GetFifty program 100/= and start earning 50/= from every person you refer`,
                  url: referralLink,
                }}
                onShareSuccess={() => {
                  toast.success("Referral link shared successfully!");
                }}
                type="button"
                onShareError={(error) => {
                  // Only show error if it's not a user cancellation
                  if (error.name !== "AbortError") {
                    toast.error("Failed to share referral link");
                  }
                }}
                onCopyFallback={() => {
                  toast.success("Referral link copied to clipboard!");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
