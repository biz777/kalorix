import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Requête 1 : compter les profils
    const { count: profileCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Requête 2 : compter les meals
    const { count: mealCount } = await supabase
      .from('meals')
      .select('*', { count: 'exact', head: true })

    // Requête 3 : compter les weight_logs
    const { count: weightCount } = await supabase
      .from('weight_logs')
      .select('*', { count: 'exact', head: true })

    // Requête 4 : lire le profil le plus récent
    await supabase
      .from('profiles')
      .select('id, plan, created_at')
      .order('created_at', { ascending: false })
      .limit(1)

    // Requête 5 : lire le meal le plus récent
    await supabase
      .from('meals')
      .select('id, created_at')
      .order('created_at', { ascending: false })
      .limit(1)

    console.log(`Keep-alive OK — profiles: ${profileCount}, meals: ${mealCount}, weight_logs: ${weightCount}`)

    return NextResponse.json({
      status: 'alive',
      profiles: profileCount,
      meals: mealCount,
      weight_logs: weightCount,
      timestamp: new Date().toISOString(),
    })

  } catch (err) {
    console.error('Keep-alive failed:', err)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
