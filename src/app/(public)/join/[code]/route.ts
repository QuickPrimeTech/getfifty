// app/join/[code]/route.ts
import { createSuperClient } from "@/lib/supabase/admin";
import { Params } from "@/types/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: Params<{ code: string }>,
) {
  const { code } = await params;
  const cookieStore = await cookies();

  // 1. Check if this user has already clicked THIS specific link recently
  const cookieName = `ref_tracked_${code}`;
  const hasClicked = cookieStore.get(cookieName);

  // 2. Prepare the redirect URL
  const redirectUrl = new URL("/auth/create-account", request.url);
  redirectUrl.searchParams.set("ref", code);

  // 3. If they haven't clicked, increment the count in Supabase
  if (!hasClicked) {
    const supabaseAdmin = await createSuperClient();

    // Increment referral_clicks by 1
    // We use a raw RPC call or a direct update
    await supabaseAdmin.rpc("increment_referral_clicks", {
      target_code: code,
    });
  }

  // 4. Create the response
  const response = NextResponse.redirect(redirectUrl);

  // 5. Set a cookie to prevent duplicate counts (Expires in 24 hours)
  if (!hasClicked) {
    response.cookies.set(cookieName, "true", {
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      httpOnly: true,
    });
  }

  return response;
}
