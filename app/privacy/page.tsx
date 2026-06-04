"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en" | "es";

const content: Record<Lang, { title: string; lastUpdated: string; backLabel: string; sections: { heading: string; body: string }[] }> = {
  fr: {
    title: "Politique de Confidentialité",
    lastUpdated: "Dernière mise à jour : juin 2026",
    backLabel: "Retour",
    sections: [
      {
        heading: "1. Qui sommes-nous ?",
        body: `Kalorix est une application de suivi nutritionnel éditée par CLICKANDDEALONLINE LLC, une société à responsabilité limitée enregistrée dans l'État du Missouri, États-Unis. Pour toute question relative à la présente politique, vous pouvez nous contacter à l'adresse : contact@fitness-ritual.com.`,
      },
      {
        heading: "2. Données collectées",
        body: `Nous collectons uniquement les données nécessaires au fonctionnement de l'application :\n• Données de compte : adresse e-mail, mot de passe (chiffré).\n• Données de profil : âge, poids, taille, objectifs nutritionnels (TDEE).\n• Données d'utilisation : repas enregistrés, historique de poids, préférences linguistiques.\n• Données de paiement : traitées exclusivement par Paddle.com (notre Merchant of Record) ; nous ne stockons aucune donnée bancaire ou de carte de paiement.`,
      },
      {
        heading: "3. Finalités du traitement",
        body: `Vos données sont utilisées pour :\n• Fournir et améliorer les fonctionnalités de l'application.\n• Gérer votre abonnement et votre facturation via Paddle.\n• Vous envoyer des communications transactionnelles (confirmation d'inscription, réinitialisation de mot de passe).\n• Assurer la sécurité et prévenir les fraudes.`,
      },
      {
        heading: "4. Partage des données",
        body: `Nous ne vendons jamais vos données personnelles. Nous partageons uniquement les données strictement nécessaires avec :\n• Supabase (hébergement de base de données, États-Unis).\n• Paddle.com (traitement des paiements et gestion des abonnements).\n• Vercel (hébergement de l'application, États-Unis).\nCes prestataires sont contractuellement tenus de protéger vos données.`,
      },
      {
        heading: "5. Conservation des données",
        body: `Vos données sont conservées pendant toute la durée de votre utilisation de l'application, puis supprimées dans un délai de 30 jours suivant la fermeture de votre compte, sauf obligation légale contraire.`,
      },
      {
        heading: "6. Vos droits",
        body: `Vous disposez des droits suivants sur vos données personnelles :\n• Accès, rectification et suppression de vos données.\n• Portabilité de vos données.\n• Opposition au traitement.\nPour exercer ces droits, contactez-nous à contact@fitness-ritual.com. Nous répondrons dans un délai de 30 jours.`,
      },
      {
        heading: "7. Cookies",
        body: `Kalorix utilise uniquement des cookies fonctionnels nécessaires à l'authentification et à la session. Aucun cookie publicitaire ou de tracking tiers n'est utilisé.`,
      },
      {
        heading: "8. Modifications",
        body: `Nous pouvons mettre à jour cette politique à tout moment. En cas de modification substantielle, vous en serez informé par e-mail ou via une notification dans l'application. La poursuite de votre utilisation de l'application après notification vaut acceptation de la nouvelle politique.`,
      },
      {
        heading: "9. Contact",
        body: `CLICKANDDEALONLINE LLC\nMissouri, États-Unis\nE-mail : contact@fitness-ritual.com`,
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: June 2026",
    backLabel: "Back",
    sections: [
      {
        heading: "1. Who We Are",
        body: `Kalorix is a nutrition tracking application operated by CLICKANDDEALONLINE LLC, a limited liability company registered in the State of Missouri, United States. For any questions regarding this policy, please contact us at: contact@fitness-ritual.com.`,
      },
      {
        heading: "2. Data We Collect",
        body: `We collect only the data necessary to operate the application:\n• Account data: email address, password (encrypted).\n• Profile data: age, weight, height, nutritional goals (TDEE).\n• Usage data: logged meals, weight history, language preferences.\n• Payment data: processed exclusively by Paddle.com (our Merchant of Record); we do not store any banking or payment card data.`,
      },
      {
        heading: "3. Purpose of Processing",
        body: `Your data is used to:\n• Provide and improve application features.\n• Manage your subscription and billing via Paddle.\n• Send transactional communications (registration confirmation, password reset).\n• Ensure security and prevent fraud.`,
      },
      {
        heading: "4. Data Sharing",
        body: `We never sell your personal data. We only share strictly necessary data with:\n• Supabase (database hosting, United States).\n• Paddle.com (payment processing and subscription management).\n• Vercel (application hosting, United States).\nThese providers are contractually required to protect your data.`,
      },
      {
        heading: "5. Data Retention",
        body: `Your data is retained throughout your use of the application, then deleted within 30 days of account closure, unless otherwise required by law.`,
      },
      {
        heading: "6. Your Rights",
        body: `You have the following rights regarding your personal data:\n• Access, correction, and deletion of your data.\n• Data portability.\n• Right to object to processing.\nTo exercise these rights, contact us at contact@fitness-ritual.com. We will respond within 30 days.`,
      },
      {
        heading: "7. Cookies",
        body: `Kalorix uses only functional cookies necessary for authentication and session management. No advertising or third-party tracking cookies are used.`,
      },
      {
        heading: "8. Changes",
        body: `We may update this policy at any time. In the event of a material change, you will be notified by email or via an in-app notification. Continued use of the application after notification constitutes acceptance of the updated policy.`,
      },
      {
        heading: "9. Contact",
        body: `CLICKANDDEALONLINE LLC\nMissouri, United States\nEmail: contact@fitness-ritual.com`,
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: junio 2026",
    backLabel: "Volver",
    sections: [
      {
        heading: "1. Quiénes somos",
        body: `Kalorix es una aplicación de seguimiento nutricional operada por CLICKANDDEALONLINE LLC, una sociedad de responsabilidad limitada registrada en el estado de Missouri, Estados Unidos. Para cualquier consulta sobre esta política, puede contactarnos en: contact@fitness-ritual.com.`,
      },
      {
        heading: "2. Datos que recopilamos",
        body: `Recopilamos solo los datos necesarios para operar la aplicación:\n• Datos de cuenta: dirección de correo electrónico, contraseña (cifrada).\n• Datos de perfil: edad, peso, altura, objetivos nutricionales (TDEE).\n• Datos de uso: comidas registradas, historial de peso, preferencias de idioma.\n• Datos de pago: procesados exclusivamente por Paddle.com (nuestro Merchant of Record); no almacenamos ningún dato bancario ni de tarjeta de pago.`,
      },
      {
        heading: "3. Finalidad del tratamiento",
        body: `Sus datos se utilizan para:\n• Proporcionar y mejorar las funcionalidades de la aplicación.\n• Gestionar su suscripción y facturación a través de Paddle.\n• Enviar comunicaciones transaccionales (confirmación de registro, restablecimiento de contraseña).\n• Garantizar la seguridad y prevenir el fraude.`,
      },
      {
        heading: "4. Compartir datos",
        body: `Nunca vendemos sus datos personales. Solo compartimos los datos estrictamente necesarios con:\n• Supabase (alojamiento de base de datos, Estados Unidos).\n• Paddle.com (procesamiento de pagos y gestión de suscripciones).\n• Vercel (alojamiento de la aplicación, Estados Unidos).\nEstos proveedores están contractualmente obligados a proteger sus datos.`,
      },
      {
        heading: "5. Retención de datos",
        body: `Sus datos se conservan durante toda su utilización de la aplicación y se eliminan en un plazo de 30 días tras el cierre de su cuenta, salvo obligación legal contraria.`,
      },
      {
        heading: "6. Sus derechos",
        body: `Tiene los siguientes derechos sobre sus datos personales:\n• Acceso, rectificación y supresión de sus datos.\n• Portabilidad de datos.\n• Derecho de oposición al tratamiento.\nPara ejercer estos derechos, contáctenos en contact@fitness-ritual.com. Responderemos en un plazo de 30 días.`,
      },
      {
        heading: "7. Cookies",
        body: `Kalorix utiliza únicamente cookies funcionales necesarias para la autenticación y la sesión. No se utilizan cookies publicitarias ni de seguimiento de terceros.`,
      },
      {
        heading: "8. Cambios",
        body: `Podemos actualizar esta política en cualquier momento. En caso de cambio sustancial, será notificado por correo electrónico o mediante una notificación en la aplicación. El uso continuado de la aplicación tras la notificación implica la aceptación de la nueva política.`,
      },
      {
        heading: "9. Contacto",
        body: `CLICKANDDEALONLINE LLC\nMissouri, Estados Unidos\nCorreo electrónico: contact@fitness-ritual.com`,
      },
    ],
  },
};

export default function PrivacyPage() {
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
                    ? "bg-emerald-500 text-white"
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
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Kalorix
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.lastUpdated}</p>
        </div>

        <div className="space-y-8">
          {t.sections.map((section, i) => (
            <section key={i} className="border-l-2 border-emerald-400 pl-5">
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
