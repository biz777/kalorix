'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/app/providers'
import { Suspense } from 'react'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isDark, toggle } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const getLang = (): string => {
    const urlLang = searchParams.get('lang')
    if (urlLang && ['fr', 'en', 'es'].includes(urlLang)) return urlLang
    const browserLang = navigator.language?.substring(0, 2)
    if (['fr', 'en', 'es'].includes(browserLang)) return browserLang
    return 'en'
  }

  const handleRegister = async () => {
    setLoading(true)
    setError('')

    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    const lang = getLang()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { lang },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email: data.user.email,
        plan: 'free',
        lang,
      })
    }

    router.push('/dashboard')
  }

  const pageBg   = isDark ? 'bg-gray-950'  : 'bg-gray-100'
  const cardBg   = isDark ? 'bg-gray-900'  : 'bg-white'
  const titleCl  = isDark ? 'text-white'   : 'text-gray-900'
  const subCl    = isDark ? 'text-gray-400': 'text-gray-500'
  const inputCl  = isDark
    ? 'w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500'
    : 'w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-400 border border-gray-200 placeholder-gray-400'
  const linkCl   = isDark ? 'text-green-400 hover:underline' : 'text-green-600 hover:underline'
  const toggleBg = isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'

  return (
    <div className={`min-h-screen flex items-center justify-center ${pageBg} transition-colors duration-300`}>
      <div className={`${cardBg} p-8 rounded-2xl shadow-xl w-full max-w-md relative transition-colors duration-300`}>

        <button
          onClick={toggle}
          aria-label="Basculer thème"
          className={`absolute top-4 right-4 p-2 rounded-full text-lg transition-colors ${toggleBg}`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <h1 className={`text-3xl font-bold ${titleCl} mb-2`}>Créer un compte 🚀</h1>
        <p className={`${subCl} mb-6`}>Commence à tracker tes calories aujourd'hui</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
            className={inputCl}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
            className={inputCl}
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
            className={inputCl}
          />
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'Création...' : "S'inscrire"}
          </button>
        </div>

        <p className={`${subCl} text-center mt-6`}>
          Déjà un compte ?{' '}
          <Link href="/login" className={linkCl}>
            Se connecter
          </Link>
        </p>

      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <RegisterForm />
    </Suspense>
  )
}
