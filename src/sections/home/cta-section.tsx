"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-32 px-6">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-display leading-[1.1] mb-6">
              Share the link.
              <br />
              <span className="text-primary">Split the win.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-[40ch]">
              Minimum withdrawal as low as Ksh 50/-. Paid instantly. Join the
              network today for just 100/-.
            </p>
            <Button
              size={"xl"}
              nativeButton={false}
              render={<Link href="/auth/create-account" />}
            >
              Activate for 100/- <ArrowRight />
            </Button>
          </motion.div>
          <div className="relative flex-1 aspect-3/2">
            <Image
              src={
                "https://res.cloudinary.com/quick-prime-tech/image/upload/v1773929285/split-earn_nudskt.png"
              }
              alt="Split and earn illustration"
              className="object-fill"
              loading="lazy"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
};
