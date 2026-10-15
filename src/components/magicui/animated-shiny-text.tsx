'use client'

import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, CSSProperties } from 'react'

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number
}

/** A light sweep that periodically crosses the text, ported from the
 *  sleek-portfolio magicui AnimatedShinyText (theme-aware gradient). */
export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
  ...props
}: AnimatedShinyTextProps) {
  return (
    <span
      style={{ '--shiny-width': `${shimmerWidth}px` } as CSSProperties}
      className={cn(
        'animate-shiny-text bg-clip-text bg-no-repeat text-muted-foreground [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',
        'bg-gradient-to-r from-transparent via-foreground/90 via-50% to-transparent',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
