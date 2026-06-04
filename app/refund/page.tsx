"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en" | "es";

const content: Record<Lang, { title: string; lastUpdated: string; backLabel: string; sections: { heading: string; body: string }[] }> = {
  fr: {
    title: "Politique de Remboursement",
    lastUpdated: "Dernière mise à jour : juin 2026",
    backLabel: "Retour",
    sections: [
      {
        heading: "1. Merchant of Record",
        body: `Les paiements Kalorix sont traités par Paddle.com, qui agit en tant que Merchant of Record. Cela signifie que Paddle est l'entité légale responsable de la transaction, de la facturation, de la collecte des taxes et du traitement des remboursements. Votre relevé bancaire affichera une transaction au nom de Paddle.`,
      },
      {
        heading: "2. Période d'essai et premier achat",
        body: `Nous offrons une garantie satisfait ou remboursé de 14 jours à compter de la date du premier achat d'un abonnement Pro. Si vous n'êtes pas satisfait de Kalorix Pro pour quelque raison que ce soit, contactez-nous dans ce délai à contact@fitness-ritual.com et nous procéderons à un remboursement intégral, sans questions.`,
      },
      {
        heading: "3. Renouvellements",
        body: `Les renouvellements automatiques (mensuel ou annuel) ne sont pas remboursables après traitement, sauf dans les cas suivants :\n• Erreur technique avérée de notre côté ayant empêché l'accès au service.\n• Double facturation accidentelle.\n• Facturation après une annulation valide et confirmée.\n\nDans ces cas, contactez-nous à contact@fitness-ritual.com avec votre reçu de paiement.`,
      },
      {
        heading: "4. Annulation d'abonnement",
        body: `Vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte. L'annulation prend effet à la fin de la période de facturation en cours. Vous conservez l'accès Pro jusqu'à cette date.\n\nAucun remboursement au prorata n'est accordé pour la période restante après annulation, sauf dans les cas mentionnés à l'article 3.`,
      },
      {
        heading: "5. Comment demander un remboursement",
        body: `Pour toute demande de remboursement, envoyez un e-mail à contact@fitness-ritual.com en précisant :\n• Votre adresse e-mail de compte Kalorix.\n• La date de l'achat.\n• Le motif de la demande.\n\nNous traitons les demandes éligibles dans un délai de 5 à 10 jours ouvrés. Le remboursement est effectué sur le moyen de paiement d'origine.`,
      },
      {
        heading: "6. Cas non remboursables",
        body: `Les situations suivantes ne donnent pas droit à remboursement :\n• Oubli d'annuler avant le renouvellement (rappel : vous recevez un e-mail de Paddle avant chaque renouvellement annuel).\n• Utilisation partielle de la période d'abonnement.\n• Changement d'avis après la période de 14 jours garantie.\n• Incompatibilité avec un navigateur ou appareil non supporté.`,
      },
      {
        heading: "7. Contact",
        body: `Pour toute question relative aux paiements ou remboursements :\n\nCLICKANDDEALONLINE LLC\nMissouri, États-Unis\nE-mail : contact@fitness-ritual.com`,
      },
    ],
  },
  en: {
    title: "Refund Policy",
    lastUpdated: "Last updated: June 2026",
    backLabel: "Back",
    sections: [
      {
        heading: "1. Merchant of Record",
        body: `Kalorix payments are processed by Paddle.com, acting as Merchant of Record. This means Paddle is the legal entity responsible for the transaction, invoicing, tax collection, and refund processing. Your bank statement will show a transaction in Paddle's name.`,
      },
      {
        heading: "2. Trial Period and First Purchase",
        body: `We offer a 14-day money-back guarantee from the date of your first Pro subscription purchase. If you are not satisfied with Kalorix Pro for any reason, contact us within this period at contact@fitness-ritual.com and we will issue a full refund, no questions asked.`,
      },
      {
        heading: "3. Renewals",
        body: `Automatic renewals (monthly or annual) are not refundable once processed, except in the following cases:\n• A verified technical error on our end that prevented access to the service.\n• Accidental double billing.\n• Billing after a valid and confirmed cancellation.\n\nIn these cases, contact us at contact@fitness-ritual.com with your payment receipt.`,
      },
      {
        heading: "4. Subscription Cancellation",
        body: `You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period. You retain Pro access until that date.\n\nNo pro-rata refund is granted for the remaining period after cancellation, except in the cases mentioned in section 3.`,
      },
      {
        heading: "5. How to Request a Refund",
        body: `To request a refund, send an email to contact@fitness-ritual.com with:\n• Your Kalorix account email address.\n• The purchase date.\n• The reason for your request.\n\nWe process eligible requests within 5 to 10 business days. Refunds are issued to the original payment method.`,
      },
      {
        heading: "6. Non-Refundable Cases",
        body: `The following situations are not eligible for a refund:\n• Forgetting to cancel before renewal (note: Paddle sends a reminder email before each annual renewal).\n• Partial use of the subscription period.\n• Change of mind after the 14-day guarantee period.\n• Incompatibility with an unsupported browser or device.`,
      },
      {
        heading: "7. Contact",
        body: `For any questions about payments or refunds:\n\nCLICKANDDEALONLINE LLC\nMissouri, United States\nEmail: contact@fitness-ritual.com`,
      },
    ],
  },
  es: {
    title: "Política de Reembolso",
    lastUpdated: "Última actualización: junio 2026",
    backLabel: "Volver",
    sections: [
      {
        heading: "1. Merchant of Record",
        body: `Los pagos de Kalorix son procesados por Paddle.com, que actúa como Merchant of Record. Esto significa que Paddle es la entidad legal responsable de la transacción, la facturación, la recaudación de impuestos y el procesamiento de reembolsos. Su extracto bancario mostrará una transacción a nombre de Paddle.`,
      },
      {
        heading: "2. Período de prueba y primera compra",
        body: `Ofrecemos una garantía de devolución de dinero de 14 días a partir de la fecha de su primera compra de suscripción Pro. Si no está satisfecho con Kalorix Pro por cualquier motivo, contáctenos dentro de este período en contact@fitness-ritual.com y emitiremos un reembolso completo, sin preguntas.`,
      },
      {
        heading: "3. Renovaciones",
        body: `Las renovaciones automáticas (mensuales o anuales) no son reembolsables una vez procesadas, excepto en los siguientes casos:\n• Un error técnico verificado de nuestra parte que impidió el acceso al servicio.\n• Doble facturación accidental.\n• Facturación tras una cancelación válida y confirmada.\n\nEn estos casos, contáctenos en contact@fitness-ritual.com con su recibo de pago.`,
      },
      {
        heading: "4. Cancelación de suscripción",
        body: `Puede cancelar su suscripción en cualquier momento desde la configuración de su cuenta. La cancelación surte efecto al final del período de facturación en curso. Conserva el acceso Pro hasta esa fecha.\n\nNo se concede reembolso prorrateado por el período restante tras la cancelación, salvo en los casos mencionados en el artículo 3.`,
      },
      {
        heading: "5. Cómo solicitar un reembolso",
        body: `Para solicitar un reembolso, envíe un correo electrónico a contact@fitness-ritual.com indicando:\n• Su dirección de correo electrónico de la cuenta Kalorix.\n• La fecha de compra.\n• El motivo de su solicitud.\n\nProcesamos las solicitudes elegibles en un plazo de 5 a 10 días hábiles. Los reembolsos se realizan al método de pago original.`,
      },
      {
        heading: "6. Casos no reembolsables",
        body: `Las siguientes situaciones no dan derecho a reembolso:\n• Olvidar cancelar antes de la renovación (nota: Paddle envía un correo de recordatorio antes de cada renovación anual).\n• Uso parcial del período de suscripción.\n• Cambio de opinión después del período de garantía de 14 días.\n• Incompatibilidad con un navegador o dispositivo no compatible.`,
      },
      {
        heading: "7. Contacto",
        body: `Para cualquier pregunta sobre pagos o reembolsos:\n\nCLICKANDDEALONLINE LLC\nMissouri, Estados Unidos\nCorreo electrónico: contact@fitness-ritual.com`,
      },
    ],
  },
};

