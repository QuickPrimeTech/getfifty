// @/components/email-templates/withdrawal-failed.tsx

import { Body, Head, Html, Preview } from "@react-email/components";

type WithdrawalFailedProps = {
  username?: string;
  amount?: string;
  currency?: string;
  method?: string;
  recipient?: string;
  reference?: string;
  reason?: string;
  date?: string;
};

export default function WithdrawalFailed({
  username = "Partner",
  amount = "50",
  currency = "KSh",
  method = "M-Pesa",
  recipient = "07XX XXX XXX",
  reference = "GF-20240319-001",
  reason = "The recipient number provided could not be found on M-Pesa. Please check your details and try again.",
  date = new Date().toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
}: WithdrawalFailedProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
          @media only screen and (max-width: 480px) {
            .email-container { width: 100% !important; }
            .body-pad { padding: 28px 20px 36px !important; }
          }
        `}</style>
      </Head>
      <Preview>
        Your withdrawal of {currency} {amount} could not be processed ⚠️
      </Preview>

      <Body
        style={{
          backgroundColor: "#fef2f2",
          margin: 0,
          padding: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ backgroundColor: "#fef2f2", padding: "40px 16px" }}
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
                    {/* Hero — deep red tone, same structure */}
                    <tr>
                      <td
                        style={{
                          background:
                            "linear-gradient(135deg, #450a0a 0%, #7f1d1d 60%, #991b1b 100%)",
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
                            backgroundColor: "rgba(252,165,165,0.07)",
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
                            backgroundColor: "rgba(252,165,165,0.05)",
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
                            color: "#fca5a5",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          GetFifty
                        </p>

                        {/* Badge */}
                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ margin: "0 auto 20px" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "rgba(252,165,165,0.12)",
                                  border: "1.5px solid rgba(252,165,165,0.3)",
                                  borderRadius: 100,
                                  padding: "10px 24px",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "#fca5a5",
                                    letterSpacing: "0.05em",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  ⚠️ Withdrawal Failed
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
                          <em style={{ color: "#fca5a5" }}>
                            {currency} {amount}
                          </em>
                        </h1>
                        <p
                          style={{
                            margin: "10px 0 0",
                            fontSize: 15,
                            color: "#fecaca",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          could not be sent to your {method} account.
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
                            margin: "0 0 24px",
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
                          , unfortunately your withdrawal request could not be
                          completed. Your balance has{" "}
                          <strong style={{ color: "#16a34a" }}>
                            not been deducted
                          </strong>{" "}
                          — the funds are safe in your wallet.
                        </p>

                        {/* Transaction detail card */}
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{
                            backgroundColor: "#fff1f2",
                            border: "1.5px solid #fecdd3",
                            borderRadius: 12,
                            marginBottom: 20,
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
                                        ? "1px solid #ffe4e6"
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
                                              ? "#dc2626"
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

                        {/* Reason */}
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ marginBottom: 28 }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "#fef2f2",
                                  border: "1.5px solid #fecdd3",
                                  borderRadius: 12,
                                  padding: "16px 20px",
                                }}
                              >
                                <p
                                  style={{
                                    margin: "0 0 4px",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    color: "#dc2626",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  Reason for failure
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 13,
                                    color: "#7f1d1d",
                                    lineHeight: 1.6,
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  {reason}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* What to do */}
                        <p
                          style={{
                            margin: "0 0 14px",
                            fontSize: 13,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#9ca3af",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          What to do next
                        </p>
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ marginBottom: 32 }}
                        >
                          <tbody>
                            {[
                              {
                                num: "01",
                                title: "Check your details",
                                desc: "Make sure your M-Pesa number or bank account is correct.",
                              },
                              {
                                num: "02",
                                title: "Update & retry",
                                desc: "Head to the withdraw page to update your info and try again.",
                              },
                              {
                                num: "03",
                                title: "Contact support",
                                desc: "If the issue persists, reply to this email for help.",
                              },
                            ].map((step, i) => (
                              <tr key={i}>
                                <td style={{ paddingBottom: 14 }}>
                                  <table
                                    width="100%"
                                    cellPadding="0"
                                    cellSpacing="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          valign="top"
                                          style={{
                                            width: 40,
                                            paddingRight: 14,
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: 36,
                                              height: 36,
                                              borderRadius: 10,
                                              backgroundColor: "#fff1f2",
                                              border: "1.5px solid #fecdd3",
                                              textAlign: "center",
                                              lineHeight: "36px",
                                              fontSize: 11,
                                              fontWeight: 700,
                                              color: "#dc2626",
                                              letterSpacing: "0.05em",
                                              fontFamily:
                                                "'DM Sans', sans-serif",
                                            }}
                                          >
                                            {step.num}
                                          </div>
                                        </td>
                                        <td valign="middle">
                                          <p
                                            style={{
                                              margin: "0 0 2px",
                                              fontSize: 14,
                                              fontWeight: 600,
                                              color: "#111827",
                                              fontFamily:
                                                "'DM Sans', sans-serif",
                                            }}
                                          >
                                            {step.title}
                                          </p>
                                          <p
                                            style={{
                                              margin: 0,
                                              fontSize: 13,
                                              color: "#6b7280",
                                              lineHeight: 1.5,
                                              fontFamily:
                                                "'DM Sans', sans-serif",
                                            }}
                                          >
                                            {step.desc}
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            ))}
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
                                    backgroundColor: "#dc2626",
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
                                  Try Again →
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
