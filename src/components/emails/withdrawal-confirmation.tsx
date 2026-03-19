// @/components/email-templates/withdrawal-confirmation.tsx

import { Body, Head, Html, Preview } from "@react-email/components";

type WithdrawalConfirmationProps = {
  username?: string;
  amount?: string;
  currency?: string;
  method?: string;
  recipient?: string;
  reference?: string;
  date?: string;
};

export default function WithdrawalConfirmation({
  username = "Partner",
  amount = "50",
  currency = "KSh",
  method = "M-Pesa",
  recipient = "07XX XXX XXX",
  reference = "GF-20240319-001",
  date = new Date().toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
}: WithdrawalConfirmationProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
          @media only screen and (max-width: 480px) {
            .email-container { width: 100% !important; }
            .body-pad { padding: 28px 20px 36px !important; }
            .detail-row td { display: block !important; width: 100% !important; padding: 6px 0 !important; }
          }
        `}</style>
      </Head>
      <Preview>
        Withdrawal of {currency} {amount} is on its way 🏦
      </Preview>

      <Body
        style={{
          backgroundColor: "#f8fafc",
          margin: 0,
          padding: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ backgroundColor: "#f8fafc", padding: "40px 16px" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  className="email-container"
                  width="480"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
                  }}
                >
                  <tbody>
                    {/* Hero */}
                    <tr>
                      <td
                        style={{
                          background:
                            "linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)",
                          padding: "44px 40px 40px",
                          textAlign: "center",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: 130,
                            height: 130,
                            borderRadius: "50%",
                            backgroundColor: "rgba(134,239,172,0.07)",
                            position: "absolute",
                            top: -40,
                            right: -30,
                          }}
                        />
                        <div
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            backgroundColor: "rgba(134,239,172,0.05)",
                            position: "absolute",
                            bottom: -20,
                            left: -20,
                          }}
                        />

                        {/* Logo */}
                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ margin: "0 auto 18px" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 12,
                                  backgroundColor: "#4ade80",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  fontSize: 22,
                                  fontWeight: 700,
                                  color: "#052e16",
                                  fontFamily:
                                    "'DM Serif Display', Georgia, serif",
                                }}
                              >
                                G
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <p
                          style={{
                            margin: "0 0 16px",
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#86efac",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          GetFifty
                        </p>

                        {/* Status pill */}
                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ margin: "0 auto 20px" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "rgba(74,222,128,0.12)",
                                  border: "1.5px solid rgba(74,222,128,0.3)",
                                  borderRadius: 100,
                                  padding: "10px 24px",
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "#86efac",
                                    letterSpacing: "0.05em",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  ✅ Withdrawal Confirmed
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <h1
                          style={{
                            margin: "0 0 6px",
                            fontSize: 52,
                            fontWeight: 400,
                            lineHeight: 1,
                            color: "#ffffff",
                            fontFamily: "'DM Serif Display', Georgia, serif",
                          }}
                        >
                          <em style={{ color: "#4ade80" }}>
                            {currency} {amount}
                          </em>
                        </h1>
                        <p
                          style={{
                            margin: "10px 0 0",
                            fontSize: 15,
                            color: "#bbf7d0",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          is on its way to your {method} account.
                        </p>
                      </td>
                    </tr>

                    {/* Body */}
                    <tr>
                      <td
                        className="body-pad"
                        style={{ padding: "36px 40px 0" }}
                      >
                        <p
                          style={{
                            margin: "0 0 28px",
                            fontSize: 15,
                            lineHeight: 1.7,
                            color: "#374151",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Hey{" "}
                          <strong style={{ color: "#111827" }}>
                            {username}
                          </strong>
                          , your withdrawal has been processed successfully.
                          Here's a summary of your transaction:
                        </p>

                        {/* Transaction detail card */}
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{
                            backgroundColor: "#f0fdf4",
                            border: "1.5px solid #bbf7d0",
                            borderRadius: 12,
                            marginBottom: 32,
                          }}
                        >
                          <tbody>
                            {[
                              {
                                label: "Amount",
                                value: `${currency} ${amount}.00`,
                                highlight: true,
                              },
                              { label: "Method", value: method },
                              { label: "Recipient", value: recipient },
                              { label: "Reference", value: reference },
                              { label: "Date", value: date },
                            ].map((row, i, arr) => (
                              <tr key={i}>
                                <td
                                  style={{
                                    padding: "14px 20px",
                                    borderBottom:
                                      i < arr.length - 1
                                        ? "1px solid #dcfce7"
                                        : "none",
                                  }}
                                >
                                  <table
                                    width="100%"
                                    cellPadding="0"
                                    cellSpacing="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: 13,
                                            color: "#6b7280",
                                            fontFamily: "'DM Sans', sans-serif",
                                          }}
                                        >
                                          {row.label}
                                        </td>
                                        <td
                                          align="right"
                                          style={{
                                            fontSize: 13,
                                            fontWeight: row.highlight
                                              ? 700
                                              : 600,
                                            color: row.highlight
                                              ? "#16a34a"
                                              : "#111827",
                                            fontFamily: "'DM Sans', sans-serif",
                                          }}
                                        >
                                          {row.value}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Info note */}
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ marginBottom: 36 }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "#fffbeb",
                                  border: "1.5px solid #fde68a",
                                  borderRadius: 12,
                                  padding: "16px 20px",
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 13,
                                    color: "#92400e",
                                    lineHeight: 1.6,
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  ⏱ <strong>Processing time:</strong> Most
                                  withdrawals arrive within a few minutes. If
                                  you don't receive funds within 24 hours,
                                  please contact our support team.
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* CTA */}
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ marginBottom: 36 }}
                        >
                          <tbody>
                            <tr>
                              <td align="center">
                                <a
                                  href="https://getfifty.vercel.app/dashboard/withdraw"
                                  style={{
                                    display: "inline-block",
                                    backgroundColor: "#16a34a",
                                    color: "#ffffff",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    borderRadius: 10,
                                    padding: "14px 36px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: "0.02em",
                                  }}
                                >
                                  View Withdrawal History →
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td
                        style={{
                          borderTop: "1px solid #e5e7eb",
                          padding: "24px 40px",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 6px",
                            fontSize: 12,
                            color: "#9ca3af",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Questions? Reply to this email — we're happy to help.
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 12,
                            color: "#d1d5db",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          GetFifty Ltd, Nairobi, Kenya.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
  );
}
