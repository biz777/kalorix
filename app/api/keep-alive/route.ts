import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  // Vérifie que l'appel vient bien de Vercel Cron, pas de n'importe qui
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Une simple requête suffit à compter comme "activité" pour Supabase
    const { error } = await supabase.from('profiles').select('id').limit(1)

    if (error) {
      console.error('Keep-alive query error:', error.message)
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() })
  } catch (err) {
    console.error('Keep-alive failed:', err)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
