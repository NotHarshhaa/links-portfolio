import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: ReactNode
  /** Seconds for one full loop */
  duration?: number
  reverse?: boolean
  className?: string
  itemClassName?: string
}

/**
 * Seamless, pause-on-hover marquee. Renders the children twice: the second
 * copy is aria-hidden so screen readers only announce the list once.
 */
export function Marquee({
  children,
  duration = 46,
  reverse = false,
  className,
  itemClassName,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'marquee-viewport relative min-w-0 max-w-full overflow-hidden',
        className
      )}
    >
      <div
        className="marquee-track flex w-max items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div
          className={cn('flex shrink-0 items-center gap-2 pr-2', itemClassName)}
        >
          {children}
        </div>
        <div
          aria-hidden
          className={cn('flex shrink-0 items-center gap-2 pr-2', itemClassName)}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

type MarqueeChipProps = {
  children: ReactNode
  index?: number
  className?: string
}

export function MarqueeChip({ children, index, className }: MarqueeChipProps) {
  return (
    <span
      className={cn(
        'group/chip inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 font-mono text-[11px] whitespace-nowrap text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground',
        className
      )}
    >
      {typeof index === 'number' && (
        <span className="text-[9px] tracking-wider text-muted-foreground/50 tabular-nums transition-colors group-hover/chip:text-signal">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      {children}
    </span>
  )
}
