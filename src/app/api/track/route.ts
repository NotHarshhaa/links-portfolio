import { NextResponse } from 'next/server'
import { isKvConfigured, kvCommand } from '@/lib/kv'

export const dynamic = 'force-dynamic'

const CLICKS_KEY = 'links:clicks'
const TITLES_KEY = 'links:titles'
const TOTAL_KEY = 'links:clicks:total'

export async function POST(request: Request) {
  if (!isKvConfigured()) {
    return new Response(null, { status: 204 })
  }

  let payload: { url?: unknown; title?: unknown }
  try {
    payload = (await request.json()) as { url?: unknown; title?: unknown }
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const url = typeof payload.url === 'string' ? payload.url : ''
  const title =
    typeof payload.title === 'string' ? payload.title.slice(0, 120) : ''

  if (!/^https?:\/\//.test(url) || url.length > 500) {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 })
  }

  const writes = [
    kvCommand(['ZINCRBY', CLICKS_KEY, 1, url]),
    kvCommand(['INCR', TOTAL_KEY])
  ]
  if (title) writes.push(kvCommand(['HSET', TITLES_KEY, url, title]))
  await Promise.all(writes)

  return new Response(null, { status: 204 })
}
