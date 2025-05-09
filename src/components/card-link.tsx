import { CopyToClipboard } from '@/components/copy-to-clipboard'
import { type Links } from '@/types'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type CardLinkVariant = 'default' | 'glass' | 'gradient' | 'minimal'

interface CardLinkProps extends Links {
  variant?: CardLinkVariant
}

export function CardLink({ title, url, icon, variant = 'default' }: CardLinkProps) {
  const variants = {
    default: 'border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md dark:bg-black/90 bg-white/10 hover:bg-white dark:hover:bg-neutral-800/50',
    glass: 'border border-white/20 dark:border-neutral-800/20 bg-white/10 dark:bg-black/10 backdrop-blur-md hover:bg-white/20 dark:hover:bg-black/20',
    gradient: 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20 border-transparent',
    minimal: 'border-0 shadow-none hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
  }

  const iconVariants = {
    default: 'bg-neutral-100 dark:bg-neutral-800/50 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700/50',
    glass: 'bg-white/20 dark:bg-black/20 group-hover:bg-white/30 dark:group-hover:bg-black/30',
    gradient: 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 group-hover:from-indigo-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30',
    minimal: 'bg-transparent group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative flex items-center justify-between w-full rounded-xl',
        'transition-all ease-in-out duration-300 cursor-pointer',
        variants[variant]
      )}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center w-full p-4 rounded-xl gap-4"
      >
        {/* Icon container */}
        <motion.div
          whileHover={{ rotate: 5 }}
          className={cn(
            'shrink-0 flex items-center justify-center w-10 h-10 rounded-lg',
            'transition-colors duration-300',
            iconVariants[variant]
          )}
        >
          {icon({ 
            className: cn(
              'size-5 transition-colors duration-300',
              variant === 'gradient' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-neutral-700 dark:text-neutral-300'
            )
          })}
        </motion.div>

        {/* Text container */}
        <div className="flex flex-col">
          <h2 className={cn(
            'font-medium font-mono text-base transition-colors duration-300',
            variant === 'gradient'
              ? 'text-indigo-900 dark:text-indigo-100'
              : 'text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white'
          )}>
            {title}
          </h2>
          <span className={cn(
            'text-sm truncate transition-colors duration-300',
            variant === 'gradient'
              ? 'text-indigo-700/70 dark:text-indigo-300/70'
              : 'text-neutral-500 dark:text-neutral-400'
          )}>
            {url}
          </span>
        </div>
      </a>

      {/* Copy icon */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 items-center hidden group-hover:flex"
      >
        <CopyToClipboard url={url} />
      </motion.div>
    </motion.div>
  )
}
