'use client'

import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'
import { triggerModal } from '@/hooks/use-modals'
import { cn } from '@/lib/utils'

export function TelemetryBadge({ className }: { className?: string }) {
  const [latency, setLatency] = useState<number | null>(null)
  const [status, setStatus] = useState<'healthy' | 'checking' | 'degraded'>('checking')

  useEffect(() => {
    let mounted = true

    const measureLatency = async () => {
      const start = performance.now()
      try {
        const res = await fetch('/api/ping', { cache: 'no-store' })
        const end = performance.now()
        if (res.ok && mounted) {
          setLatency(Math.round(end - start))
          setStatus('healthy')
        } else if (mounted) {
          setStatus('degraded')
        }
      } catch {
        if (mounted) {
          setStatus('degraded')
          setLatency(null)
        }
      }
    }

    measureLatency()
    const interval = setInterval(measureLatency, 30000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => triggerModal('telemetry')}
      className={cn(
        'group flex items-center gap-2 border border-border/80 bg-background/60 px-2.5 py-1 text-left font-mono text-[11px] backdrop-blur-md transition-all hover:border-foreground/40 hover:bg-muted/60',
        className
      )}
      title="View Edge Telemetry & Systems Status"
      aria-label="System telemetry and edge latency"
    >
      <span className="relative flex size-2 items-center justify-center">
        <span
          className={cn(
            'absolute inline-flex size-full rounded-full opacity-75',
            status === 'healthy' && 'animate-ping bg-emerald-500',
            status === 'checking' && 'bg-amber-500',
            status === 'degraded' && 'bg-rose-500'
          )}
        />
        <span
          className={cn(
            'relative inline-flex size-1.5 rounded-full',
            status === 'healthy' && 'bg-emerald-500',
            status === 'checking' && 'bg-amber-500',
            status === 'degraded' && 'bg-rose-500'
          )}
        />
      </span>

      <span className="hidden sm:inline text-muted-foreground group-hover:text-foreground">
        EDGE
      </span>
      <span className="font-semibold text-foreground tabular-nums">
        {latency !== null ? `${latency}ms` : 'checking...'}
      </span>
      <Activity className="size-3 text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100" />
    </button>
  )
}
