// @/hooks/use-dashboard-stats.ts
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export type DashboardStats = {
  total_earned: number;
  balance: number;
  pending_users: number;
  referrals_count: number;
};

export const useDashboardStats = () => {
  const supabase = createClient();

  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_user_stats");
      if (error) throw error;
      return data[0]; // Returns { balance, total_earned, referrals_count, pending_amount }
    },
  });
};
