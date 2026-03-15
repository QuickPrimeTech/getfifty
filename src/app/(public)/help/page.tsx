"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const faqs = [
  {
    question: "How do I join GetFifty?",
    answer:
      "Pay 100/- to get your unique referral link. Once registered, you can start sharing your link and earn 50/- for every person who joins using your link.",
  },
  {
    question: "When do I get paid?",
    answer:
      "Withdrawals are processed instantly to your M-Pesa number. There's no minimum withdrawal amount and no fees.",
  },
  {
    question: "Is there a limit to how much I can earn?",
    answer:
      "No limits! You can refer as many people as you want. The more you share, the more you earn.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "Click 'Forgot Password' on the login page and follow the instructions to reset your password via email.",
  },
  {
    question: "Can I change my M-Pesa number?",
    answer:
      "Yes, go to Settings in your dashboard and update your phone number. Make sure it's a valid M-Pesa registered number.",
  },
  {
    question: "Why was my withdrawal rejected?",
    answer:
      "Withdrawals may be rejected if your M-Pesa number is invalid or if there's a network issue. Try again or contact support.",
  },
];

const cardAnim = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
    <div className="container mx-auto max-w-3xl py-24">
      {/* Header */}
      <motion.div {...cardAnim} className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
          <HelpCircle className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-display mb-2">
          Help Center
        </h1>
        <p className="text-muted-foreground">
          Find answers or get in touch with our support team.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        {...cardAnim}
        transition={{ ...cardAnim.transition, delay: 0.1 }}
        className="relative mb-8"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-12 bg-secondary"
        />
      </motion.div>

      {/* FAQ Accordion */}
      <motion.div
        {...cardAnim}
        transition={{ ...cardAnim.transition, delay: 0.2 }}
        className="bg-background border border-border rounded-2xl p-6 shadow-card mb-8"
      >
        <h2 className="text-lg font-bold mb-4">Frequently Asked Questions</h2>
        {filteredFaqs.length > 0 ? (
          <Accordion className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No results found. Try a different search or contact us below.
          </p>
        )}
      </motion.div>

      {/* Contact Options */}
      <motion.div
        {...cardAnim}
        transition={{ ...cardAnim.transition, delay: 0.3 }}
        className="grid sm:grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-background border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Email Support</p>
            <p className="text-sm text-muted-foreground">support@getfifty.co</p>
          </div>
        </div>
        <div className="bg-background border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">WhatsApp</p>
            <p className="text-sm text-muted-foreground">+254 712 345 678</p>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        {...cardAnim}
        transition={{ ...cardAnim.transition, delay: 0.4 }}
        className="bg-background border border-border rounded-2xl p-6 shadow-card"
      >
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-5 h-5 text-primary" />
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
    </div>
  );
}
