// @/components/email-templates/signup-confirmation.tsx
import { Body, Head, Html, Preview, Tailwind } from "@react-email/components";

type SignupConfirmationProps = {
  username?: string;
};

export default function SignupConfirmation({
  username = "Partner",
}: SignupConfirmationProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

          @media only screen and (max-width: 480px) {
            .email-container { width: 100% !important; padding: 24px 16px !important; }
            .step-row td { display: block !important; width: 100% !important; margin-bottom: 12px !important; }
            .step-spacer { display: none !important; }
          }
        `}</style>
      </Head>
      <Preview>Welcome to GetFifty — you're officially in. 🎉</Preview>
      <Tailwind>
        <Body
          style={{
            backgroundColor: "#f0fdf4",
            margin: 0,
            padding: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {/* Outer wrapper */}
          <table
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            style={{ backgroundColor: "#f0fdf4", padding: "40px 16px" }}
          >
            <tbody>
              <tr>
                <td align="center">
                  {/* Card */}
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
                      {/* Hero banner */}
                      <tr>
                        <td
                          style={{
                            background:
                              "linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)",
                            padding: "48px 40px 40px",
                            textAlign: "center",
                            position: "relative",
                          }}
                        >
                          {/* Decorative circle top-right */}
                          <div
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: "50%",
                              backgroundColor: "rgba(134,239,172,0.08)",
                              position: "absolute",
                              top: -30,
                              right: -20,
                            }}
                          />
                          <div
                            style={{
                              width: 70,
                              height: 70,
                              borderRadius: "50%",
                              backgroundColor: "rgba(134,239,172,0.06)",
                              position: "absolute",
                              bottom: 10,
                              left: -15,
                            }}
                          />

                          {/* Logo mark */}
                          <table
                            cellPadding="0"
                            cellSpacing="0"
                            style={{ margin: "0 auto 20px" }}
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
                              margin: "0 0 12px",
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

                          <h1
                            style={{
                              margin: 0,
                              fontSize: 36,
                              fontWeight: 400,
                              lineHeight: 1.2,
                              color: "#ffffff",
                              fontFamily: "'DM Serif Display', Georgia, serif",
                            }}
                          >
                            Welcome aboard,
                            <br />
                            <em style={{ color: "#4ade80" }}>{username}.</em>
                          </h1>

                          <p
                            style={{
                              margin: "16px 0 0",
                              fontSize: 15,
                              color: "#bbf7d0",
                              lineHeight: 1.6,
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            Your account is live. Time to start earning.
                          </p>
                        </td>
                      </tr>

                      {/* Body */}
                      <tr>
                        <td style={{ padding: "36px 40px 0" }}>
                          <p
                            style={{
                              margin: "0 0 28px",
                              fontSize: 15,
                              lineHeight: 1.7,
                              color: "#374151",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            You've successfully signed up for GetFifty. Here's
                            how to get started and make your first referral
                            earning in three simple steps:
                          </p>

                          {/* Steps */}
                          <table
                            width="100%"
                            cellPadding="0"
                            cellSpacing="0"
                            style={{ marginBottom: 28 }}
                          >
                            <tbody>
                              {[
                                {
                                  num: "01",
                                  title: "Go to your Dashboard",
                                  desc: "Log in and head to your personal dashboard.",
                                },
                                {
                                  num: "02",
                                  title: "Grab your referral link",
                                  desc: "Find your unique link under the Referrals tab.",
                                },
                                {
                                  num: "03",
                                  title: "Share & earn",
                                  desc: "Every successful referral puts money in your pocket.",
                                },
                              ].map((step, i) => (
                                <tr key={i}>
                                  <td style={{ paddingBottom: 16 }}>
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
                                                backgroundColor: "#f0fdf4",
                                                border: "1.5px solid #bbf7d0",
                                                textAlign: "center",
                                                lineHeight: "36px",
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: "#16a34a",
                                                letterSpacing: "0.05em",
                                                fontFamily:
                                                  "'DM Sans', sans-serif",
                                              }}
                                            >
                                              {step.num}
                                            </div>
                                          </td>
                                          <td valign="top">
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
                            style={{ marginBottom: 32 }}
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

                      {/* Referral highlight banner */}
                      <tr>
                        <td style={{ padding: "0 40px 36px" }}>
                          <table
                            width="100%"
                            cellPadding="0"
                            cellSpacing="0"
                            style={{
                              backgroundColor: "#f0fdf4",
                              border: "1.5px solid #bbf7d0",
                              borderRadius: 12,
                            }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ padding: "18px 20px" }}>
                                  <p
                                    style={{
                                      margin: "0 0 4px",
                                      fontSize: 12,
                                      fontWeight: 700,
                                      textTransform: "uppercase",
                                      letterSpacing: "0.1em",
                                      color: "#16a34a",
                                      fontFamily: "'DM Sans', sans-serif",
                                    }}
                                  >
                                    💡 Pro tip
                                  </p>
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: 13,
                                      color: "#374151",
                                      lineHeight: 1.6,
                                      fontFamily: "'DM Sans', sans-serif",
                                    }}
                                  >
                                    Share your referral link with your audience
                                    right away — the sooner you share, the
                                    sooner you earn. Your link is waiting in
                                    your dashboard.
                                  </p>
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
                            Questions? Reply to this email — we're happy to
                            help.
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
      </Tailwind>
    </Html>
  );
}
