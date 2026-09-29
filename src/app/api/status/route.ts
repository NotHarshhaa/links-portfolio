import { NextResponse } from 'next/server'
import {
  MONITORED_SERVICES,
  type MonitoredService,
  type ServiceStatus
} from '@/lib/services'

export const dynamic = 'force-dynamic'

const CACHE_TTL_MS = 30_000
const PROBE_TIMEOUT_MS = 5_000

let cache: { at: number; services: ServiceStatus[] } | null = null

async function probeOnce(svc: MonitoredService, method: 'HEAD' | 'GET') {
  const start = performance.now()
  return fetch(svc.url, {
    method,
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(PROBE_TIMEOUT_MS)
  }).then((res) => ({
    res,
    latency: Math.round(performance.now() - start)
  }))
}

async function probe(svc: MonitoredService): Promise<ServiceStatus> {
  try {
    let { res, latency } = await probeOnce(svc, 'HEAD')
    // Some servers reject HEAD with 405 — retry once with GET.
    if (res.status === 405) {
      ;({ res, latency } = await probeOnce(svc, 'GET'))
    }
    return {
      ...svc,
      status: res.ok ? 'operational' : 'degraded',
      latency
    }
  } catch {
    return { ...svc, status: 'down', latency: null }
  }
}

export async function GET(request: Request) {
  const fresh = new URL(request.url).searchParams.get('fresh') === '1'

  if (!fresh && cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return NextResponse.json({
      services: cache.services,
      checkedAt: cache.at,
      cached: true
    })
  }

  const services = await Promise.all(MONITORED_SERVICES.map(probe))
  cache = { at: Date.now(), services }

  return NextResponse.json({
    services,
    checkedAt: cache.at,
    cached: false
  })
}
