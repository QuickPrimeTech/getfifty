// @/components/email-templates/signup-bonus.tsx

import { Body, Head, Html, Preview } from "@react-email/components";

type SignupBonusProps = {
  username?: string;
  email?: string;
  amount?: string;
  currency?: string;
};

export default function SignupBonus({
  username = "Partner",
  email = "user@example.com",
  amount = "50",
  currency = "KSh",
}: SignupBonusProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

          @media only screen and (max-width: 480px) {
            .email-container { width: 100% !important; }
            .body-pad { padding: 24px 20px 36px !important; }
          }
        `}</style>
      </Head>
      <Preview>
        You just earned {currency} {amount} — ready to withdraw! 💸
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
                    {/* ── Hero ── */}
                    <tr>
                      <td
                        style={{
                          background:
                            "linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)",
                          padding: "44px 40px 36px",
                          textAlign: "center",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {/* decorative blobs */}
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

                        {/* logo */}
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

                        {/* big earning badge */}
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
                                  🎉 Signup Bonus Earned
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
                          is sitting in your wallet right now.
                        </p>
                      </td>
                    </tr>

                    {/* ── Body ── */}
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
                          , great news — you've just earned a{" "}
                          <strong style={{ color: "#16a34a" }}>
                            {currency} {amount} signup bonus
                          </strong>{" "}
                          for joining GetFifty with{" "}
                          <span style={{ color: "#6b7280" }}>{email}</span>.
                          Your balance is ready and waiting to be withdrawn.
                        </p>

                        {/* balance card */}
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
                            <tr>
                              <td style={{ padding: "20px 24px" }}>
                                <table
                                  width="100%"
                                  cellPadding="0"
                                  cellSpacing="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p
                                          style={{
                                            margin: "0 0 2px",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.12em",
                                            color: "#16a34a",
                                            fontFamily: "'DM Sans', sans-serif",
                                          }}
                                        >
                                          Available Balance
                                        </p>
                                        <p
                                          style={{
                                            margin: 0,
                                            fontSize: 28,
                                            fontWeight: 700,
                                            color: "#052e16",
                                            fontFamily:
                                              "'DM Serif Display', Georgia, serif",
                                          }}
                                        >
                                          {currency} {amount}.00
                                        </p>
                                      </td>
                                      <td align="right" valign="middle">
                                        <div
                                          style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 12,
                                            backgroundColor: "#dcfce7",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 22,
                                          }}
                                        >
                                          💰
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* how to withdraw steps */}
                        <p
                          style={{
                            margin: "0 0 16px",
                            fontSize: 13,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#9ca3af",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          How to withdraw
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
                                title: "Go to Withdrawals",
                                desc: "Head to your dashboard and click Withdraw.",
                              },
                              {
                                num: "02",
                                title: "Enter your details",
                                desc: "Add your M-Pesa or bank account info.",
                              },
                              {
                                num: "03",
                                title: "Receive your cash",
                                desc: "Funds hit your account within minutes.",
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
                                  Withdraw {currency} {amount} →
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* ── Footer ── */}
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
