// app/actions/auth.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Server Action can read env vars directly!
export async function signInWithOAuth(
  provider: "google" | "facebook",
  next?: string,
) {
  const supabase = await createClient();

  const cookieStore = await cookies();
  const referralCode = cookieStore.get("referral_code")?.value;

  // Read env vars on server - works perfectly!
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  // Ensure https and no trailing slash
  const cleanBaseUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;

  // Pass referral via query param to callback
  const redirectTo = `${cleanBaseUrl}/auth/callback?${[
    referralCode && `ref=${referralCode}`,
    next && `next=${encodeURIComponent(next)}`,
  ]
    .filter(Boolean)
    .join("&")}`;

  console.log("Server Action - Redirect URL:", redirectTo);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  // Redirect to the OAuth provider (Google/Facebook)
  if (data.url) {
    redirect(data.url);
  }
}
