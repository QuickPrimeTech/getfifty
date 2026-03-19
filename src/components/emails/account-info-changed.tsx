// @/components/email-templates/account-info-changed.tsx

import { Body, Head, Html, Preview } from "@react-email/components";

type AccountInfoChangedProps = {
  username?: string;
  changedFields?: { label: string; oldValue: string; newValue: string }[];
  date?: string;
  ipAddress?: string;
};

export default function AccountInfoChanged({
  username = "Partner",
  changedFields = [
    {
      label: "Email",
      oldValue: "old@example.com",
      newValue: "new@example.com",
    },
    {
      label: "Phone",
      oldValue: "+254 7XX XXX X00",
      newValue: "+254 7XX XXX X99",
    },
  ],
  date = new Date().toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  ipAddress = "41.90.XX.XX",
}: AccountInfoChangedProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
          @media only screen and (max-width: 480px) {
            .email-container { width: 100% !important; }
            .body-pad { padding: 28px 20px 36px !important; }
            .change-cols td { display: block !important; width: 100% !important; }
            .change-arrow { display: none !important; }
          }
        `}</style>
      </Head>
      <Preview>
        Your account info was updated — if this wasn't you, act now 🔐
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
                    {/* Hero — slightly different: security tone, same brand */}
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
                                  🔐 Account Updated
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <h1
                          style={{
                            margin: "0 0 10px",
                            fontSize: 34,
                            fontWeight: 400,
                            lineHeight: 1.2,
                            color: "#ffffff",
                            fontFamily: "'DM Serif Display', Georgia, serif",
                          }}
                        >
                          Your account info
                          <br />
                          <em style={{ color: "#4ade80" }}>
                            has been changed.
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
                          Review the changes below and take action if needed.
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
                          , the following changes were made to your GetFifty
                          account on <strong>{date}</strong>:
                        </p>

                        {/* Changes table */}
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{
                            backgroundColor: "#f0fdf4",
                            border: "1.5px solid #bbf7d0",
                            borderRadius: 12,
                            marginBottom: 28,
                          }}
                        >
                          <tbody>
                            {/* Header */}
                            <tr>
                              <td
                                style={{
                                  padding: "10px 20px",
                                  borderBottom: "1px solid #dcfce7",
                                }}
                              >
                                <table
                                  width="100%"
                                  cellPadding="0"
                                  cellSpacing="0"
                                  className="change-cols"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 11,
                                          fontWeight: 700,
                                          textTransform: "uppercase",
                                          letterSpacing: "0.1em",
                                          color: "#9ca3af",
                                          fontFamily: "'DM Sans', sans-serif",
                                          width: "30%",
                                        }}
                                      >
                                        Field
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 11,
                                          fontWeight: 700,
                                          textTransform: "uppercase",
                                          letterSpacing: "0.1em",
                                          color: "#9ca3af",
                                          fontFamily: "'DM Sans', sans-serif",
                                          width: "30%",
                                        }}
                                      >
                                        Before
                                      </td>
                                      <td
                                        className="change-arrow"
                                        style={{
                                          width: "10%",
                                          textAlign: "center",
                                        }}
                                      />
                                      <td
                                        style={{
                                          fontSize: 11,
                                          fontWeight: 700,
                                          textTransform: "uppercase",
                                          letterSpacing: "0.1em",
                                          color: "#16a34a",
                                          fontFamily: "'DM Sans', sans-serif",
                                        }}
                                      >
                                        After
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            {/* Rows */}
                            {changedFields.map((field, i, arr) => (
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
                                    className="change-cols"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#374151",
                                            fontFamily: "'DM Sans', sans-serif",
                                            width: "30%",
                                          }}
                                        >
                                          {field.label}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 13,
                                            color: "#9ca3af",
                                            fontFamily: "'DM Sans', sans-serif",
                                            textDecoration: "line-through",
                                            width: "30%",
                                          }}
                                        >
                                          {field.oldValue}
                                        </td>
                                        <td
                                          className="change-arrow"
                                          style={{
                                            fontSize: 14,
                                            color: "#16a34a",
                                            textAlign: "center",
                                            width: "10%",
                                          }}
                                        >
                                          →
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#16a34a",
                                            fontFamily: "'DM Sans', sans-serif",
                                          }}
                                        >
                                          {field.newValue}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            ))}
                            {/* Meta */}
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "#f8fafc",
                                  borderTop: "1px solid #dcfce7",
                                  padding: "10px 20px",
                                  borderRadius: "0 0 10px 10px",
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 11,
                                    color: "#9ca3af",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  IP address:{" "}
                                  <strong style={{ color: "#6b7280" }}>
                                    {ipAddress}
                                  </strong>{" "}
                                  &nbsp;·&nbsp; {date}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Warning */}
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
                                  backgroundColor: "#fff1f2",
                                  border: "1.5px solid #fecdd3",
                                  borderRadius: 12,
                                  padding: "16px 20px",
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 13,
                                    color: "#9f1239",
                                    lineHeight: 1.6,
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  🚨 <strong>Wasn't you?</strong> If you did not
                                  make these changes, please secure your account
                                  immediately by resetting your password and
                                  contacting our support team.
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* CTAs */}
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
                                    backgroundColor: "#16a34a",
                                    color: "#ffffff",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    borderRadius: 10,
                                    padding: "14px 28px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: "0.02em",
                                    marginRight: 10,
                                  }}
                                >
                                  Go to Dashboard →
                                </a>
                                <a
                                  href="https://getfifty.vercel.app/reset-password"
                                  style={{
                                    display: "inline-block",
                                    backgroundColor: "#ffffff",
                                    color: "#dc2626",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    borderRadius: 10,
                                    padding: "13px 28px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: "0.02em",
                                    border: "1.5px solid #fca5a5",
                                    marginTop: 8,
                                  }}
                                >
                                  Reset Password
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
