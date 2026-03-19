"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LinkCard = () => {
  const [copied, setCopied] = useState(false);
  const link = "https://getfifty.vercel.app/join/xyz";
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4">
      <div className="container flex flex-col items-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Your Dashboard
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          whileHover={{ y: -4 }}
          className="p-6 w-full max-w-3xl bg-secondary border border-border rounded-[24px] flex flex-col gap-4 shadow-card"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-widest">
              Sample Link Preview
            </span>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>

          <div className="p-4 bg-background border border-border rounded-xl flex items-center justify-between gap-4">
            <code className="text-foreground font-mono text-sm truncate opacity-60">
              {link}
            </code>
            <Button
              variant={"outline"}
              onClick={handleCopy}
              className={"cursor-pointer"}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          {/* Clear notice that this is just a sample */}
          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                This is just a preview
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This isn&apos;t your actual referral link. Sign up to get your
                own unique link and start earning 50/- for every person you
                refer.
              </p>
            </div>
          </div>

          <Button
            nativeButton={false}
            className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-full hover:opacity-90 transition-opacity group"
            render={<Link href="/auth/create-account" />}
          >
            Get Your Real Link
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
