"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en" | "es";

const content: Record<Lang, { title: string; lastUpdated: string; backLabel: string; sections: { heading: string; body: string }[] }> = {
  fr: {
    title: "Conditions Générales d'Utilisation",
    lastUpdated: "Dernière mise à jour : juin 2026",
    backLabel: "Retour",
    sections: [
      {
        heading: "1. Acceptation des conditions",
        body: `En accédant à Kalorix et en utilisant ses services, vous acceptez sans réserve les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.`,
      },
      {
        heading: "2. Description du service",
        body: `Kalorix est une application web de suivi nutritionnel et de gestion des calories, éditée par CLICKANDDEALONLINE LLC (Missouri, États-Unis). L'application propose des fonctionnalités de suivi des repas, de calcul des besoins caloriques (TDEE), et d'historique de poids.\n\nKalorix est disponible en version gratuite (free) et en version payante (Pro), avec abonnement mensuel ou annuel.`,
      },
      {
        heading: "3. Compte utilisateur",
        body: `Pour accéder aux fonctionnalités de Kalorix, vous devez créer un compte en fournissant une adresse e-mail valide et un mot de passe. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités réalisées depuis votre compte. Vous vous engagez à nous signaler immédiatement toute utilisation non autorisée.`,
      },
      {
        heading: "4. Abonnements et paiements",
        body: `Les abonnements Pro sont proposés en formule mensuelle ($7,99/mois) ou annuelle ($59,99/an). Les paiements sont traités par Paddle.com, notre Merchant of Record. En souscrivant un abonnement, vous autorisez Paddle à débiter votre moyen de paiement de manière récurrente selon la périodicité choisie.\n\nPaddle émet les factures et gère la collecte des taxes applicables en votre nom, conformément aux réglementations locales.`,
      },
      {
        heading: "5. Résiliation et remboursements",
        body: `Vous pouvez annuler votre abonnement à tout moment depuis votre espace client. L'accès Pro reste actif jusqu'à la fin de la période payée en cours. Notre politique de remboursement est détaillée sur la page /refund de l'application.`,
      },
      {
        heading: "6. Utilisation acceptable",
        body: `Vous vous engagez à utiliser Kalorix uniquement à des fins personnelles et licites. Il est notamment interdit de :\n• Tenter de contourner les mesures de sécurité de l'application.\n• Utiliser des robots ou scripts automatisés pour accéder au service.\n• Reproduire, vendre ou redistribuer tout contenu de l'application sans autorisation.\n• Utiliser le service à des fins commerciales sans accord préalable écrit.`,
      },
      {
        heading: "7. Avertissement médical",
        body: `Kalorix est un outil d'information nutritionnelle à usage personnel. Les données fournies (calories, macronutriments, TDEE) sont des estimations basées sur des formules reconnues et ne constituent en aucun cas un avis médical ou diététique. Consultez un professionnel de santé avant d'entreprendre tout changement alimentaire significatif.`,
      },
      {
        heading: "8. Propriété intellectuelle",
        body: `L'ensemble du contenu de Kalorix (interface, textes, graphiques, code source) est la propriété exclusive de CLICKANDDEALONLINE LLC et est protégé par les lois sur la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est strictement interdite.`,
      },
      {
        heading: "9. Limitation de responsabilité",
        body: `Dans les limites permises par la loi, CLICKANDDEALONLINE LLC ne pourra être tenu responsable des dommages indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser Kalorix. La responsabilité totale de la société ne pourra excéder le montant payé par l'utilisateur au cours des trois derniers mois.`,
      },
      {
        heading: "10. Droit applicable",
        body: `Les présentes conditions sont régies par le droit de l'État du Missouri, États-Unis. Tout litige sera soumis à la juridiction exclusive des tribunaux compétents du Missouri.`,
      },
      {
        heading: "11. Modifications",
        body: `Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications substantielles vous seront notifiées par e-mail ou via l'application au moins 15 jours avant leur entrée en vigueur.`,
      },
      {
        heading: "12. Contact",
        body: `CLICKANDDEALONLINE LLC\nMissouri, États-Unis\nE-mail : contact@fitness-ritual.com`,
      },
    ],
  },
  en: {
    title: "Terms and Conditions",
    lastUpdated: "Last updated: June 2026",
    backLabel: "Back",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: `By accessing and using Kalorix, you unconditionally accept these Terms and Conditions. If you do not agree to these terms, please do not use the application.`,
      },
      {
        heading: "2. Description of Service",
        body: `Kalorix is a web-based nutrition tracking and calorie management application operated by CLICKANDDEALONLINE LLC (Missouri, United States). The application offers meal tracking, caloric needs calculation (TDEE), and weight history features.\n\nKalorix is available as a free plan and a paid Pro plan, with monthly or annual subscriptions.`,
      },
      {
        heading: "3. User Account",
        body: `To access Kalorix features, you must create an account by providing a valid email address and password. You are responsible for maintaining the confidentiality of your credentials and all activities conducted through your account. You agree to notify us immediately of any unauthorized use.`,
      },
      {
        heading: "4. Subscriptions and Payments",
        body: `Pro subscriptions are offered on a monthly ($7.99/month) or annual ($59.99/year) basis. Payments are processed by Paddle.com, our Merchant of Record. By subscribing, you authorize Paddle to charge your payment method on a recurring basis according to the chosen billing period.\n\nPaddle issues invoices and manages applicable tax collection on your behalf, in compliance with local regulations.`,
      },
      {
        heading: "5. Cancellation and Refunds",
        body: `You may cancel your subscription at any time from your account settings. Pro access remains active until the end of the current paid period. Our refund policy is detailed on the /refund page of the application.`,
      },
      {
        heading: "6. Acceptable Use",
        body: `You agree to use Kalorix solely for personal and lawful purposes. The following are prohibited:\n• Attempting to circumvent the application's security measures.\n• Using bots or automated scripts to access the service.\n• Reproducing, selling, or redistributing any application content without authorization.\n• Using the service for commercial purposes without prior written consent.`,
      },
      {
        heading: "7. Medical Disclaimer",
        body: `Kalorix is a nutritional information tool for personal use. The data provided (calories, macronutrients, TDEE) are estimates based on recognized formulas and do not constitute medical or dietary advice. Consult a healthcare professional before making any significant dietary changes.`,
      },
      {
        heading: "8. Intellectual Property",
        body: `All Kalorix content (interface, text, graphics, source code) is the exclusive property of CLICKANDDEALONLINE LLC and is protected by intellectual property laws. Any unauthorized reproduction or use is strictly prohibited.`,
      },
      {
        heading: "9. Limitation of Liability",
        body: `To the extent permitted by law, CLICKANDDEALONLINE LLC shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use Kalorix. The company's total liability shall not exceed the amount paid by the user in the preceding three months.`,
      },
      {
        heading: "10. Governing Law",
        body: `These terms are governed by the laws of the State of Missouri, United States. Any dispute shall be subject to the exclusive jurisdiction of the competent courts of Missouri.`,
      },
      {
        heading: "11. Changes",
        body: `We reserve the right to modify these terms at any time. Material changes will be notified to you by email or in-app at least 15 days before they take effect.`,
      },
      {
        heading: "12. Contact",
        body: `CLICKANDDEALONLINE LLC\nMissouri, United States\nEmail: contact@fitness-ritual.com`,
      },
    ],
  },
  es: {
    title: "Términos y Condiciones",
    lastUpdated: "Última actualización: junio 2026",
    backLabel: "Volver",
    sections: [
      {
        heading: "1. Aceptación de los términos",
        body: `Al acceder y utilizar Kalorix, usted acepta sin reservas estos Términos y Condiciones. Si no está de acuerdo con estos términos, por favor no utilice la aplicación.`,
      },
      {
        heading: "2. Descripción del servicio",
        body: `Kalorix es una aplicación web de seguimiento nutricional y gestión de calorías operada por CLICKANDDEALONLINE LLC (Missouri, Estados Unidos). La aplicación ofrece funciones de registro de comidas, cálculo de necesidades calóricas (TDEE) e historial de peso.\n\nKalorix está disponible en plan gratuito y plan Pro de pago, con suscripciones mensuales o anuales.`,
      },
      {
        heading: "3. Cuenta de usuario",
        body: `Para acceder a las funciones de Kalorix, debe crear una cuenta proporcionando una dirección de correo electrónico válida y una contraseña. Usted es responsable de mantener la confidencialidad de sus credenciales y de todas las actividades realizadas a través de su cuenta. Se compromete a notificarnos inmediatamente cualquier uso no autorizado.`,
      },
      {
        heading: "4. Suscripciones y pagos",
        body: `Las suscripciones Pro se ofrecen de forma mensual ($7,99/mes) o anual ($59,99/año). Los pagos son procesados por Paddle.com, nuestro Merchant of Record. Al suscribirse, autoriza a Paddle a cobrar su método de pago de forma recurrente según el período de facturación elegido.\n\nPaddle emite facturas y gestiona la recaudación de impuestos aplicables en su nombre, de conformidad con las normativas locales.`,
      },
      {
        heading: "5. Cancelación y reembolsos",
        body: `Puede cancelar su suscripción en cualquier momento desde la configuración de su cuenta. El acceso Pro permanece activo hasta el final del período pagado en curso. Nuestra política de reembolso se detalla en la página /refund de la aplicación.`,
      },
      {
        heading: "6. Uso aceptable",
        body: `Usted se compromete a utilizar Kalorix únicamente para fines personales y lícitos. Está prohibido:\n• Intentar eludir las medidas de seguridad de la aplicación.\n• Utilizar bots o scripts automatizados para acceder al servicio.\n• Reproducir, vender o redistribuir contenido de la aplicación sin autorización.\n• Utilizar el servicio con fines comerciales sin consentimiento previo por escrito.`,
      },
      {
        heading: "7. Aviso médico",
        body: `Kalorix es una herramienta de información nutricional para uso personal. Los datos proporcionados (calorías, macronutrientes, TDEE) son estimaciones basadas en fórmulas reconocidas y no constituyen asesoramiento médico o dietético. Consulte a un profesional de la salud antes de realizar cambios dietéticos significativos.`,
      },
      {
        heading: "8. Propiedad intelectual",
        body: `Todo el contenido de Kalorix (interfaz, textos, gráficos, código fuente) es propiedad exclusiva de CLICKANDDEALONLINE LLC y está protegido por las leyes de propiedad intelectual. Cualquier reproducción o uso no autorizado está estrictamente prohibido.`,
      },
      {
        heading: "9. Limitación de responsabilidad",
        body: `En la medida permitida por la ley, CLICKANDDEALONLINE LLC no será responsable de los daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de Kalorix. La responsabilidad total de la empresa no excederá el importe pagado por el usuario en los tres meses anteriores.`,
      },
      {
        heading: "10. Ley aplicable",
        body: `Estos términos se rigen por las leyes del Estado de Missouri, Estados Unidos. Cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales competentes de Missouri.`,
      },
      {
        heading: "11. Cambios",
        body: `Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios sustanciales le serán notificados por correo electrónico o en la aplicación con al menos 15 días de antelación.`,
      },
      {
        heading: "12. Contacto",
        body: `CLICKANDDEALONLINE LLC\nMissouri, Estados Unidos\nCorreo electrónico: contact@fitness-ritual.com`,
      },
    ],
  },
};

export default function TermsPage() {
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
                    ? "bg-violet-500 text-white"
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
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Kalorix
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.lastUpdated}</p>
        </div>

        <div className="space-y-8">
          {t.sections.map((section, i) => (
            <section key={i} className="border-l-2 border-violet-400 pl-5">
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
