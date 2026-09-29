import { NextResponse } from 'next/server'
import { isKvConfigured, kvCommand } from '@/lib/kv'

export const dynamic = 'force-dynamic'

export interface TopLinkStat {
  url: string
  title: string
  count: number
}

export async function GET() {
  if (!isKvConfigured()) {
    return NextResponse.json({ configured: false, total: 0, top: [] as TopLinkStat[] })
  }

  const [rows, titles, total] = await Promise.all([
    kvCommand<string[]>(['ZREVRANGE', 'links:clicks', 0, 9, 'WITHSCORES']),
    kvCommand<Record<string, string>>(['HGETALL', 'links:titles']),
    kvCommand<string>(['GET', 'links:clicks:total'])
  ])

  const top: TopLinkStat[] = []
  const flat = rows ?? []
  for (let i = 0; i + 1 < flat.length; i += 2) {
    const url = flat[i]
    const score = flat[i + 1]
    if (typeof url !== 'string' || typeof score !== 'string') continue
    top.push({
      url,
      title: titles?.[url] ?? url,
      count: Number(score)
    })
  }

  return NextResponse.json({
    configured: true,
    total: Number(total ?? 0),
    top
  })
}
