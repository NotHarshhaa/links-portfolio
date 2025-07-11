import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

import type { Links } from '@/types'

interface CardLinkProps extends Links {
  className?: string
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
  special?: boolean
  sectionId?: string
}

const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(
  ({ className, icon: Icon, title, url, special, sectionId, ...props }, ref) => {
    // Determine gradient colors based on section
    const getGradientClasses = () => {
      if (special) {
        return {
          hover: 'bg-gradient-to-r from-blue-100/0 via-blue-200/0 to-blue-300/10 dark:from-blue-900/0 dark:via-blue-800/0 dark:to-blue-700/20',
          border: 'from-transparent via-blue-500 to-transparent'
        }
      } else if (sectionId === 'personal-network') {
        return {
          hover: 'bg-gradient-to-r from-purple-100/0 via-purple-200/0 to-purple-300/10 dark:from-purple-900/0 dark:via-purple-800/0 dark:to-purple-700/20',
          border: 'from-transparent via-purple-500 to-transparent'
        }
      } else {
        return {
          hover: 'bg-gradient-to-r from-green-100/0 via-green-200/0 to-green-300/10 dark:from-green-900/0 dark:via-green-800/0 dark:to-green-700/20',
          border: 'from-transparent via-green-500 to-transparent'
        }
      }
    }

    const gradients = getGradientClasses();

    return (
      <Link
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group relative flex items-center justify-between rounded-xl border border-neutral-200 bg-white/80 p-4 text-sm font-medium shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md hover:scale-[1.02] dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:border-blue-700 backdrop-blur-sm',
          special ? 'hover:border-blue-300 dark:hover:border-blue-700' : 
                   sectionId === 'personal-network' ? 'hover:border-purple-300 dark:hover:border-purple-700' : 
                   'hover:border-green-300 dark:hover:border-green-700',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4 z-10">
          {Icon && (
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`flex items-center justify-center size-10 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 ${
              special ? 'bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900' :
                        sectionId === 'personal-network' ? 'bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900' :
                        'bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900'
            }`}>
              <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                special ? 'text-blue-600 dark:text-blue-400' :
                          sectionId === 'personal-network' ? 'text-purple-600 dark:text-purple-400' :
                          'text-green-600 dark:text-green-400'
              }`} />
            </motion.div>
          )}
          <div className="flex flex-col">
            <span className={`font-medium text-neutral-700 dark:text-neutral-300 ${
              special ? 'group-hover:text-blue-700 dark:group-hover:text-blue-400' :
                        sectionId === 'personal-network' ? 'group-hover:text-purple-700 dark:group-hover:text-purple-400' :
                        'group-hover:text-green-700 dark:group-hover:text-green-400'
            } transition-colors`}>{title}</span>
            <span className={`text-xs text-neutral-500 dark:text-neutral-500 truncate max-w-[200px] ${
              special ? 'group-hover:text-blue-500/70 dark:group-hover:text-blue-500/70' :
                        sectionId === 'personal-network' ? 'group-hover:text-purple-500/70 dark:group-hover:text-purple-500/70' :
                        'group-hover:text-green-500/70 dark:group-hover:text-green-500/70'
            } transition-colors`}>
              {url.replace(/^https?:\/\//, '')}
            </span>
          </div>
        </div>
        
        <motion.div 
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`rounded-md p-1.5 text-neutral-700 opacity-60 group-hover:opacity-100 dark:text-neutral-300 z-10 ${
          special ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400' :
                    sectionId === 'personal-network' ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400' :
                    'group-hover:text-green-600 dark:group-hover:text-green-400'
        } transition-colors`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
          >
            <path
              fillRule="evenodd"
              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
        
        <div className={`absolute inset-0 ${gradients.hover} opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300`}></div>
        
        {/* Border effect */}
        <div className="absolute -z-10 inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r ${gradients.border}`} />
          <div className={`absolute inset-y-0 -right-px w-px h-full bg-gradient-to-b ${gradients.border}`} />
          <div className={`absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r ${gradients.border}`} />
          <div className={`absolute inset-y-0 -left-px w-px h-full bg-gradient-to-b ${gradients.border}`} />
        </div>
      </Link>
    )
  }
)

CardLink.displayName = 'CardLink'

export { CardLink }
