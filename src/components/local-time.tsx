'use client'

import { useEffect, useState } from 'react'

export function LocalTime({
  timezone = 'Asia/Kolkata',
  location = 'Hyderabad'
}: {
  timezone?: string
  location?: string
}) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const time = now
    ? new Intl.DateTimeFormat('en-IN', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now)
    : '--:--'

  return (
    <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
      {location} · {time} IST
    </span>
  )
}
