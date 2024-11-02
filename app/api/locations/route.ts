import { NextResponse } from 'next/server'
import { getLocations } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  const locations = getLocations()
  const location = locations.find(loc => loc.slug === slug)

  if (!location) {
    return NextResponse.json({ error: 'Location not found' }, { status: 404 })
  }

  return NextResponse.json(location)
}