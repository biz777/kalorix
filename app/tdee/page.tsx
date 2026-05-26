'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

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

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Formulaire
  const [age,      setAge]      = useState<number>(25)
  const [poids,    setPoids]    = useState<number>(70)
  const [taille,   setTaille]   = useState<number>(175)
  const [sexe,     setSexe]     = useState<Sexe>('homme')
  const [activite, setActivite] = useState<NiveauActivite>('1.55')
  const [objectif, setObjectif] = useState<Objectif>('maintien')

  // UI
  const [loading,  setLoading]  = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [userId,   setUserId]   = useState<string | null>(null)

  // Résultat calculé en temps réel
  const result = calculerTDEE(age, poids, taille, sexe, activite, objectif)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!data?.session?.user) {
        router.push('/login')
        return
      }
      setUserId(data.session.user.id)
    }
    getUser()
  }, [])

  // ── Sauvegarde dans Supabase ──────────────────────────────────────────────

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    setSaved(false)

    if (!userId) {
      router.push('/login')
      return
    }

    const { data, error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id:              userId,
        age,
        poids,
        taille,
        sexe,
        niveau_activite: activite,
        objectif,
        tdee:            result.tdee,
        // ✅ NOUVEAU : sauvegarde des objectifs macros calculés
        objectif_proteines: result.proteines,
        objectif_glucides:  result.glucides,
        objectif_lipides:   result.lipides,
        updated_at:      new Date().toISOString(),
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

  // ── Rendu ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            🔥 Calcul de tes besoins caloriques
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Remplis le formulaire pour obtenir ton TDEE personnalisé
          </p>
        </div>

        {/* ── Infos personnelles ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            Informations personnelles
          </p>

          {/* Sexe */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">Sexe</label>
            <div className="grid grid-cols-2 gap-2">
              {(['homme', 'femme'] as Sexe[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSexe(s)}
                  className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    sexe === s
                      ? 'border-blue-400 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
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
              <label className="text-sm text-gray-500 mb-1 block">Âge (ans)</label>
              <input
                type="number"
                value={age}
                min={10} max={100}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Poids (kg)</label>
              <input
                type="number"
                value={poids}
                min={30} max={300}
                onChange={(e) => setPoids(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Taille */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Taille (cm)</label>
            <input
              type="number"
              value={taille}
              min={100} max={250}
              onChange={(e) => setTaille(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* ── Niveau d'activité ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            Niveau d'activité
          </p>
          <select
            value={activite}
            onChange={(e) => setActivite(e.target.value as NiveauActivite)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
          >
            {NIVEAUX_ACTIVITE.map((n) => (
              <option key={n.value} value={n.value}>{n.label}</option>
            ))}
          </select>
        </div>

        {/* ── Objectif ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            Objectif
          </p>
          <div className="grid grid-cols-3 gap-2">
            {OBJECTIFS.map((o) => (
              <button
                key={o.value}
                onClick={() => setObjectif(o.value)}
                className={`py-2.5 px-2 rounded-xl border text-xs font-medium transition-all text-center ${
                  objectif === o.value
                    ? 'border-blue-400 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Résultat TDEE ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            Ton TDEE
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-500">Calories journalières recommandées</p>
            <p className="text-4xl font-semibold text-gray-900 mt-1">
              {result.tdee.toLocaleString('fr-FR')} kcal
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {OBJECTIFS.find((o) => o.value === objectif)?.description}
            </p>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs text-blue-500 mb-1">Protéines</p>
              <p className="text-lg font-semibold text-blue-700">{result.proteines} g</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-xs text-green-500 mb-1">Glucides</p>
              <p className="text-lg font-semibold text-green-700">{result.glucides} g</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-xs text-amber-500 mb-1">Lipides</p>
              <p className="text-lg font-semibold text-amber-700">{result.lipides} g</p>
            </div>
          </div>

          {/* ✅ NOUVEAU : note explicative */}
          <p className="text-xs text-gray-400 mt-3 text-center">
            Ces objectifs macros seront sauvegardés et affichés dans ton dashboard.
          </p>
        </div>

        {/* ── Messages ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3">
            <p className="text-sm text-green-600">✅ Sauvegardé ! Redirection vers le dashboard...</p>
          </div>
        )}

        {/* ── Bouton sauvegarde ── */}
        <button
          onClick={handleSave}
          disabled={loading || saved}
          className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-semibold text-base
                     hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {loading ? 'Sauvegarde en cours...' : '💾 Sauvegarder et continuer'}
        </button>

      </div>
    </div>
  )
}
