// @/components/email-templates/referral-link-generated.tsx

import { Body, Head, Html, Preview } from "@react-email/components";

type ReferralLinkGeneratedProps = {
  username?: string;
  referralLink?: string;
  referralCode?: string;
};

export default function ReferralLinkGenerated({
  username = "Partner",
  referralLink = "https://getfifty.vercel.app/join/YOURCODE",
  referralCode = "YOURCODE",
}: ReferralLinkGeneratedProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
          @media only screen and (max-width: 480px) {
            .email-container { width: 100% !important; }
            .body-pad { padding: 28px 20px 36px !important; }
            .share-grid td { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
            .share-spacer { display: none !important; }
          }
        `}</style>
      </Head>
      <Preview>
        Your referral link is live — start sharing and earning! 🔗
      </Preview>

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
                                  🔗 Referral Link Generated
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
                          Your link is{" "}
                          <em style={{ color: "#4ade80" }}>live,</em>
                          <br />
                          {username}.
                        </h1>
                        <p
                          style={{
                            margin: "10px 0 0",
                            fontSize: 15,
                            color: "#bbf7d0",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Every share is a step closer to your next payout.
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
                          Your unique referral link has been generated and is
                          ready to share. Every person who signs up through your
                          link puts{" "}
                          <strong style={{ color: "#16a34a" }}>
                            money directly in your wallet.
                          </strong>
                        </p>

                        {/* Link card */}
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ marginBottom: 12 }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "#f0fdf4",
                                  border: "1.5px solid #bbf7d0",
                                  borderRadius: 12,
                                  padding: "6px 6px 6px 20px",
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
                                          color: "#16a34a",
                                          fontWeight: 600,
                                          fontFamily: "monospace",
                                          wordBreak: "break-all",
                                        }}
                                      >
                                        {referralLink}
                                      </td>
                                      <td
                                        align="right"
                                        valign="middle"
                                        style={{
                                          paddingLeft: 12,
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        <a
                                          href={
                                            "https://getfifty.vercel.app/dashboard/link"
                                          }
                                          style={{
                                            display: "inline-block",
                                            backgroundColor: "#16a34a",
                                            color: "#ffffff",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            textDecoration: "none",
                                            borderRadius: 8,
                                            padding: "10px 18px",
                                            fontFamily: "'DM Sans', sans-serif",
                                          }}
                                        >
                                          Copy →
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Code badge */}
                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ marginBottom: 28 }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "#dcfce7",
                                  borderRadius: 8,
                                  padding: "8px 14px",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 12,
                                    color: "#15803d",
                                    fontWeight: 700,
                                    letterSpacing: "0.1em",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  Your code:{" "}
                                  <span
                                    style={{
                                      fontFamily: "monospace",
                                      fontSize: 13,
                                    }}
                                  >
                                    {referralCode}
                                  </span>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Where to share */}
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
                          Best places to share
                        </p>

                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          className="share-grid"
                          style={{ marginBottom: 32 }}
                        >
                          <tbody>
                            <tr>
                              {[
                                {
                                  icon: "📱",
                                  label: "WhatsApp",
                                  desc: "Share with groups & contacts",
                                },
                                {
                                  icon: "🐦",
                                  label: "Social Media",
                                  desc: "Post to your audience",
                                },
                                {
                                  icon: "📧",
                                  label: "Email",
                                  desc: "Send to your network",
                                },
                              ].map((ch, i) => (
                                <>
                                  {i > 0 && (
                                    <td
                                      className="share-spacer"
                                      style={{ width: 10 }}
                                    />
                                  )}
                                  <td
                                    key={i}
                                    valign="top"
                                    style={{
                                      backgroundColor: "#f8fafc",
                                      border: "1.5px solid #e2e8f0",
                                      borderRadius: 10,
                                      padding: "14px 12px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <p
                                      style={{
                                        margin: "0 0 4px",
                                        fontSize: 20,
                                      }}
                                    >
                                      {ch.icon}
                                    </p>
                                    <p
                                      style={{
                                        margin: "0 0 2px",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#111827",
                                        fontFamily: "'DM Sans', sans-serif",
                                      }}
                                    >
                                      {ch.label}
                                    </p>
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        fontFamily: "'DM Sans', sans-serif",
                                      }}
                                    >
                                      {ch.desc}
                                    </p>
                                  </td>
                                </>
                              ))}
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
