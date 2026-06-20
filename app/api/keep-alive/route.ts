import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
    })

    return NextResponse.json({
      status: res.ok ? 'ok' : 'unexpected_response',
      supabaseStatus: res.status,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Keep-alive failed:', err)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
