import { createResponse } from "@/utils/api";
import { CallbackResponse } from "@/types/payment";
import { createSuperClient } from "@/lib/supabase/admin";
import { randomBytes } from "crypto";

// Function to generate a high-entropy short code
const generateUniqueCode = (length = 8) => {
  // Custom alphabet: No O, 0, I, 1, L to prevent user confusion
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  const randomValues = randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
};

export async function POST(request: Request) {
  try {
    const data: CallbackResponse = await request.json();

    const supabaseAdmin = await createSuperClient();

    const status = data.state.toLowerCase();
    const invoiceId = data.invoice_id;

    const amount = parseFloat(data.value); // comes as '1.00'
    const charges = parseFloat(data.charges); // comes as '2.00'

    if (!invoiceId) {
      return createResponse(400, "Missing invoice_id");
    }

    const profileId = data.api_ref;

    // Update the transaction where invoice_id matches
    // 3. Use it in your upsert
    const { error: dbError } = await supabaseAdmin.from("transactions").upsert(
      {
        invoice_id: data.invoice_id,
        profile_id: profileId,
        amount, // Now a valid numeric type
        status: status,
        type: "deposit",
        description: data.failed_reason
          ? `${data.failed_reason}`
          : `${data.mpesa_reference || "Processing"}`,
        charges,
      },
      { onConflict: "invoice_id" },
    );

    if (dbError) {
      console.error("Database Update Error:", dbError);
      return createResponse(500, "Database update failed");
    }

    if (status === "complete") {
      let activated = false;
      let attempts = 0;

      while (!activated && attempts < 3) {
        const generatedCode = generateUniqueCode(8); // 8 chars is safer for 1B+ users

        const { error: profileError, data: updatedData } = await supabaseAdmin
          .from("profiles")
          .update({ referral_code: generatedCode })
          .eq("id", profileId)
          .is("referral_code", null)
          .select();

        if (!profileError) {
          activated = true;
        } else if (profileError.code === "23505") {
          // 23505 is the Postgres error code for Unique Violation
          attempts++;
          console.warn(
            `Collision detected for code ${generatedCode}, retrying...`,
          );
        } else {
          console.error("Profile Activation Error:", profileError);
          break;
        }
      }
    }

    return createResponse(200, "Callback processed successfully");
  } catch (error: any) {
    console.error("Callback Error:", error);
    return createResponse(500, error?.message || "Internal Server Error");
  }
}
