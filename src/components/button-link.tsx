import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { Links } from '@/types'

interface ButtonLinkProps extends Links {
  className?: string
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, icon: Icon, title, url, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
                  className={cn(
            'group relative inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white/80 px-3 sm:px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md hover:scale-105 dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:border-blue-700 backdrop-blur-sm focus-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95 touch-manipulation',
            className
          )}
        aria-label={`Visit ${title}`}
        prefetch={false}
        {...props}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex items-center gap-2"
        >
          {Icon && (
            <motion.div
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center justify-center"
            >
              <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400 transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-300" />
            </motion.div>
          )}
          <span className="text-neutral-700 dark:text-neutral-300 transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-400 text-xs sm:text-sm">
            {title}
          </span>
        </motion.div>
        
        {/* Hover background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-200/0 to-blue-300/10 dark:from-blue-900/0 dark:via-blue-800/0 dark:to-blue-700/20 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
        
        {/* Border glow effect */}
        <div className="absolute -z-10 inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="absolute inset-y-0 -right-px w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="absolute inset-y-0 -left-px w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
      </Link>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'

export { ButtonLink }
