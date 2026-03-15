"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-muted/30 rounded-full blur-[80px]"
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* 404 Number with Effects */}
        <motion.div variants={itemVariants} className="relative mb-8">
          {/* Glow Effect Behind Number */}
          <motion.div
            animate={pulseAnimation}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-[12rem] md:text-[16rem] font-extrabold text-primary/20 blur-2xl select-none">
              404
            </span>
          </motion.div>

          {/* Main 404 Number */}
          <motion.div animate={floatingAnimation} className="relative">
            <h1 className="text-[8rem] md:text-[10rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground select-none">
              404
            </h1>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 md:top-0 md:right-0"
            >
              <Sparkles className="w-8 h-8 text-primary/60" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 md:bottom-0 md:left-0"
            >
              <Sparkles className="w-6 h-6 text-secondary-foreground/60" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif">
            Page not found
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have wandered off. Perhaps
            it&apos;s earning rewards somewhere else?
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button nativeButton={false} size={"xl"} render={<Link href="/" />}>
            <Home className="size-5 transition-transform group-hover:-translate-y-0.5" />
            Back Home
          </Button>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 h-14 px-8 bg-secondary text-secondary-foreground font-bold rounded-full text-base transition-all hover:bg-secondary/80 border border-border"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 rounded-full text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Check your Dashboard
            </motion.div>
          </Link>
        </motion.div>

        {/* Decorative Bottom Elements */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center justify-center gap-2 text-muted-foreground/40"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-primary/40"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            className="w-2 h-2 rounded-full bg-primary/60"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            className="w-2 h-2 rounded-full bg-primary/40"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
