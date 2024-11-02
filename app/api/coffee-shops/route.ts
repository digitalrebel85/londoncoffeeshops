import { NextResponse } from 'next/server'
import { getCoffeeShops } from '@/lib/api'

// Revalidate every 6 months (in seconds)
// 6 months * 30 days * 24 hours * 60 minutes * 60 seconds
export const revalidate = 15552000

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location')

  if (!location) {
    return NextResponse.json(
      { error: 'Location parameter is required' }, 
      { status: 400 }
    )
  }

  try {
    const coffeeShops = await getCoffeeShops(location)
    return NextResponse.json(coffeeShops)
  } catch (error) {
    console.error('Error fetching coffee shops:', error)
    return NextResponse.json(
      { error: 'Failed to fetch coffee shops' }, 
      { status: 500 }
    )
  }
}