import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 15 // Vercel : 15 secondes max

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 })
  }

  const MAX_RETRIES = 3

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10&fields=product_name,brands,nutriments`,
        {
          headers: { 'User-Agent': 'Kalorix/1.0 (contact@kalorix.app)' },
          signal: controller.signal,
        }
      )
      clearTimeout(timeoutId)

      if (!res.ok) throw new Error('OpenFoodFacts error')

      const data = await res.json()

      const results = (data.products ?? [])
        .filter((p: any) => p.product_name && p.nutriments?.['energy-kcal_100g'])
        .map((p: any) => ({
  name: p.product_name,
  brand: p.brands ?? '',
  calories: Math.round(p.nutriments['energy-kcal_100g']),
  proteines: p.nutriments['proteins_100g'] ? Math.round(p.nutriments['proteins_100g']) : null,
  glucides: p.nutriments['carbohydrates_100g'] ? Math.round(p.nutriments['carbohydrates_100g']) : null,
  lipides: p.nutriments['fat_100g'] ? Math.round(p.nutriments['fat_100g']) : null,
}))
        .slice(0, 5)

      return NextResponse.json({ results })

    } catch (error) {
      if (attempt === MAX_RETRIES) {
        return NextResponse.json({ error: 'Search failed after retries' }, { status: 500 })
      }
      // pause courte avant retry
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }
}
