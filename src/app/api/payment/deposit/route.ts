//@/app/api/payment/deposit/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ApiResponse } from "@/types/api";
import { Profile } from "@/types/profile";
import { createResponse } from "@/utils/api";
import { STKResponse } from "@/types/payment";
import { accountSchema } from "@/schemas/account";
import { sanitizePhoneNumber } from "@/utils/formatters";
import { intasend } from "@/lib/intasend/server";

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<Profile | null>>> {
  const supabase = await createClient();

  try {
    // 1. Parse the incoming request body
    const user: Profile = await request.json();

    // Validate against your Zod Schema
    const validation = accountSchema.safeParse(user);
    if (!validation.success) {
      return createResponse(400, validation.error.issues[0].message);
    }

    const amount = 100;

    if (!user.profileId || !user.phone) {
      return createResponse(400, "Missing phone number or user info");
    }
    // Sanitize the phone number for IntaSend
    const sanitizedPhone = sanitizePhoneNumber(user.phone);

    // 2. Trigger the IntaSend M-Pesa STK Push
    const collection = intasend.collection();
    const { invoice: stkResponse }: STKResponse = await collection.mpesaStkPush(
      {
        first_name: user.fullName, // Can be dynamic if you pass it in the body
        last_name: "Deposit",
        email: user.email, // Optional but recommended
        host: "https://quickprimetech.com", // Replace with your actual domain
        amount,
        phone_number: sanitizedPhone,
        api_ref: user.profileId, // Great way to tie the Intasend webhook back to the user
      },
    );

    const dbData = {
      invoice_id: stkResponse.invoice_id,
      profile_id: user.profileId,
      amount,
      type: "deposit", // NOTE: You must update your SQL check constraint to allow this!
      status: stkResponse.state.toLowerCase(),
    };

    // 3. Update the Transaction Table (Status set to 'pending')
    const { data: transaction, error: dbError } = await supabase
      .from("transactions")
      .upsert(dbData, {
        onConflict: "invoice_id",
        ignoreDuplicates: true, // <--- THIS PREVENTS INSERT CONFLICT
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database Error:", dbError);
      return createResponse(500, "Failed to log transaction");
    }

    return createResponse(200, "STK Push sent successfully", transaction);
  } catch (error: any) {
    console.error("IntaSend/Server Error:", error);
    return createResponse(500, error?.message || "Internal Server Error");
  }
}
