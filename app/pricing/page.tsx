"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useTheme } from "@/app/providers";
import { useRouter } from "next/navigation";

const PRICE_ID_MONTHLY = "pri_01ktagbshae0scvhh0tgwzjq7f";
const PRICE_ID_ANNUAL  = "pri_01ktagvsjaqeqk2sqaar85p5ps";
const PADDLE_CLIENT_TOKEN = "live_b49544053d0f20bbece59cfb6a5";

type Lang = "fr" | "en" | "es";

const content = {
  fr: {
    title: "Choisissez votre formule",
    subtitle: "Sans engagement · Annulez à tout moment",
    back: "← Retour",
    monthly_label: "Mensuel",
    monthly_per: "par mois",
    annual_label: "Annuel",
    annual_per: "par an · soit $5/mois",
    best_value: "⭐ Meilleure valeur — Économisez 37%",
    monthly_features: ["✅ Suivi calorique illimité", "✅ Macros détaillées", "✅ Historique complet", "✅ Export CSV & PDF", "✅ Support prioritaire"],
    annual_features: ["✅ Tout du plan mensuel", "✅ 2 mois offerts", "✅ Accès anticipé nouvelles features", "✅ Badge supporter", "✅ Support VIP"],
    monthly_cta: "Commencer — $7.99/mois",
    annual_cta: "Commencer — $59.99/an",
    loading: "Chargement…",
    footer: "Paiement sécurisé par Paddle · Annulation en un clic · Remboursement sous 14 jours",
  },
  en: {
    title: "Choose your plan",
    subtitle: "No commitment · Cancel anytime",
    back: "← Back",
    monthly_label: "Monthly",
    monthly_per: "per month",
    annual_label: "Annual",
    annual_per: "per year · only $5/month",
    best_value: "⭐ Best value — Save 37%",
    monthly_features: ["✅ Unlimited calorie tracking", "✅ Detailed macros", "✅ Full history", "✅ CSV & PDF export", "✅ Priority support"],
    annual_features: ["✅ Everything in monthly", "✅ 2 months free", "✅ Early access to new features", "✅ Supporter badge", "✅ VIP support"],
    monthly_cta: "Get started — $7.99/mo",
    annual_cta: "Get started — $59.99/yr",
    loading: "Loading…",
    footer: "Secure payment by Paddle · Cancel in one click · 14-day money-back guarantee",
  },
  es: {
    title: "Elige tu plan",
    subtitle: "Sin compromiso · Cancela cuando quieras",
    back: "← Volver",
    monthly_label: "Mensual",
    monthly_per: "por mes",
    annual_label: "Anual",
    annual_per: "por año · solo $5/mes",
    best_value: "⭐ Mejor valor — Ahorra 37%",
    monthly_features: ["✅ Seguimiento calórico ilimitado", "✅ Macros detalladas", "✅ Historial completo", "✅ Exportar CSV y PDF", "✅ Soporte prioritario"],
    annual_features: ["✅ Todo del plan mensual", "✅ 2 meses gratis", "✅ Acceso anticipado a nuevas funciones", "✅ Insignia de supporter", "✅ Soporte VIP"],
    monthly_cta: "Empezar — $7.99/mes",
    annual_cta: "Empezar — $59.99/año",
    loading: "Cargando…",
    footer: "Pago seguro por Paddle · Cancela en un clic · Reembolso en 14 días",
  },
};

export default function Pricing() {
  const { isDark, toggle } = useTheme();
  const router = useRouter();
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [loading, setLoading] = useState<"monthly" | "annual" | null>(null);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("kalorix_lang") as Lang | null;
    if (saved && ["fr", "en", "es"].includes(saved)) setLang(saved);
  }, []);

  useEffect(() => {
    initializePaddle({
      environment: "production",
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
        locale: lang === "es" ? "es" : lang === "en" ? "en" : "fr",
      },
    });
    setTimeout(() => setLoading(null), 1500);
  };

  const t = content[lang];
  const ff = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

  return (
    <div style={{ fontFamily: ff, background: "linear-gradient(160deg, #1a1040 0%, #3b2d8f 45%, #764ba2 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative" }}>

      {/* Toggle + retour */}
      <div style={{ position: "fixed", top: 20, right: 24, display: "flex", gap: 10, zIndex: 50 }}>
        <button onClick={() => router.back()}
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "white", padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: ff, fontWeight: "600", transition: "all 0.2s" }}>
          {t.back}
        </button>
        <button onClick={toggle} aria-label="Basculer thème"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "white", padding: "8px 12px", borderRadius: 20, cursor: "pointer", fontSize: "1.1em", transition: "all 0.2s" }}>
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>

      <div style={{ maxWidth: 860, width: "100%" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: "2em", marginBottom: 12 }}>🥗</div>
          <h1 style={{ color: "white", fontSize: "clamp(1.8em, 4vw, 2.8em)", fontWeight: "800", margin: "0 0 12px", letterSpacing: "-1px" }}>
            {t.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05em", margin: 0 }}>
            {t.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>

          {/* Monthly */}
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: "36px 28px", textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9em", fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: "1px" }}>{t.monthly_label}</div>
            <div style={{ color: "white", fontSize: "3em", fontWeight: "800", lineHeight: 1, marginBottom: 4 }}>$7.99</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85em", marginBottom: 28 }}>{t.monthly_per}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", textAlign: "left" }}>
              {t.monthly_features.map(item => (
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
              {loading === "monthly" ? t.loading : t.monthly_cta}
            </button>
          </div>

          {/* Annual */}
          <div style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(12px)", border: "2px solid rgba(102,126,234,0.6)", borderRadius: 24, padding: "36px 28px", textAlign: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white", fontSize: "0.78em", fontWeight: "700", padding: "4px 16px", borderRadius: 20, whiteSpace: "nowrap" }}>
              {t.best_value}
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9em", fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: "1px" }}>{t.annual_label}</div>
            <div style={{ color: "white", fontSize: "3em", fontWeight: "800", lineHeight: 1, marginBottom: 4 }}>$59.99</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85em", marginBottom: 28 }}>{t.annual_per}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", textAlign: "left" }}>
              {t.annual_features.map(item => (
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
              {loading === "annual" ? t.loading : t.annual_cta}
            </button>
          </div>

        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.82em", marginTop: 32 }}>
          {t.footer}
        </p>

      </div>
    </div>
  );
}
