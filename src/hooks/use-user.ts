import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

type UserProfile = {
  fullName: string;
  email: string;
  avatarUrl: string;
  phone: string | null;
  referralCode: string | null;
  id: string;
};

export function useUserQuery() {
  const supabase = createClient();

  return useQuery<UserProfile>({
    queryKey: ["user"],
    queryFn: async () => {
      // 1. Get the current session/user
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) throw new Error("Not authenticated");

      // 2. Fetch the corresponding profile from the 'profiles' table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name, phone, referral_code, id")
        .eq("user_id", authUser.id)
        .single(); // We use .single() because user_id is unique

      if (profileError) {
        console.error("Profile fetch error:", profileError);
      }

      // 3. Merge Auth Metadata with Database Profile
      return {
        id: profile?.id || authUser.id,
        // Preference: Database name > Auth Metadata name
        fullName: profile?.name || authUser.user_metadata?.full_name || "User",
        email: authUser.email || "",
        avatarUrl: authUser.user_metadata?.avatar_url || "",
        phone: profile?.phone || null,
        referralCode: profile?.referral_code || null,
      };
    },
    // Optional: Keep data fresh but don't over-fetch
    staleTime: 1000 * 60 * 5,
  });
}
