'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type RotatingTextProps = {
  texts: string[]
  align?: 'left' | 'center' | 'right'
  /** Tailwind classes for the fixed-height window (each line is h-8) */
  className?: string
}

/** Vertical text carousel — lines slide upward every 2s, ported from the
 *  reference portfolio's ui/RotatingText component. */
export function RotatingText({
  texts,
  align = 'center',
  className
}: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [texts.length])

  const alignClass = {
    left: 'justify-start text-left',
    center: 'justify-center text-center',
    right: 'justify-end text-right'
  }[align]

  return (
    <div
      className={cn(
        'relative h-8 w-full overflow-hidden font-medium',
        alignClass,
        className
      )}
    >
      <div
        className="transition-transform duration-700 ease-out"
        style={{ transform: `translateY(-${index * 2}rem)` }}
      >
        {texts.map((text, i) => (
          <div key={i} className={cn('flex h-8 items-center', alignClass)}>
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
