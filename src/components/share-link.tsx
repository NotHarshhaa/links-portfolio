'use client'

import { useState } from 'react'
import { Share2, Check, Copy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ShareLinkProps {
  url: string
  title: string
  className?: string
}

export function ShareLink({ url, title, className }: ShareLinkProps) {
  const [isShared, setIsShared] = useState(false)

  const handleShare = async (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const shareData = {
      title: title,
      url: url,
      text: `Check out ${title}`
    }

    try {
      // Try Web Share API first (mobile browsers)
      if (navigator.share) {
        await navigator.share(shareData)
        setIsShared(true)
        setTimeout(() => setIsShared(false), 2000)
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!', {
          description: url,
          duration: 2000,
        })
        setIsShared(true)
        setTimeout(() => setIsShared(false), 2000)
      }
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        // Fallback to copy
        try {
          await navigator.clipboard.writeText(url)
          toast.success('Link copied to clipboard!', {
            description: url,
            duration: 2000,
          })
          setIsShared(true)
          setTimeout(() => setIsShared(false), 2000)
        } catch (copyError) {
          toast.error('Failed to share link', {
            description: 'Please try again',
            duration: 2000,
          })
        }
      }
    }
  }

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleShare(e)
      }}
      onTouchStart={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onTouchEnd={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleShare(e)
      }}
      className={cn(
        'p-1.5 sm:p-2 rounded-lg',
        'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm',
        'border border-neutral-200/50 dark:border-neutral-800/50',
        'hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80',
        'hover:border-blue-300/50 dark:hover:border-blue-700/50',
        'transition-all duration-200',
        'focus-ring',
        'touch-manipulation',
        className
      )}
      aria-label={`Share ${title}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isShared ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-4 h-4 text-green-500" />
          </motion.div>
        ) : (
          <motion.div
            key="share"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Share2 className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

