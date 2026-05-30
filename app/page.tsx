'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Lang = 'fr' | 'en' | 'es'

const content = {
  fr: {
    nav_login: 'Se connecter',
    nav_start: 'Commencer l\'essai',
    nav_pricing: 'Tarifs',
    hero_tag: '🥗 Nutrition intelligente pour les 50+',
    hero_title: 'Reprenez le contrôle de votre alimentation',
    hero_sub: 'Kalorix vous aide à suivre vos calories, macros et poids au quotidien — simplement, sans prise de tête.',
    hero_cta: 'Commencer l\'essai',
    hero_login: 'Déjà membre ? Se connecter',
    stats: [
      { value: '116+', label: 'Aliments en base' },
      { value: '3', label: 'Langues disponibles' },
      { value: '✅', label: 'Essai gratuit' },
    ],
    features_title: 'Tout ce dont vous avez besoin',
    features: [
      { icon: '🔥', title: 'Suivi calorique', desc: 'Ajoutez vos repas en quelques secondes et visualisez votre progression journalière en temps réel.' },
      { icon: '🥩', title: 'Macros détaillées', desc: 'Protéines, glucides, lipides — suivez chaque macro avec des objectifs personnalisés et des alertes intelligentes.' },
      { icon: '⚖️', title: 'Suivi du poids', desc: 'Enregistrez votre poids chaque jour et observez votre évolution sur 7, 15 ou 30 jours avec une courbe claire.' },
      { icon: '🌍', title: 'Cuisines du monde', desc: 'Une bibliothèque de plus de 116 aliments couvrant les cuisines française, marocaine, américaine, italienne et plus.' },
      { icon: '📅', title: 'Historique complet', desc: 'Calendrier interactif pour retrouver vos repas de n\'importe quel jour passé, avec export CSV et PDF.' },
      { icon: '🎯', title: 'Objectifs sur mesure', desc: 'TDEE calculé selon votre profil, âge, activité et objectif. Modifiable à tout moment depuis le tableau de bord.' },
    ],
    testimony_title: 'Conçu pour les 50+',
    testimony_sub: 'Une interface claire, des fonctionnalités essentielles, sans complexité inutile.',
    cta_title: 'Prêt à commencer ?',
    cta_sub: 'Sans engagement, essai inclus.',
    cta_btn: 'Créer mon compte',
    footer: '© 2026 Kalorix · Nutrition intelligente pour les 50+',
    footer_pricing: 'Tarifs',
    footer_terms: 'Conditions d\'utilisation',
    footer_privacy: 'Confidentialité',
    footer_refund: 'Remboursement',
  },
  en: {
    nav_login: 'Sign in',
    nav_start: 'Start free trial',
    nav_pricing: 'Pricing',
    hero_tag: '🥗 Smart nutrition for 50+',
    hero_title: 'Take back control of your nutrition',
    hero_sub: 'Kalorix helps you track calories, macros and weight every day — simply, without the hassle.',
    hero_cta: 'Start free trial',
    hero_login: 'Already a member? Sign in',
    stats: [
      { value: '116+', label: 'Foods in database' },
      { value: '3', label: 'Languages' },
      { value: '✅', label: 'Free trial' },
    ],
    features_title: 'Everything you need',
    features: [
      { icon: '🔥', title: 'Calorie tracking', desc: 'Add your meals in seconds and visualize your daily progress in real time.' },
      { icon: '🥩', title: 'Detailed macros', desc: 'Proteins, carbs, fats — track every macro with personalized goals and smart alerts.' },
      { icon: '⚖️', title: 'Weight tracking', desc: 'Log your weight daily and watch your progress over 7, 15 or 30 days with a clear chart.' },
      { icon: '🌍', title: 'World cuisines', desc: 'A library of 116+ foods covering French, Moroccan, American, Italian cuisines and more.' },
      { icon: '📅', title: 'Full history', desc: 'Interactive calendar to find meals from any past day, with CSV and PDF export.' },
      { icon: '🎯', title: 'Custom goals', desc: 'TDEE calculated from your profile, age, activity and goal. Editable anytime from the dashboard.' },
    ],
    testimony_title: 'Designed for 50+',
    testimony_sub: 'A clear interface, essential features, no unnecessary complexity.',
    cta_title: 'Ready to start?',
    cta_sub: 'No commitment, free trial included.',
    cta_btn: 'Create my account',
    footer: '© 2026 Kalorix · Smart nutrition for 50+',
    footer_pricing: 'Pricing',
    footer_terms: 'Terms of Service',
    footer_privacy: 'Privacy Policy',
    footer_refund: 'Refund Policy',
  },
  es: {
    nav_login: 'Iniciar sesión',
    nav_start: 'Empezar prueba gratis',
    nav_pricing: 'Precios',
    hero_tag: '🥗 Nutrición inteligente para los 50+',
    hero_title: 'Recupera el control de tu alimentación',
    hero_sub: 'Kalorix te ayuda a seguir tus calorías, macros y peso cada día — de forma sencilla, sin complicaciones.',
    hero_cta: 'Empezar prueba gratis',
    hero_login: '¿Ya eres miembro? Iniciar sesión',
    stats: [
      { value: '116+', label: 'Alimentos en base' },
      { value: '3', label: 'Idiomas disponibles' },
      { value: '✅', label: 'Prueba gratuita' },
    ],
    features_title: 'Todo lo que necesitas',
    features: [
      { icon: '🔥', title: 'Seguimiento calórico', desc: 'Añade tus comidas en segundos y visualiza tu progreso diario en tiempo real.' },
      { icon: '🥩', title: 'Macros detalladas', desc: 'Proteínas, carbohidratos, grasas — sigue cada macro con objetivos personalizados y alertas inteligentes.' },
      { icon: '⚖️', title: 'Seguimiento del peso', desc: 'Registra tu peso cada día y observa tu evolución en 7, 15 o 30 días con una gráfica clara.' },
      { icon: '🌍', title: 'Cocinas del mundo', desc: 'Una biblioteca de más de 116 alimentos que cubre las cocinas francesa, marroquí, americana, italiana y más.' },
      { icon: '📅', title: 'Historial completo', desc: 'Calendario interactivo para encontrar comidas de cualquier día pasado, con exportación CSV y PDF.' },
      { icon: '🎯', title: 'Objetivos a medida', desc: 'TDEE calculado según tu perfil, edad, actividad y objetivo. Modificable en cualquier momento desde el panel.' },
    ],
    testimony_title: 'Diseñado para los 50+',
    testimony_sub: 'Una interfaz clara, funciones esenciales, sin complejidad innecesaria.',
    cta_title: '¿Listo para empezar?',
    cta_sub: 'Sin compromiso, prueba incluida.',
    cta_btn: 'Crear mi cuenta',
    footer: '© 2026 Kalorix · Nutrición inteligente para los 50+',
    footer_pricing: 'Precios',
    footer_terms: 'Términos de uso',
    footer_privacy: 'Privacidad',
    footer_refund: 'Reembolso',
  },
}

