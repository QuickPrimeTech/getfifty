// @/hooks/use-transactions.ts
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export type Transaction = {
  id: string;
  profile_id: string;
  amount: number;
  type: "earning" | "withdrawal"; // reflect RPC types
  status: string;
  description: string | null;
  created_at: string;
};

export const useTransactionsQuery = () => {
  const supabase = createClient();

  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      // Call your RPC that returns both earnings & withdrawals
      const { data, error } = await supabase
        .rpc("get_user_transactions") // <- RPC
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      return (data as Transaction[]).sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    },
  });
};
