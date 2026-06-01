'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useTheme } from '@/app/providers'

// ─── Types ───────────────────────────────────────────────────────────────────

type Sexe = 'homme' | 'femme'
type Objectif = 'perte' | 'maintien' | 'masse'
type NiveauActivite = '1.2' | '1.375' | '1.55' | '1.725' | '1.9'

interface TDEEResult {
  tdee: number
  proteines: number
  glucides: number
  lipides: number
}

// ─── Constantes ──────────────────────────────────────────────────────────────

const NIVEAUX_ACTIVITE: { value: NiveauActivite; label: string }[] = [
  { value: '1.2',   label: "Sédentaire (peu ou pas d'exercice)" },
  { value: '1.375', label: 'Légèrement actif (1–3 j/semaine)' },
  { value: '1.55',  label: 'Modérément actif (3–5 j/semaine)' },
  { value: '1.725', label: 'Très actif (6–7 j/semaine)' },
  { value: '1.9',   label: 'Extrêmement actif (sport intensif / travail physique)' },
]

const OBJECTIFS: { value: Objectif; label: string; description: string; ajustement: number }[] = [
  { value: 'perte',    label: 'Perte de poids', description: 'Déficit de 300 kcal/jour',  ajustement: -300 },
  { value: 'maintien', label: 'Maintien',        description: 'Maintien du poids actuel', ajustement: 0    },
  { value: 'masse',    label: 'Prise de masse',  description: 'Surplus de 300 kcal/jour', ajustement: 300  },
]

// ─── Fonction de calcul ───────────────────────────────────────────────────────

