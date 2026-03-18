// @/app/api/payment/callback/withdraw/route.ts
import { createSuperClient } from "@/lib/supabase/admin";
import { createResponse } from "@/utils/api";

export async function POST(req: Request) {
  try {
    const supabase = await createSuperClient();
    const data = await req.json();

    //Validate if the post request is legit
    if (data.challenge !== process.env.PAYMENT_API_SECRET) {
      return createResponse(403, "The challenge is incorrect");
    }

    // 1. Extract IDs and Statuses
    const id = data.batch_reference; // This matches your 'invoice_id' column
    const overallStatus = data.status; // e.g., 'Processing payment' or 'Completed'

    // IntaSend usually puts the specific transaction results in an array
    const transaction = data.transactions?.[0];
    if (!transaction) {
      return new Response("No transaction data", { status: 400 });
    }

    const statusCode = transaction.status_code; // e.g., 'TP101'

    // 2. Map IntaSend Status to your DB Schema Status
    // Based on your DB Constraints: ['pending', 'processing', 'complete', 'failed']
    let dbStatus = "processing";

    if (overallStatus === "Completed") {
      dbStatus = "complete";
    } else if (overallStatus === "Failed" || statusCode.startsWith("TF")) {
      dbStatus = "failed";
    }

    // 3. Update the Database
    const { error } = await supabase
      .from("transactions")
      .update({
        invoice_id: data.tracking_id,
        status: dbStatus,
        description: overallStatus, // Gives user visual feedback like "Sending payment"
        charges: Number(transaction.charge || 0),
      })
      .eq("id", id);

    if (error) {
      console.error("DB Update Error:", error);
      return new Response("Database Error", { status: 500 });
    }

    // 4. CRITICAL: Always return a 200 OK to IntaSend
    return new Response("OK", { status: 200 });
  } catch (err: any) {
    console.error("Callback Crash:", err.message);
    return new Response("Internal Error", { status: 500 });
  }
}