const seoMeta: Record<Lang, { title: string; description: string }> = {
  fr: {
    title: 'Kalorix — Tracker de calories et macros pour les 50+',
    description: 'Suivez vos calories, protéines, glucides et lipides au quotidien. Kalorix est l\'application de nutrition simple et gratuite conçue pour les 50 ans et plus.',
  },
  en: {
    title: 'Kalorix — Calorie & macro tracker for 50+',
    description: 'Track your daily calories, proteins, carbs and fats. Kalorix is the simple, free nutrition app designed for people 50 and over.',
  },
  es: {
    title: 'Kalorix — Seguimiento de calorías y macros para los 50+',
    description: 'Sigue tus calorías, proteínas, carbohidratos y grasas cada día. Kalorix es la aplicación de nutrición simple y gratuita diseñada para mayores de 50 años.',
  },
}

export default function LandingPage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('fr')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('kalorix_lang') as Lang | null
    if (saved && ['fr', 'en', 'es'].includes(saved)) setLang(saved)
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.title = seoMeta[lang].title
    let desc = document.querySelector('meta[name="description"]')
    if (!desc) { desc = document.createElement('meta'); (desc as HTMLMetaElement).name = 'description'; document.head.appendChild(desc) }
    ;(desc as HTMLMetaElement).content = seoMeta[lang].description
  }, [lang])

  const handleLang = (l: Lang) => { setLang(l); localStorage.setItem('kalorix_lang', l) }
  const t = content[lang]

  const langOptions: { code: Lang; flag: string; label: string }[] = [
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
  ]

  const ff = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"

  return (
    <div style={{ fontFamily: ff, background: '#fafbff', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(102,126,234,0.12)' : 'none',
        transition: 'all 0.3s', padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.6em' }}>🥗</span>
          <span style={{ fontWeight: '800', fontSize: '1.3em', color: scrolled ? '#667eea' : 'white', letterSpacing: '-0.5px' }}>Kalorix</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {langOptions.map(({ code, flag, label }) => (
            <button key={code} onClick={() => handleLang(code)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px',
                borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: ff,
                fontWeight: lang === code ? '700' : '500',
                background: lang === code ? 'white' : 'rgba(255,255,255,0.18)',
                color: lang === code ? '#667eea' : scrolled ? '#555' : 'white',
                boxShadow: lang === code ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.2s',
              }}>
              <span>{flag}</span><span>{label}</span>
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.3)', margin: '0 4px' }} />
          {/* Pricing link */}
          <button onClick={() => router.push('/pricing')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: ff,
              fontWeight: '600', fontSize: 13,
              color: scrolled ? '#667eea' : 'white',
              transition: 'all 0.2s', padding: '7px 12px',
            }}>
            {t.nav_pricing}
          </button>
          <button onClick={() => router.push('/login')}
            style={{
              background: scrolled ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.2)',
              color: 'white', border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.5)',
              padding: '7px 18px', borderRadius: 20, cursor: 'pointer', fontWeight: '600', fontSize: 13, fontFamily: ff,
              transition: 'all 0.2s',
            }}>
            {t.nav_login}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        background: 'linear-gradient(160deg, #1a1040 0%, #3b2d8f 45%, #764ba2 100%)',
        padding: '140px 24px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', top: 120, left: '10%', width: 120, height: 120, borderRadius: '50%', background: 'rgba(102,126,234,0.15)' }} />

        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)', padding: '6px 18px', borderRadius: 30, fontSize: '0.88em',
            fontWeight: '600', marginBottom: 28, backdropFilter: 'blur(8px)',
          }}>
            {t.hero_tag}
          </div>

          <h1 style={{
            color: 'white', fontSize: 'clamp(2em, 5vw, 3.4em)', fontWeight: '800',
            lineHeight: 1.15, margin: '0 0 24px', letterSpacing: '-1px',
            textShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}>
            {t.hero_title}
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(1em, 2.5vw, 1.2em)',
            lineHeight: 1.7, margin: '0 0 40px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto',
          }}>
            {t.hero_sub}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => router.push('/login')}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white', border: 'none', padding: '16px 40px', borderRadius: 50,
                  fontSize: '1.1em', fontWeight: '800', cursor: 'pointer', fontFamily: ff,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.5)', letterSpacing: '0.2px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(102,126,234,0.65)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(102,126,234,0.5)' }}>
                {t.hero_cta} →
              </button>
              <button onClick={() => router.push('/pricing')}
                style={{
                  background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.5)',
                  color: 'white', padding: '16px 40px', borderRadius: 50,
                  fontSize: '1.1em', fontWeight: '700', cursor: 'pointer', fontFamily: ff,
                  transition: 'transform 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.25)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)' }}>
                {t.nav_pricing} 💰
              </button>
            </div>
            <button onClick={() => router.push('/login')}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: '0.9em', fontFamily: ff, textDecoration: 'underline', padding: 0 }}>
              {t.hero_login}
            </button>
          </div>
        </div>

        {/* Stats band */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 'clamp(20px, 5vw, 60px)',
          marginTop: 70, flexWrap: 'wrap',
        }}>
          {t.stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(1.8em, 4vw, 2.6em)', fontWeight: '800', color: 'white', letterSpacing: '-1px' }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85em', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5em, 3vw, 2.2em)', fontWeight: '800', color: '#1a1040', marginBottom: 56, letterSpacing: '-0.5px' }}>
          {t.features_title}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {t.features.map((f) => (
            <div key={f.title}
              style={{
                background: 'white', borderRadius: 20, padding: '28px 24px',
                boxShadow: '0 4px 24px rgba(102,126,234,0.08)', border: '1px solid rgba(102,126,234,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(102,126,234,0.18)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(102,126,234,0.08)' }}>
              <div style={{ fontSize: '2em', marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.1em', fontWeight: '700', color: '#1a1040', margin: '0 0 10px' }}>{f.title}</h3>
              <p style={{ color: '#666', fontSize: '0.92em', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONY BAND */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 24px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '3em', marginBottom: 16 }}>👴🏻👵🏻</div>
        <h2 style={{ color: 'white', fontSize: 'clamp(1.4em, 3vw, 2em)', fontWeight: '800', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
          {t.testimony_title}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05em', margin: 0 }}>{t.testimony_sub}</p>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 style={{ fontSize: 'clamp(1.5em, 3vw, 2.2em)', fontWeight: '800', color: '#1a1040', marginBottom: 12, letterSpacing: '-0.5px' }}>
          {t.cta_title}
        </h2>
        <p style={{ color: '#888', fontSize: '1em', marginBottom: 36 }}>{t.cta_sub}</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/login')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white', border: 'none', padding: '16px 44px', borderRadius: 50,
              fontSize: '1.1em', fontWeight: '800', cursor: 'pointer', fontFamily: ff,
              boxShadow: '0 8px 32px rgba(102,126,234,0.4)', letterSpacing: '0.2px',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(102,126,234,0.6)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(102,126,234,0.4)' }}>
            {t.cta_btn} →
          </button>
          <button onClick={() => router.push('/pricing')}
            style={{
              background: 'white', border: '2px solid #667eea', color: '#667eea',
              padding: '16px 44px', borderRadius: 50, fontSize: '1.1em', fontWeight: '700',
              cursor: 'pointer', fontFamily: ff, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f0f2ff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white' }}>
            {t.nav_pricing} 💰
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '32px 24px', borderTop: '1px solid #eee', color: '#aaa', fontSize: '0.85em' }}>
        <div style={{ marginBottom: 12, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '0.85em', fontFamily: ff, fontWeight: '600' }}>{t.footer_pricing}</button>
          <button onClick={() => router.push('/terms')} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '0.85em', fontFamily: ff }}>{t.footer_terms}</button>
          <button onClick={() => router.push('/privacy')} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '0.85em', fontFamily: ff }}>{t.footer_privacy}</button>
          <button onClick={() => router.push('/refund')} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '0.85em', fontFamily: ff }}>{t.footer_refund}</button>
        </div>
        {t.footer}
      </footer>

    </div>
  )
}
