// @/app/api/payment/withdraw/route.ts
import { createClient } from "@/lib/supabase/server";
import { createResponse } from "@/utils/api";
import { sanitizePhoneNumber } from "@/utils/formatters";
import { intasend } from "@/lib/intasend/server";
import { getWithdrawSchema } from "@/schemas/withdraw";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // 1. Auth & Profile Mapping
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    if (!authUser) return createResponse(401, "Unauthorized");

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, name")
      .eq("user_id", authUser.id)
      .single();

    if (!profile) return createResponse(404, "Profile not found");

    // 2. Validation & Cooldown
    const body = await req.json();
    const validation = getWithdrawSchema().safeParse(body);
    if (!validation.success) return createResponse(400, "Invalid input");

    const requestedAmount = Number(validation.data.amount);
    const cleanPhone = sanitizePhoneNumber(validation.data.phone);

    // Rate Limit Check
    const { data: lastTx } = await supabase
      .from("transactions")
      .select("created_at")
      .eq("profile_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastTx) {
      const diff = (Date.now() - new Date(lastTx.created_at).getTime()) / 1000;
      if (diff < 20)
        return createResponse(429, `Wait ${Math.ceil(20 - diff)}s.`);
    }

    // 3. Balance Check
    const [statsRes, investorRes] = await Promise.all([
      supabase.rpc("get_user_stats"),
      supabase.rpc("get_investor_stats"),
    ]);

    const balance = Number(statsRes.data?.[0]?.balance || 0);
    let bonus = 0;
    if (!investorRes.error && investorRes.data?.[0]?.investor_percentage > 0) {
      bonus = Number(investorRes.data?.[0]?.expected_bonus_net || 0);
    }

    const totalAvailable = Math.floor(balance + bonus);
    if (requestedAmount > totalAvailable) {
      return createResponse(
        402,
        `Insufficient funds. Max: KES ${totalAvailable}/-`,
      );
    }

    // 4. STEP 1: Insert "Pending" Record to get our DB ID
    const { data: dbRecord, error: dbError } = await supabase
      .from("transactions")
      .insert({
        profile_id: profile.id,
        amount: requestedAmount,
        type: "withdrawal",
        status: "pending",
        description: `M-Pesa withdrawal to ${cleanPhone}`,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // 5. STEP 2: Trigger IntaSend (requires_approval: "NO")
    try {
      const payoutResponse = await intasend.payouts().mpesa({
        batch_reference: dbRecord.id,
        currency: "KES",
        requires_approval: "NO", // This makes it instant
        transactions: [
          {
            name: profile.name || "User",
            account: cleanPhone,
            amount: requestedAmount.toString(),
            narrative: `Withdrawal ${dbRecord.id}`, // We pass our DB ID here
          },
        ],
      });

      return createResponse(200, "Withdrawal initiated successfully.", {
        id: dbRecord.id,
        invoice_id: payoutResponse.tracking_id,
      });
    } catch (payoutError: any) {
      console.error("IntaSend Error:", payoutError);

      // Mark as failed if the API call itself crashed
      await supabase
        .from("transactions")
        .update({
          status: "failed",
          description: "IntaSend API rejected the request",
        })
        .eq("id", dbRecord.id);

      return createResponse(502, "M-Pesa disbursement failed to initialize.");
    }
  } catch (error: any) {
    console.error("Withdrawal API Crash:", error.message);
    return createResponse(500, "Internal Server Error");
  }
}
