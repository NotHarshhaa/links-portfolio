'use client'

import { forwardRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Check, Copy, Star } from 'lucide-react'
import { toast } from 'sonner'
import type { Links } from '@/types'
import { HoverMark } from '@/components/hover-mark'

interface CardLinkProps extends Links {
  className?: string
  onTrackClick?: () => void
  isLast?: boolean
  isFavorite?: boolean
  onToggleFavorite?: () => void
  visits?: number
}

const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(
  (
    {
      className,
      icon: Icon,
      title,
      url,
      description,
      onTrackClick,
      isLast,
      isFavorite,
      onToggleFavorite,
      visits
    },
    ref
  ) => {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = async (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      try {
        await navigator.clipboard.writeText(url)
        setIsCopied(true)
        toast.success('Link copied')
        setTimeout(() => setIsCopied(false), 2000)
      } catch {
        toast.error('Failed to copy')
      }
    }

    return (
      <HoverMark
        as="li"
        label="Open link"
        className={cn(!isLast && 'border-b border-border', className)}
      >
        <div className="flex items-start justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
          <Link
            ref={ref}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            onClick={() => onTrackClick?.()}
            className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4"
            aria-label={`Visit ${title}`}
          >
            {Icon && (
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-border bg-muted/40">
                <Icon className="size-4 text-foreground" />
              </span>
            )}
            <span className="min-w-0 space-y-1">
              <span className="flex items-center gap-1.5 text-sm font-medium sm:text-base">
                {title}
                <ArrowUpRight className="size-3.5 shrink-0 opacity-40" />
              </span>
              <span className="hidden break-all font-mono text-xs text-muted-foreground sm:block">
                {url.replace(/^https?:\/\//, '')}
              </span>
              {description && (
                <span className="block text-xs text-muted-foreground">
                  {description}
                </span>
              )}
            </span>
          </Link>

          <div className="relative z-20 mt-0.5 flex shrink-0 items-center gap-0.5">
            {typeof visits === 'number' && visits > 0 && (
              <span className="hidden px-1.5 font-mono text-[10px] text-muted-foreground tabular-nums sm:inline">
                {visits}×
              </span>
            )}
            {onToggleFavorite && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onToggleFavorite()
                  toast.success(
                    isFavorite ? 'Removed from favorites' : 'Saved to favorites'
                  )
                }}
                className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                aria-label={
                  isFavorite ? 'Remove from favorites' : 'Save to favorites'
                }
                aria-pressed={isFavorite}
                title={isFavorite ? 'Unfavorite' : 'Favorite'}
              >
                <Star
                  className={cn('size-3.5', isFavorite && 'fill-current')}
                />
              </button>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Copy link"
              title="Copy link"
            >
              {isCopied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
        </div>
      </HoverMark>
    )
  }
)

CardLink.displayName = 'CardLink'

export { CardLink }
