"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { User } from "lucide-react";

export const PayoutCalculator = () => {
  const [referrals, setReferrals] = useState<number>(5);
  const earnings = (referrals || 0) * 50;

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const controls = animate(count, earnings, {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsubscribe = rounded.on("change", (v) => setDisplayCount(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [earnings, count, rounded]);

  // Handle input change with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setReferrals(1);
      return;
    }

    const numValue = parseInt(value, 10);

    if (!isNaN(numValue)) {
      const clampedValue = Math.max(1, Math.min(1000, numValue));
      setReferrals(clampedValue);
    }
  };

  // Handle slider change - matches shadcn Slider signature
  const handleSliderChange = (value: number | readonly number[]) => {
    // Extract first value if it's an array, otherwise use the number
    const newValue = Array.isArray(value) ? value[0] : value;
    if (typeof newValue === "number" && !isNaN(newValue)) {
      setReferrals(newValue);
    }
  };

  const safeReferrals = referrals || 1;
  const displayValue = safeReferrals.toString();

  return (
    <section className="py-24 px-4 bg-secondary rounded-3xl" id="calculator">
      <div className="container flex flex-col items-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Payout Calculator
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 w-full max-w-3xl bg-background border border-border rounded-[24px] shadow-card"
        >
          <div className="flex flex-col gap-8">
            <div>
              <label className="text-sm text-muted-foreground font-medium block mb-4">
                People you refer
              </label>

              <Slider
                value={[safeReferrals]}
                onValueChange={handleSliderChange}
                max={1000}
                min={1}
                step={1}
                className="w-full mb-6"
              />

              <div className="flex items-center gap-3">
                <InputGroup className="w-fit">
                  <InputGroupInput
                    type="number"
                    max={1000}
                    value={displayValue}
                    onChange={handleInputChange}
                    className="w-24 text-center font-bold"
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
                <span className="text-sm text-muted-foreground">
                  {safeReferrals === 1 ? "person" : "people"}
                </span>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground mt-4">
                <span>1</span>
                <span>1000</span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-2">
                Your earnings
              </p>
              <p className="payout-text text-[clamp(2.5rem,10vw,5rem)] font-extrabold text-primary leading-none">
                Ksh {displayCount}/-
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
