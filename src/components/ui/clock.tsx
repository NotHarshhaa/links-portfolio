'use client'

import { useEffect, useState } from 'react'

type ClockProps = {
  /** IANA time zone to display, e.g. the author's local time */
  timeZone?: string
  className?: string
}

/** Live HH:MM clock, rendered client-only to avoid hydration mismatch. */
export function Clock({
  timeZone = 'Asia/Kolkata',
  className
}: ClockProps) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone
      })

    const tick = () => setTime(format())
    const raf = requestAnimationFrame(tick)
    const id = setInterval(tick, 1000)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(id)
    }
  }, [timeZone])

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? '--:--'}
    </span>
  )
}
