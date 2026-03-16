import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  const supabase = createClient();

  return useQuery<Profile>({
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
        profileId: profile?.id,
        // Preference: Database name > Auth Metadata name
        fullName: profile?.name || authUser.user_metadata?.full_name || "User",
        email: authUser.email || "",
        avatarUrl: authUser.user_metadata?.avatar_url || "",
        phone: profile?.phone || null,
        referralCode: profile?.referral_code || null,
      };
    },
  });
}
