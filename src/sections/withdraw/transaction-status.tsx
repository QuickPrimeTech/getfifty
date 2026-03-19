// @/components/payment/transaction-status.tsx
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  X,
  Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type TransactionStatusProps = {
  transactionId: string;
  onClose?: () => void;
};

// Define the shape of our status objects to satisfy TypeScript
type StatusItem = {
  icon: any;
  color: string;
  label: string;
  animate?: string;
};

const statusConfig: Record<string, StatusItem> = {
  pending: {
    icon: Clock,
    color: "bg-info text-info-foreground border-info/20",
    label: "Pending",
  },
  processing: {
    icon: Loader,
    color: "bg-warning text-warning-foreground border-warning/20",
    label: "Processing",
    animate: "animate-spin",
  },
  complete: {
    icon: CheckCircle2,
    color: "bg-success text-success-foreground border-success/20",
    label: "Success",
  },
  failed: {
    icon: AlertCircle,
    color: "bg-destructive text-destructive-foreground border-destructive/20",
    label: "Failed",
  },
};

export const TransactionStatus = ({
  transactionId,
  onClose,
}: TransactionStatusProps) => {
  const [tx, setTx] = useState<{ status: string; description: string } | null>(
    null,
  );
  const queryClient = useQueryClient();
  const supabase = createClient();

  const handleRefreshData = () => {
    // We specifically target only the data that changes after a withdrawal
    queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    queryClient.invalidateQueries({ queryKey: ["investor-stat"] });
    queryClient.invalidateQueries({ queryKey: ["transactions"] });

    // Note: ["user"] is NOT invalidated here, keeping it cached and fast.

    toast.success("Balances updated successfully!");
  };

  useEffect(() => {
    const fetchInitial = async () => {
      const { data } = await supabase
        .from("transactions")
        .select("status, description")
        .eq("id", transactionId)
        .single();
      if (data) setTx(data);
    };

    fetchInitial();

    const channel = supabase
      .channel(`tx-update-${transactionId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "transactions",
          filter: `id=eq.${transactionId}`,
        },
        (payload) => {
          const newStatus = payload.new.status;
          setTx({
            status: newStatus,
            description: payload.new.description,
          });
          // Trigger invalidation if the status just became complete
          if (newStatus === "complete") {
            handleRefreshData();
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [transactionId, supabase]);

  if (!tx) return null;

  const config = statusConfig[tx.status] || statusConfig.pending;
  const Icon = config.icon;
  const isFinalState = tx.status === "complete" || tx.status === "failed";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        key={tx.status + tx.description}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "flex items-center gap-3 p-4 rounded-xl border shadow-sm transition-all duration-500",
          config.color,
        )}
      >
        <div className="shrink-0">
          <Icon className={cn("w-5 h-5", config.animate)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-xs font-black uppercase tracking-tighter opacity-80">
              {config.label}
            </p>
            {tx.status === "processing" && (
              <span className="flex h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            )}
          </div>
          <p className="text-sm font-semibold truncate leading-tight mt-0.5">
            {tx.description || "Updating status..."}
          </p>
        </div>

        {isFinalState && onClose ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 rounded-full hover:bg-black/10 text-current"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <ArrowUpRight className="w-4 h-4 opacity-40 shrink-0" />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
