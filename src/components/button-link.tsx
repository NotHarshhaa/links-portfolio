import { forwardRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Links } from '@/types'

interface ButtonLinkProps extends Links {
  className?: string
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, icon: Icon, title, url }, ref) => {
    return (
      <Button variant="outline" size="sm" asChild className={className}>
        <Link
          ref={ref}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
          aria-label={`Visit ${title}`}
        >
          {Icon && <Icon className="size-3.5" />}
          {title}
        </Link>
      </Button>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'

export { ButtonLink }
