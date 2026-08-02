'use client'

import { forwardRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import type { Links } from '@/types'

interface CardLinkProps extends Links {
  className?: string
  onTrackClick?: () => void
  isLast?: boolean
}

const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(
  (
    {
      className,
      icon: Icon,
      title,
      url,
      onTrackClick,
      isLast,
      ...props
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
      <li className={cn(!isLast && 'border-b border-border', className)}>
        <div className="group flex items-start justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
          <Link
            ref={ref}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            onClick={() => onTrackClick?.()}
            className="flex min-w-0 flex-1 items-start gap-3 transition-opacity hover:opacity-70 sm:gap-4"
            aria-label={`Visit ${title}`}
            {...props}
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
            </span>
          </Link>

          <button
            type="button"
            onClick={handleCopy}
            className="mt-0.5 flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
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
      </li>
    )
  }
)

CardLink.displayName = 'CardLink'

export { CardLink }