function calculerTDEE(
  age: number,
  poids: number,
  taille: number,
  sexe: Sexe,
  activite: NiveauActivite,
  objectif: Objectif
): TDEEResult {
  const bmr =
    10 * poids +
    6.25 * taille -
    5 * age +
    (sexe === 'homme' ? 5 : -161)

  const facteurActivite = parseFloat(activite)
  const tdeeBase = Math.round(bmr * facteurActivite)

  const { ajustement } = OBJECTIFS.find((o) => o.value === objectif)!
  const tdee = tdeeBase + ajustement

  const proteines = Math.round(poids * 2)
  const lipides   = Math.round((tdee * 0.25) / 9)
  const glucides  = Math.round((tdee - proteines * 4 - lipides * 9) / 4)

  return { tdee, proteines, glucides, lipides }
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function TDEEPage() {
  const router = useRouter()
  const { isDark, toggle } = useTheme()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [age,      setAge]      = useState<number>(25)
  const [poids,    setPoids]    = useState<number>(70)
  const [taille,   setTaille]   = useState<number>(175)
  const [sexe,     setSexe]     = useState<Sexe>('homme')
  const [activite, setActivite] = useState<NiveauActivite>('1.55')
  const [objectif, setObjectif] = useState<Objectif>('maintien')

  const [loading,  setLoading]  = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [userId,   setUserId]   = useState<string | null>(null)

  const result = calculerTDEE(age, poids, taille, sexe, activite, objectif)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data?.session?.user) { router.push('/login'); return }
      setUserId(data.session.user.id)
    }
    getUser()
  }, [])

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    setSaved(false)
    if (!userId) { router.push('/login'); return }
    const { error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id: userId, age, poids, taille, sexe,
        niveau_activite: activite, objectif,
        tdee: result.tdee,
        objectif_proteines: result.proteines,
        objectif_glucides:  result.glucides,
        objectif_lipides:   result.lipides,
        updated_at: new Date().toISOString(),
      })
      .select()
    setLoading(false)
    if (upsertError) {
      setError(`Erreur : ${upsertError.message}`)
    } else {
      setSaved(true)
      setTimeout(() => router.push('/dashboard'), 1500)
    }
  }

  // ─── Palette dark mode ────────────────────────────────────────────────────
  const pageBg     = isDark ? 'bg-gray-950' : 'bg-gray-50'
  const cardBg     = isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
  const labelColor = isDark ? 'text-gray-400' : 'text-gray-500'
  const sectionLabel = isDark ? 'text-gray-500' : 'text-gray-400'
  const inputCls   = isDark
    ? 'w-full border border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100'
    : 'w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-900'
  const selectCls  = isDark
    ? 'w-full border border-gray-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100'
    : 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-900'
  const titleColor = isDark ? 'text-gray-100' : 'text-gray-900'
  const subColor   = isDark ? 'text-gray-400' : 'text-gray-500'
  const resultBg   = isDark ? 'bg-gray-800' : 'bg-gray-50'
  const resultVal  = isDark ? 'text-gray-100' : 'text-gray-900'
  const resultSub  = isDark ? 'text-gray-500' : 'text-gray-400'
  const noteColor  = isDark ? 'text-gray-600' : 'text-gray-400'

  // Sexe buttons
  const sexeBtnActive   = isDark
    ? 'border-blue-500 bg-blue-900 text-blue-300'
    : 'border-blue-400 bg-blue-50 text-blue-700'
  const sexeBtnInactive = isDark
    ? 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'
    : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'

  // Objectif buttons
  const objBtnActive   = isDark
    ? 'border-blue-500 bg-blue-900 text-blue-300'
    : 'border-blue-400 bg-blue-50 text-blue-700'
  const objBtnInactive = isDark
    ? 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'
    : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'

  // Macro cards
  const macroProtBg  = isDark ? 'bg-blue-950'  : 'bg-blue-50'
  const macroProtTxt = isDark ? 'text-blue-400' : 'text-blue-500'
  const macroProtVal = isDark ? 'text-blue-300' : 'text-blue-700'
  const macroGlucBg  = isDark ? 'bg-green-950'  : 'bg-green-50'
  const macroGlucTxt = isDark ? 'text-green-400' : 'text-green-500'
  const macroGlucVal = isDark ? 'text-green-300' : 'text-green-700'
  const macroLipBg   = isDark ? 'bg-amber-950'  : 'bg-amber-50'
  const macroLipTxt  = isDark ? 'text-amber-400' : 'text-amber-500'
  const macroLipVal  = isDark ? 'text-amber-300' : 'text-amber-700'

  return (
    <div className={`min-h-screen ${pageBg} py-8 px-4 transition-colors duration-300`}>
      <div className="max-w-lg mx-auto">

        {/* Header + toggle */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className={`text-2xl font-semibold ${titleColor}`}>
              🔥 Calcul de tes besoins caloriques
            </h1>
            <p className={`text-sm ${subColor} mt-1`}>
              Remplis le formulaire pour obtenir ton TDEE personnalisé
            </p>
          </div>
          <button
            onClick={toggle}
            aria-label="Basculer thème"
            className={`ml-4 mt-1 p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* ── Infos personnelles ── */}
        <div className={`rounded-2xl border ${cardBg} p-5 mb-4 transition-colors duration-300`}>
          <p className={`text-xs font-medium ${sectionLabel} uppercase tracking-wider mb-4`}>
            Informations personnelles
          </p>

          {/* Sexe */}
          <div className="mb-4">
            <label className={`text-sm ${labelColor} mb-2 block`}>Sexe</label>
            <div className="grid grid-cols-2 gap-2">
              {(['homme', 'femme'] as Sexe[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSexe(s)}
                  className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    sexe === s ? sexeBtnActive : sexeBtnInactive
                  }`}
                >
                  {s === 'homme' ? '♂ Homme' : '♀ Femme'}
                </button>
              ))}
            </div>
          </div>

          {/* Âge + Poids */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className={`text-sm ${labelColor} mb-1 block`}>Âge (ans)</label>
              <input
                type="number" value={age} min={10} max={100}
                onChange={(e) => setAge(Number(e.target.value))}
                className={inputCls}
              />
            </div>
            <div>
              <label className={`text-sm ${labelColor} mb-1 block`}>Poids (kg)</label>
              <input
                type="number" value={poids} min={30} max={300}
                onChange={(e) => setPoids(Number(e.target.value))}
                className={inputCls}
              />
            </div>
          </div>

          {/* Taille */}
          <div>
            <label className={`text-sm ${labelColor} mb-1 block`}>Taille (cm)</label>
            <input
              type="number" value={taille} min={100} max={250}
              onChange={(e) => setTaille(Number(e.target.value))}
              className={inputCls}
            />
          </div>
        </div>

        {/* ── Niveau d'activité ── */}
        <div className={`rounded-2xl border ${cardBg} p-5 mb-4 transition-colors duration-300`}>
          <p className={`text-xs font-medium ${sectionLabel} uppercase tracking-wider mb-4`}>
            Niveau d'activité
          </p>
          <select
            value={activite}
            onChange={(e) => setActivite(e.target.value as NiveauActivite)}
            className={selectCls}
          >
            {NIVEAUX_ACTIVITE.map((n) => (
              <option key={n.value} value={n.value}>{n.label}</option>
            ))}
          </select>
        </div>

        {/* ── Objectif ── */}
        <div className={`rounded-2xl border ${cardBg} p-5 mb-4 transition-colors duration-300`}>
          <p className={`text-xs font-medium ${sectionLabel} uppercase tracking-wider mb-4`}>
            Objectif
          </p>
          <div className="grid grid-cols-3 gap-2">
            {OBJECTIFS.map((o) => (
              <button
                key={o.value}
                onClick={() => setObjectif(o.value)}
                className={`py-2.5 px-2 rounded-xl border text-xs font-medium transition-all text-center ${
                  objectif === o.value ? objBtnActive : objBtnInactive
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Résultat TDEE ── */}
        <div className={`rounded-2xl border ${cardBg} p-5 mb-4 transition-colors duration-300`}>
          <p className={`text-xs font-medium ${sectionLabel} uppercase tracking-wider mb-4`}>
            Ton TDEE
          </p>
          <div className={`${resultBg} rounded-xl p-4 mb-4`}>
            <p className={`text-sm ${subColor}`}>Calories journalières recommandées</p>
            <p className={`text-4xl font-semibold ${resultVal} mt-1`}>
              {result.tdee.toLocaleString('fr-FR')} kcal
            </p>
            <p className={`text-sm ${resultSub} mt-1`}>
              {OBJECTIFS.find((o) => o.value === objectif)?.description}
            </p>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-2">
            <div className={`${macroProtBg} rounded-xl p-3`}>
              <p className={`text-xs ${macroProtTxt} mb-1`}>Protéines</p>
              <p className={`text-lg font-semibold ${macroProtVal}`}>{result.proteines} g</p>
            </div>
            <div className={`${macroGlucBg} rounded-xl p-3`}>
              <p className={`text-xs ${macroGlucTxt} mb-1`}>Glucides</p>
              <p className={`text-lg font-semibold ${macroGlucVal}`}>{result.glucides} g</p>
            </div>
            <div className={`${macroLipBg} rounded-xl p-3`}>
              <p className={`text-xs ${macroLipTxt} mb-1`}>Lipides</p>
              <p className={`text-lg font-semibold ${macroLipVal}`}>{result.lipides} g</p>
            </div>
          </div>

          <p className={`text-xs ${noteColor} mt-3 text-center`}>
            Ces objectifs macros seront sauvegardés et affichés dans ton dashboard.
          </p>
        </div>

        {/* ── Messages ── */}
        {error && (
          <div className={`${isDark ? 'bg-red-950 border-red-800' : 'bg-red-50 border-red-200'} border rounded-xl p-3 mb-3`}>
            <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
          </div>
        )}
        {saved && (
          <div className={`${isDark ? 'bg-green-950 border-green-800' : 'bg-green-50 border-green-200'} border rounded-xl p-3 mb-3`}>
            <p className={`text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>✅ Sauvegardé ! Redirection vers le dashboard...</p>
          </div>
        )}

        {/* ── Bouton sauvegarde ── */}
        <button
          onClick={handleSave}
          disabled={loading || saved}
          className={`w-full py-3.5 rounded-2xl font-semibold text-base transition-all disabled:opacity-60 active:scale-[0.98] ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Sauvegarde en cours...' : '💾 Sauvegarder et continuer'}
        </button>

      </div>
    </div>
  )
}
