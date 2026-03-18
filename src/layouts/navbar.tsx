"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  Phone,
  Mail,
  Clock,
  Moon,
  Sun,
  Type,
  MousePointer2,
  Accessibility,
  ArrowRight,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
// import { Logo } from "@/components/logo";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Calculate Payout", href: "/#calculator" },
  { label: "Help & Support", href: "/help" },
  { label: "Create Account", href: "/auth/create-account" },
  { label: "Login", href: "/auth/login" },
];

export const contactInfo = [
  { icon: Phone, label: "+254 700 000 00", href: "tel:+254700000000" },
  {
    icon: Mail,
    label: "info@getfifty.com",
    href: "mailto:info@getfifty.com",
  },
  { icon: Clock, label: "Active 24/7", href: "#" },
];

// Text size options
const TEXT_SIZE_OPTIONS = [
  { size: "14px", label: "Sm", className: "text-xs" },
  { size: "16px", label: "Md", className: "text-xs font-medium" },
  { size: "18px", label: "Lg", className: "text-xs font-bold" },
];

const CTAButton = ({ size, ...props }: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      nativeButton={false}
      size={size || "lg"}
      {...props}
      render={
        <Link href="/auth/create-account">
          Get Your Link Now
          <ArrowRight />
        </Link>
      }
    />
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // Accessibility states
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle link click
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Animation variants with proper typing
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
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 font-sans z-50 transition-all duration-300 border-b border-border/50 rounded-b-3xl ${
        scrolled ? "bg-background/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={48} />
          <span className="text-xl font-heading font-bold text-foreground">
            GetFifty
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              nativeButton={false}
              size={"lg"}
              variant={"ghost"}
              render={
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              }
            ></Button>
          ))}
          <CTAButton className={"animate-pulse"} />
        </div>

        {/* Mobile Sheet Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <Button variant={"secondary"}>
                <Menu className="size-6" />
              </Button>
            }
          />

          <SheetContent
            side="right"
            className="w-4/5 sm:w-1/2 border-l overflow-hidden border-border/50 p-0 flex flex-col rounded-tl-lg gap-0"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50 rounded-b-2xl">
              <div className="flex items-center gap-2">
                <Logo size={32} />
                <span className="text-lg font-heading font-bold">GetFifty</span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation Links */}
              <motion.div
                className="p-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Pages
                </h3>
                <nav className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div key={link.label} variants={itemVariants}>
                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            href={link.href}
                            onClick={handleLinkClick}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-primary dark:text-primary-foreground bg-primary/10 transition-all"
                          >
                            <span className="size-8 flex items-center justify-center rounded-md bg-primary/20 transition-colors text-sm font-bold text-primary/80 dark:text-primary-foreground/70 group-hover:text-primary">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {link.label}
                            <motion.div
                              className="ml-auto"
                              whileHover={{ x: 3 }}
                            >
                              →
                            </motion.div>
                          </Link>
                        }
                      />
                    </motion.div>
                  ))}
                  <SheetClose
                    nativeButton={false}
                    render={<CTAButton className={"w-full mt-3"} />}
                  />
                </nav>
              </motion.div>

              <Separator className="w-auto bg-border/50" />

              {/* Contact Info */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Connect With Us
                </h3>
                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground transition-colors">
                          {item.label}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <Separator className="w-auto bg-border/50" />

              {/* Accessibility Panel */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Accessibility className="h-4 w-4 text-primary" />
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Accessibility
                  </h3>
                </div>

                <div className="space-y-4 bg-primary/5 rounded-xl p-4">
                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        {resolvedTheme === "dark" ? (
                          <Moon className="h-4 w-4 text-primary" />
                        ) : (
                          <Sun className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <Label
                        htmlFor="dark-mode"
                        className="text-sm fon  t-medium cursor-pointer"
                      >
                        Dark Mode
                      </Label>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={resolvedTheme === "dark"}
                      onCheckedChange={(checked) =>
                        setTheme(checked ? "dark" : "light")
                      }
                    />
                  </div>

                  {/* Large Text Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Type className="h-4 w-4 text-primary" />
                      </div>
                      <Label
                        htmlFor="large-text"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Text Size
                      </Label>
                    </div>
                    <div className="flex gap-1.5">
                      {TEXT_SIZE_OPTIONS.map((option) => (
                        <Button
                          key={option.size}
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            (document.documentElement.style.fontSize =
                              option.size)
                          }
                          className={cn("h-8 w-8 p-0", option.className)}
                          aria-label={`Change text size to ${option.size}`}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Reduced Motion Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MousePointer2 className="h-4 w-4 text-primary" />
                      </div>
                      <Label
                        htmlFor="reduced-motion"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Reduced Motion
                      </Label>
                    </div>
                    <Switch
                      id="reduced-motion"
                      checked={reducedMotion}
                      onCheckedChange={setReducedMotion}
                    />
                  </div>
                </div>

                {/* Quick Action Button */}
                <Button
                  nativeButton={false}
                  className="w-full mt-6"
                  size="lg"
                  render={
                    <Link href={"tel:+254717448835"}>
                      <Phone className="mr-2 h-4 w-4" />
                      Emergency: 24/7 Support
                    </Link>
                  }
                />
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
};
