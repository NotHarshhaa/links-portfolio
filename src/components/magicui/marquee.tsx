'use client'

import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

export interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  repeat?: number
}

/** Infinite scrolling ticker, ported from the sleek-portfolio magicui
 *  Marquee component. Animation speed/gap via --duration/--gap. */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0}
            className={cn(
              'flex shrink-0 justify-around [gap:var(--gap)]',
              vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
              pauseOnHover && 'group-hover:[animation-play-state:paused]',
              reverse && '[animation-direction:reverse]'
            )}
          >
            {props.children}
          </div>
        ))}
    </div>
  )
}
