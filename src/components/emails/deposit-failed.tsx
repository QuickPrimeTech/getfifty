// @/components/email-templates/deposit-failed.tsx

import { Body, Head, Html, Preview } from "@react-email/components";

type DepositFailedProps = {
  username?: string;
  amount?: string;
  currency?: string;
  method?: string;
  reference?: string;
  reason?: string;
  date?: string;
};

export default function DepositFailed({
  username = "Partner",
  amount = "100",
  currency = "KSh",
  method = "M-Pesa",
  reference = "GF-DEP-20240319-001",
  reason = "We could not confirm your payment. The STK push may have timed out or was cancelled. Please try initiating the payment again.",
  date = new Date().toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
}: DepositFailedProps) {
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
        Your deposit of {currency} {amount} didn't go through — your referral
        link is pending ⚠️
      </Preview>

      <Body
        style={{
          backgroundColor: "#fefce8",
          margin: 0,
          padding: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ backgroundColor: "#fefce8", padding: "40px 16px" }}
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
                    {/* Hero — amber/orange tone for a "warning" feel, distinct from red */}
                    <tr>
                      <td
                        style={{
                          background:
                            "linear-gradient(135deg, #451a03 0%, #78350f 60%, #92400e 100%)",
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
                            backgroundColor: "rgba(253,211,77,0.07)",
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
                            backgroundColor: "rgba(253,211,77,0.05)",
                            position: "absolute",
                            bottom: -20,
                            left: -20,
                          }}
                        />

                        {/* Logo — keep green to stay on brand */}
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
                            color: "#fde68a",
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
                                  backgroundColor: "rgba(253,211,77,0.12)",
                                  border: "1.5px solid rgba(253,211,77,0.3)",
                                  borderRadius: 100,
                                  padding: "10px 24px",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "#fde68a",
                                    letterSpacing: "0.05em",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  ⚠️ Deposit Failed
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
                          <em style={{ color: "#fcd34d" }}>
                            {currency} {amount}
                          </em>
                        </h1>
                        <p
                          style={{
                            margin: "10px 0 0",
                            fontSize: 15,
                            color: "#fde68a",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          deposit did not go through.
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
                          , your deposit of{" "}
                          <strong style={{ color: "#d97706" }}>
                            {currency} {amount}
                          </strong>{" "}
                          to activate your referral link was unsuccessful. No
                          money has been charged — please try again to unlock
                          your link.
                        </p>

                        {/* What was blocked callout */}
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ marginBottom: 20 }}
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
                                <table
                                  width="100%"
                                  cellPadding="0"
                                  cellSpacing="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        valign="middle"
                                        style={{ paddingRight: 14 }}
                                      >
                                        <div
                                          style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 10,
                                            backgroundColor: "#fef3c7",
                                            border: "1.5px solid #fde68a",
                                            textAlign: "center",
                                            lineHeight: "40px",
                                            fontSize: 20,
                                          }}
                                        >
                                          🔗
                                        </div>
                                      </td>
                                      <td valign="middle">
                                        <p
                                          style={{
                                            margin: "0 0 2px",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#92400e",
                                            fontFamily: "'DM Sans', sans-serif",
                                          }}
                                        >
                                          Referral link not yet activated
                                        </p>
                                        <p
                                          style={{
                                            margin: 0,
                                            fontSize: 12,
                                            color: "#b45309",
                                            lineHeight: 1.5,
                                            fontFamily: "'DM Sans', sans-serif",
                                          }}
                                        >
                                          A one-time deposit of{" "}
                                          <strong>
                                            {currency} {amount}
                                          </strong>{" "}
                                          via {method} is required to generate
                                          your referral link.
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Transaction detail card */}
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{
                            backgroundColor: "#fffbeb",
                            border: "1.5px solid #fde68a",
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
                              { label: "Reference", value: reference },
                              { label: "Date", value: date },
                              { label: "Status", value: "Failed" },
                            ].map((row, i, arr) => (
                              <tr key={i}>
                                <td
                                  style={{
                                    padding: "14px 20px",
                                    borderBottom:
                                      i < arr.length - 1
                                        ? "1px solid #fef3c7"
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
                                              ? "#d97706"
                                              : row.label === "Status"
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

                        {/* Failure reason */}
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
                                  backgroundColor: "#fff7ed",
                                  border: "1.5px solid #fed7aa",
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
                                    color: "#c2410c",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  Why it failed
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 13,
                                    color: "#7c2d12",
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

                        {/* Steps */}
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
                          How to retry
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
                                title: "Go to your Dashboard",
                                desc: "Log in and head to the referral link activation page.",
                              },
                              {
                                num: "02",
                                title: "Initiate payment again",
                                desc: `You'll receive an M-Pesa STK push for ${currency} ${amount}. Enter your PIN to confirm.`,
                              },
                              {
                                num: "03",
                                title: "Get your link instantly",
                                desc: "Once payment clears, your referral link activates immediately.",
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
                                              backgroundColor: "#fffbeb",
                                              border: "1.5px solid #fde68a",
                                              textAlign: "center",
                                              lineHeight: "36px",
                                              fontSize: 11,
                                              fontWeight: 700,
                                              color: "#d97706",
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
                                  href="https://getfifty.vercel.app/dashboard"
                                  style={{
                                    display: "inline-block",
                                    backgroundColor: "#d97706",
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
                                  Retry Deposit →
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
