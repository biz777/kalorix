import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10&fields=product_name,brands,nutriments`,
      {
        headers: { 'User-Agent': 'Kalorix/1.0 (contact@kalorix.app)' },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) throw new Error('OpenFoodFacts error')

    const data = await res.json()

    const results = (data.products ?? [])
      .filter((p: any) => p.product_name && p.nutriments?.['energy-kcal_100g'])
      .map((p: any) => ({
        name: p.product_name,
        brand: p.brands ?? '',
        calories: Math.round(p.nutriments['energy-kcal_100g']),
      }))
      .slice(0, 5)

    return NextResponse.json({ results })
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
