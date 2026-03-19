// @/components/email-templates/click-analytics.tsx

import { Body, Head, Html, Preview } from "@react-email/components";

type AnalyticsEmailProps = {
  username?: string;
  clicks?: number;
  conversions?: number;
  conversionRate?: string;
};

export default function ClicAnalytics({
  username = "Partner",
  clicks = 0,
  conversions = 0,
  conversionRate = "0%",
}: AnalyticsEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
          @media only screen and (max-width: 480px) {
            .email-container { width: 100% !important; }
            .body-pad { padding: 28px 20px 36px !important; }
            .stat-block { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
            .stat-spacer { display: none !important; }
          }
        `}</style>
      </Head>
      <Preview>Your weekly performance update is ready 📊</Preview>

      <Body
        style={{
          backgroundColor: "#f0fdf4",
          margin: 0,
          padding: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ backgroundColor: "#f0fdf4", padding: "40px 16px" }}
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
                                  📊 Weekly Analytics
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
                          Here's your
                          <br />
                          <em style={{ color: "#4ade80" }}>weekly snapshot,</em>
                          <br />
                          {username}.
                        </h1>
                        <p
                          style={{
                            margin: "12px 0 0",
                            fontSize: 15,
                            color: "#bbf7d0",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Your links are performing well this week.
                        </p>
                      </td>
                    </tr>

                    {/* Stats */}
                    <tr>
                      <td
                        className="body-pad"
                        style={{ padding: "36px 40px 0" }}
                      >
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ marginBottom: 28 }}
                        >
                          <tbody>
                            <tr>
                              {[
                                {
                                  label: "Total Clicks",
                                  value: clicks.toLocaleString(),
                                  icon: "👆",
                                },
                                {
                                  label: "Conversions",
                                  value: String(conversions),
                                  icon: "✅",
                                },
                                {
                                  label: "Conversion Rate",
                                  value: conversionRate,
                                  icon: "📈",
                                },
                              ].map((stat, i) => (
                                <>
                                  {i > 0 && (
                                    <td
                                      key={`sp-${i}`}
                                      className="stat-spacer"
                                      style={{ width: 10 }}
                                    />
                                  )}
                                  <td
                                    key={i}
                                    className="stat-block"
                                    valign="top"
                                    style={{
                                      backgroundColor: "#f0fdf4",
                                      border: "1.5px solid #bbf7d0",
                                      borderRadius: 12,
                                      padding: "18px 12px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <p
                                      style={{
                                        margin: "0 0 6px",
                                        fontSize: 18,
                                      }}
                                    >
                                      {stat.icon}
                                    </p>
                                    <p
                                      style={{
                                        margin: "0 0 4px",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        color: "#16a34a",
                                        fontFamily: "'DM Sans', sans-serif",
                                      }}
                                    >
                                      {stat.label}
                                    </p>
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: "#052e16",
                                        fontFamily:
                                          "'DM Serif Display', Georgia, serif",
                                      }}
                                    >
                                      {stat.value}
                                    </p>
                                  </td>
                                </>
                              ))}
                            </tr>
                          </tbody>
                        </table>

                        {/* Note */}
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
                                  backgroundColor: "#f8fafc",
                                  border: "1.5px solid #e2e8f0",
                                  borderRadius: 10,
                                  padding: "14px 16px",
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 12,
                                    color: "#6b7280",
                                    lineHeight: 1.6,
                                    fontStyle: "italic",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  * These stats reflect activity from your
                                  account this week. For real-time data and
                                  account finances, visit your dashboard.
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
                                  href="https://getfifty.vercel.app/dashboard"
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
                                  Go to Dashboard →
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
