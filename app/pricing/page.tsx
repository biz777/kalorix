"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

const PRICE_ID_MONTHLY = "pri_MONTHLY_PLACEHOLDER";
const PRICE_ID_ANNUAL  = "pri_ANNUAL_PLACEHOLDER";
const PADDLE_CLIENT_TOKEN = "test_PADDLE_TOKEN_PLACEHOLDER";

export default function Pricing() {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [loading, setLoading] = useState<"monthly" | "annual" | null>(null);

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: PADDLE_CLIENT_TOKEN,
    }).then((paddleInstance) => {
      if (paddleInstance) setPaddle(paddleInstance);
    });
  }, []);

  const openCheckout = (priceId: string, plan: "monthly" | "annual") => {
    if (!paddle) return;
    setLoading(plan);
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        locale: "en",
      },
    });
    setTimeout(() => setLoading(null), 1500);
  };

  const ff = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

  return (
    <div style={{ fontFamily: ff, background: "linear-gradient(160deg, #1a1040 0%, #3b2d8f 45%, #764ba2 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ maxWidth: 860, width: "100%" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: "2em", marginBottom: 12 }}>🥗</div>
          <h1 style={{ color: "white", fontSize: "clamp(1.8em, 4vw, 2.8em)", fontWeight: "800", margin: "0 0 12px", letterSpacing: "-1px" }}>
            Choisissez votre formule
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05em", margin: 0 }}>
            Sans engagement · Annulez à tout moment
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>

          {/* Monthly */}
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: "36px 28px", textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9em", fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: "1px" }}>Mensuel</div>
            <div style={{ color: "white", fontSize: "3em", fontWeight: "800", lineHeight: 1, marginBottom: 4 }}>$7.99</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85em", marginBottom: 28 }}>par mois</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", textAlign: "left" }}>
              {["✅ Suivi calorique illimité", "✅ Macros détaillées", "✅ Historique complet", "✅ Export CSV & PDF", "✅ Support prioritaire"].map(item => (
                <li key={item} style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.92em", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{item}</li>
              ))}
            </ul>
            <button
              onClick={() => openCheckout(PRICE_ID_MONTHLY, "monthly")}
              disabled={!paddle || loading === "monthly"}
              style={{
                width: "100%", padding: "14px", borderRadius: 50, border: "none", cursor: paddle ? "pointer" : "not-allowed",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white", fontSize: "1em", fontWeight: "700", fontFamily: ff,
                opacity: !paddle || loading === "monthly" ? 0.7 : 1,
                transition: "all 0.2s",
              }}>
              {loading === "monthly" ? "Chargement…" : "Commencer — $7.99/mois"}
            </button>
          </div>

          {/* Annual */}
          <div style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(12px)", border: "2px solid rgba(102,126,234,0.6)", borderRadius: 24, padding: "36px 28px", textAlign: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white", fontSize: "0.78em", fontWeight: "700", padding: "4px 16px", borderRadius: 20, whiteSpace: "nowrap" }}>
              ⭐ Meilleure valeur — Économisez 37%
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9em", fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: "1px" }}>Annuel</div>
            <div style={{ color: "white", fontSize: "3em", fontWeight: "800", lineHeight: 1, marginBottom: 4 }}>$59.99</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85em", marginBottom: 28 }}>par an · soit $5/mois</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", textAlign: "left" }}>
              {["✅ Tout du plan mensuel", "✅ 2 mois offerts", "✅ Accès anticipé nouvelles features", "✅ Badge supporter", "✅ Support VIP"].map(item => (
                <li key={item} style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.92em", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{item}</li>
              ))}
            </ul>
            <button
              onClick={() => openCheckout(PRICE_ID_ANNUAL, "annual")}
              disabled={!paddle || loading === "annual"}
              style={{
                width: "100%", padding: "14px", borderRadius: 50, border: "none", cursor: paddle ? "pointer" : "not-allowed",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white", fontSize: "1em", fontWeight: "700", fontFamily: ff,
                opacity: !paddle || loading === "annual" ? 0.7 : 1,
                transition: "all 0.2s",
              }}>
              {loading === "annual" ? "Chargement…" : "Commencer — $59.99/an"}
            </button>
          </div>

        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.82em", marginTop: 32 }}>
          Paiement sécurisé par Paddle · Annulation en un clic · Remboursement sous 14 jours
        </p>

      </div>
    </div>
  );
}
