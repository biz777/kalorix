export default function Pricing() {
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "60px 24px", fontFamily: "sans-serif" }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h1 style={{ color: "white", fontSize: 42, fontWeight: 800, marginBottom: 16 }}>
          Simple, Transparent Pricing
        </h1>
        <p style={{ color: "#a0aec0", fontSize: 18, maxWidth: 500, margin: "0 auto" }}>
          Start free, upgrade when you're ready. No hidden fees.
        </p>
      </div>

      {/* Plans */}
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", maxWidth: 1000, margin: "0 auto" }}>

        {/* Free Trial */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "40px 32px", width: 280, color: "white" }}>
          <div style={{ fontSize: 14, color: "#a0aec0", fontWeight: 600, marginBottom: 8 }}>FREE TRIAL</div>
          <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 4 }}>$0</div>
          <div style={{ color: "#a0aec0", marginBottom: 32 }}>14 days, no credit card</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0" }}>
            {["Meal logging", "Calorie tracking", "Basic macros", "Food library (116+ foods)", "Weight tracking"].map(f => (
              <li key={f} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#e2e8f0" }}>
                ✅ {f}
              </li>
            ))}
          </ul>
          <a href="https://kalorix-nine.vercel.app" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 12, border: "2px solid #667eea", color: "#667eea", fontWeight: 700, textDecoration: "none" }}>
            Start Free Trial
          </a>
        </div>

        {/* Pro Monthly */}
        <div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: 20, padding: "40px 32px", width: 280, color: "white", transform: "scale(1.05)", boxShadow: "0 20px 60px rgba(102,126,234,0.4)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "4px 12px", borderRadius: 20 }}>⭐ MOST POPULAR</div>
          <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 4, marginTop: 8 }}>$7.99</div>
          <div style={{ color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>per month</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0" }}>
            {["Everything in Free", "Unlimited meal history", "Advanced macro goals", "Daily email reminders", "Calendar history editing", "Priority support"].map(f => (
              <li key={f} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.15)", color: "white" }}>
                ✅ {f}
              </li>
            ))}
          </ul>
          <a href="#" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 12, background: "white", color: "#667eea", fontWeight: 700, textDecoration: "none" }}>
            Get Pro Monthly
          </a>
        </div>

        {/* Pro Annual */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "2px solid #f093fb", borderRadius: 20, padding: "40px 32px", width: 280, color: "white" }}>
          <div style={{ fontSize: 14, color: "#f093fb", fontWeight: 600, marginBottom: 8 }}>BEST VALUE</div>
          <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 4 }}>$59.99</div>
          <div style={{ color: "#a0aec0", marginBottom: 8 }}>per year</div>
          <div style={{ fontSize: 13, color: "#f093fb", marginBottom: 32, fontWeight: 600 }}>🎉 2 months FREE vs monthly</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0" }}>
            {["Everything in Pro", "2 months free", "Annual progress report", "Early access to new features", "VIP support"].map(f => (
              <li key={f} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#e2e8f0" }}>
                ✅ {f}
              </li>
            ))}
          </ul>
          <a href="#" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 12, border: "2px solid #f093fb", color: "#f093fb", fontWeight: 700, textDecoration: "none" }}>
            Get Pro Annual
          </a>
        </div>

      </div>

      {/* Footer note */}
      <p style={{ textAlign: "center", color: "#a0aec0", marginTop: 48, fontSize: 14 }}>
        🔒 Secure payment via Paddle · Cancel anytime · 7-day money back guarantee
      </p>

    </main>
  );
}
