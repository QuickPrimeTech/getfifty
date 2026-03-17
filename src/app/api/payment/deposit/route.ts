//@/app/api/payment/deposit/route.ts

import { NextResponse } from "next/server";
import IntaSend from "intasend-node";
import { createClient } from "@/lib/supabase/server";
import { ApiResponse } from "@/types/api";
import { Profile } from "@/types/profile";
import { createResponse } from "@/utils/api";
import { STKResponse } from "@/types/payment";

// Initialize IntaSend outside the handler so it's cached
const intasend = new IntaSend(
  process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY,
  process.env.INTASEND_SECRET_KEY,
  process.env.NODE_ENV !== "production", // Evaluates to true in local dev, false in prod
);

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<Profile | null>>> {
  const supabase = await createClient();

  try {
    // 1. Parse the incoming request body
    const user: Profile = await request.json();
    const amount = 1;

    if (!user.profileId || !user.phone) {
      return createResponse(400, "Missing phone number or user info");
    }

    // 2. Trigger the IntaSend M-Pesa STK Push
    const collection = intasend.collection();
    const { invoice: stkResponse }: STKResponse = await collection.mpesaStkPush(
      {
        first_name: user.fullName, // Can be dynamic if you pass it in the body
        last_name: "Deposit",
        email: user.email, // Optional but recommended
        host: "https://quickprimetech.com", // Replace with your actual domain
        amount,
        phone_number: user.phone,
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

    console.log("db data ---->", dbData);
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
