"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cardAnim } from "@/lib/animations";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent", {
      description: "We'll get back to you within 24 hours.",
      position: "bottom-right",
    });
    setEmail("");
    setMessage("");
  };

  return (
    <motion.div
      {...cardAnim}
      transition={{ ...cardAnim.transition, delay: 0.4 }}
      className="bg-background border border-border rounded-2xl p-6 shadow-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <MessageCircle className="size-5 text-primary" />
        <h2 className="text-lg font-bold">Send us a message</h2>
      </div>
      <form onSubmit={handleContactSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">
            Your Email
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">
            Message
          </label>
          <Textarea
            placeholder="How can we help you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
          />
        </div>
        <Button type="submit" size="xl" className="w-full">
          <Send />
          Send Message
        </Button>
      </form>
    </motion.div>
  );
};