export default function RefundPage() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<Lang>(
    typeof window !== "undefined"
      ? ((localStorage.getItem("lang") as Lang) || "fr")
      : "fr"
  );

  const t = content[currentLang];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backLabel}
          </button>
          <div className="flex gap-1">
            {(["fr", "en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setCurrentLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase transition-colors ${
                  currentLang === l
                    ? "bg-amber-500 text-white"
                    : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Kalorix
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.lastUpdated}</p>
        </div>

        {/* Highlight box */}
        <div className="mb-10 p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                {currentLang === "fr" && "Garantie satisfait ou remboursé — 14 jours"}
                {currentLang === "en" && "14-Day Money-Back Guarantee"}
                {currentLang === "es" && "Garantía de devolución — 14 días"}
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                {currentLang === "fr" && "Essayez Kalorix Pro sans risque. Pas satisfait ? On vous rembourse intégralement."}
                {currentLang === "en" && "Try Kalorix Pro risk-free. Not satisfied? We'll refund you in full."}
                {currentLang === "es" && "Prueba Kalorix Pro sin riesgo. ¿No estás satisfecho? Te reembolsamos completamente."}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {t.sections.map((section, i) => (
            <section key={i} className="border-l-2 border-amber-400 pl-5">
              <h2 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {section.heading}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CLICKANDDEALONLINE LLC — Kalorix
        </div>
      </main>
    </div>
  );
}
