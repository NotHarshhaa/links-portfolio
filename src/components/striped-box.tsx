import { cn } from '@/lib/utils'

/** Diagonal-stripe divider band between sections, ported from the
 *  reference portfolio's StripedBox and recolored to the blueprint theme. */
export function StripedBox({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative h-8 w-full overflow-hidden border-y border-border/60',
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, color-mix(in oklch, var(--foreground) 9%, transparent) 0 1px, transparent 1px 10px)'
        }}
      />
    </div>
  )
}
