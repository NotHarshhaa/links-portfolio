import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

import type { Links } from '@/types'

interface CardLinkProps extends Links {
  className?: string
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(
  ({ className, icon: Icon, title, url, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group relative flex items-center justify-between rounded-xl border border-neutral-200 bg-white/80 p-4 text-sm font-medium shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:border-blue-700 backdrop-blur-sm',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="flex items-center justify-center size-10 rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
              <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{title}</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-500 truncate max-w-[200px] group-hover:text-blue-500/70 dark:group-hover:text-blue-500/70 transition-colors">
              {url.replace(/^https?:\/\//, '')}
            </span>
          </div>
        </div>
        
        <motion.div 
          className="rounded-md p-1.5 text-neutral-700 opacity-60 transition-opacity group-hover:opacity-100 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" 
          whileHover={{ scale: 1.2, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-200/0 to-blue-300/10 dark:from-blue-900/0 dark:via-blue-800/0 dark:to-blue-700/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
        
        {/* Animated border effect */}
        <div className="absolute -z-10 inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="absolute inset-y-0 -right-px w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="absolute inset-y-0 -left-px w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
      </Link>
    )
  }
)

CardLink.displayName = 'CardLink'

export { CardLink }
