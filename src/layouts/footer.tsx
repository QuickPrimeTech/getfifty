"use client";
import Link from "next/link";
import { contactInfo, navLinks } from "./navbar";
import Logo from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background rounded-t-3xl">
      <div className="container py-12 px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <Logo size={40} />
              <h3 className="text-lg font-semibold text-foreground">
                GetFifty
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your trusted partner for calculating payouts and managing your
              financial needs efficiently.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 GetFifty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
