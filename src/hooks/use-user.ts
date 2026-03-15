// use-user.ts
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

type User = {
  fullName: string;
  email: string;
  avatarUrl: string;
};
export function useUserQuery() {
  return useQuery<User, Error, User, string[]>({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getClaims();
      const user: User = {
        fullName: data?.claims.user_metadata?.full_name,
        email: data?.claims.user_metadata?.email,
        avatarUrl: data?.claims.user_metadata?.avatar_url,
      };
      return user;
    },
  });
}
