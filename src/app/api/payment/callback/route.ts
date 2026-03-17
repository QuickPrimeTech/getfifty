import { createResponse } from "@/utils/api";
import { CallbackResponse } from "@/types/payment";
import { createSuperClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const data: CallbackResponse = await request.json();
    const supabaseAdmin = await createSuperClient();

    console.log("callback data ------>", data);
    const status = data.state.toLowerCase();
    const invoiceId = data.invoice_id;

    const amount = parseFloat(data.value); // comes as '1.00'
    const charges = parseFloat(data.charges); // comes as '2.00'

    if (!invoiceId) {
      return createResponse(400, "Missing invoice_id");
    }

    // Update the transaction where invoice_id matches
    // 3. Use it in your upsert
    const { error: dbError } = await supabaseAdmin.from("transactions").upsert(
      {
        invoice_id: data.invoice_id,
        profile_id: data.api_ref,
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

    console.log(`Transaction ${invoiceId} updated to ${status}`);

    return createResponse(200, "Callback processed successfully");
  } catch (error: any) {
    console.error("Callback Error:", error);
    return createResponse(500, error?.message || "Internal Server Error");
  }
}
