/**
 * Sanitizes Kenyan phone numbers to the 254... format (No + sign)
 * Examples:
 * 0717448835    -> 254717448835
 * +254717448835 -> 254717448835
 * 254717448835  -> 254717448835
 * 717448835     -> 254717448835
 */
export const sanitizePhoneNumber = (phone: string): string => {
  // 1. Remove all non-numeric characters (removes spaces, +, dashes)
  let cleaned = phone.replace(/\D/g, "");

  // 2. Handle the "07..." or "01..." format
  if (cleaned.startsWith("0")) {
    return "254" + cleaned.slice(1);
  }

  // 3. Handle the "7..." or "1..." format (missing country code and leading zero)
  if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
    return "254" + cleaned;
  }

  // 4. If it starts with 254 and is the correct length, return as is.
  // This handles "+254..." which became "254..." in step 1.
  if (cleaned.startsWith("254") && cleaned.length === 12) {
    return cleaned;
  }

  return cleaned;
};
