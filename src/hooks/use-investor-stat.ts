// @/hooks/use-investor-stat.ts
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export type InvestorStat = {
  investor_percentage: number;
  expected_bonus_gross: number;
  expected_bonus_net: number;
};

export const useInvestorStatQuery = () => {
  const supabase = createClient();

  return useQuery<InvestorStat>({
    queryKey: ["investor-stat"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_investor_stats");

      // Log error for your eyes, but don't crash the query for the user
      if (error) {
        console.error("Investor RPC Error:", error.message);
        return {
          investor_percentage: 0,
          expected_bonus_gross: 0,
          expected_bonus_net: 0,
        };
      }

      // If no data or array is empty, return "Zero State"
      if (!data || data.length === 0) {
        return {
          investor_percentage: 0,
          expected_bonus_gross: 0,
          expected_bonus_net: 0,
        };
      }

      return data[0];
    },
    // Optional: Only retry once if there's a real network error
    retry: 1,
    // Optional: Keep the data fresh for 5 mins to avoid unnecessary calls
    staleTime: 1000 * 60 * 5,
  });
};
