'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/app/providers'
import { Suspense } from 'react'

type Lang = 'fr' | 'en' | 'es'

const content: Record<Lang, {
  title: string
  sub: string
  email: string
  password: string
  btn: string
  loading: string
  noAccount: string
  register: string
}> = {
  fr: {
    title: 'Connexion 👋',
    sub: 'Bon retour sur Kalorix',
    email: 'Email',
    password: 'Mot de passe',
    btn: 'Se connecter',
    loading: 'Connexion...',
    noAccount: 'Pas encore de compte ?',
    register: "S'inscrire",
  },
  en: {
    title: 'Sign in 👋',
    sub: 'Welcome back to Kalorix',
    email: 'Email',
    password: 'Password',
    btn: 'Sign in',
    loading: 'Signing in...',
    noAccount: 'No account yet?',
    register: 'Sign up',
  },
  es: {
    title: 'Iniciar sesión 👋',
    sub: 'Bienvenido de nuevo a Kalorix',
    email: 'Email',
    password: 'Contraseña',
    btn: 'Iniciar sesión',
    loading: 'Iniciando sesión...',
    noAccount: '¿Aún no tienes cuenta?',
    register: 'Registrarse',
  },
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isDark, toggle } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const rawLang = searchParams.get('lang') ?? ''
  const lang: Lang = (['fr', 'en', 'es'].includes(rawLang) ? rawLang : 'en') as Lang
  const t = content[lang]

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
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
          aria-label="Toggle theme"
          className={`absolute top-4 right-4 p-2 rounded-full text-lg transition-colors ${toggleBg}`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <h1 className={`text-3xl font-bold ${titleCl} mb-2`}>{t.title}</h1>
        <p className={`${subCl} mb-6`}>{t.sub}</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className={inputCl}
          />
          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className={inputCl}
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? t.loading : t.btn}
          </button>
        </div>

        <p className={`${subCl} text-center mt-6`}>
          {t.noAccount}{' '}
          <Link href={`/register?lang=${lang}`} className={linkCl}>
            {t.register}
          </Link>
        </p>

      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
