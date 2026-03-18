// @/lib/intasend/server.ts

import IntaSend from "intasend-node";

// Initialize IntaSend outside the handler so it's cached
export const intasend = new IntaSend(
  process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY,
  process.env.INTASEND_SECRET_KEY,
  process.env.NODE_ENV !== "production", // Evaluates to true in local dev, false in prod
);
