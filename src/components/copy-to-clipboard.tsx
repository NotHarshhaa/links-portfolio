'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'
import { Button } from './ui/button'
import { CopyIcon, CheckIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { type Links } from '@/types'

export function CopyToClipboard({ url }: { url: Links['url'] }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true)
        toast.success('Copied to clipboard!', {
          description: url,
          duration: 2000,
          className: 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800',
        })
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
      .catch((error) => {
        if (error) toast.error('Failed to copy to clipboard', {
          description: 'Please try again',
          duration: 2000,
          className: 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800',
        })
      })
  }

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          onClick={copyToClipboard}
          disabled={copied}
          className={clsx(
            'relative size-8 rounded-full transition-all duration-300',
            'hover:bg-neutral-100 dark:hover:bg-neutral-800',
            'focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600',
            'disabled:opacity-100 disabled:cursor-default'
          )}
        >
          <AnimatePresence mode="wait">
            {!copied ? (
              <motion.div
                key="copy"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <CopyIcon className="size-4 text-neutral-600 dark:text-neutral-400" />
              </motion.div>
            ) : (
              <motion.div
                key="check"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <CheckIcon className="size-4 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </TooltipTrigger>
      <TooltipContent 
        side="bottom" 
        className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-lg rounded-lg px-3 py-2 text-sm font-medium"
        sideOffset={5}
      >
        <p className="text-neutral-900 dark:text-neutral-100">
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
