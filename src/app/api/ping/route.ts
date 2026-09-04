import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const start = Date.now()
  const region = process.env.VERCEL_REGION || process.env.REGION || 'local-edge'

  return NextResponse.json(
    {
      status: 'operational',
      service: 'links-hub',
      timestamp: start,
      region,
      node: process.version,
      uptime: process.uptime()
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'X-Edge-Region': region,
        'X-Service-Health': 'healthy'
      }
    }
  )
}
