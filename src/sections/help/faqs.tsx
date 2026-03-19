"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cardAnim } from "@/lib/animations";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

const faqs = [
  {
    question: "How do I join GetFifty?",
    answer:
      "Pay 100/- to get your unique referral link. Once registered, you can start sharing your link and earn 50/- for every person who joins using your link.",
  },
  {
    question: "When do I get paid?",
    answer:
      "Withdrawals are processed instantly to your M-Pesa number. Minimum withdrawal amount as low as 50 /- and no fees.",
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

export const Faqs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <motion.div
        {...cardAnim}
        transition={{ ...cardAnim.transition, delay: 0.1 }}
        className="relative mb-8"
      >
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </motion.div>
      <motion.div
        {...cardAnim}
        transition={{ ...cardAnim.transition, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-lg font-bold mb-4 text-center">
          Frequently Asked Questions
        </h2>
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
    </>
  );
};
