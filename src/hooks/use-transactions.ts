// @/hooks/use-transactions.ts

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { PaymentStep, PaymentType } from "@/types/payment";

export type Transaction = {
  id: string;
  invoice_id: string;
  amount: number;
  charges: number;
  status: PaymentStep;
  type: PaymentType;
  description: string;
  created_at: string;
};

export const useTransactionsQuery = () => {
  const supabase = createClient();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: async (): Promise<Transaction[]> => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("status", "complete")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      return data as Transaction[];
    },
  });
};
