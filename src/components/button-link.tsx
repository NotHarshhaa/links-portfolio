import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import { type Links } from '@/types'
import { motion } from 'framer-motion'
import React from 'react'

export function ButtonLink({ title, url, icon: Icon }: Links) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            variant='outline'
            size='icon'
            className='shadow-md hover:shadow-lg transition-all duration-300 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 relative overflow-hidden group bg-white/70 backdrop-blur-sm dark:bg-neutral-900/70'
            asChild
          >
            <a
              aria-label={`${title} link`}
              key={url}
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className="relative z-10"
            >
              <Icon className='h-[1.5rem] w-[1.5rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300' />
              <span className="absolute inset-0 bg-gradient-to-tr from-blue-100/0 via-blue-300/20 to-purple-300/20 dark:from-blue-900/0 dark:via-blue-700/20 dark:to-purple-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </a>
          </Button>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side='bottom' className="text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  )
}
