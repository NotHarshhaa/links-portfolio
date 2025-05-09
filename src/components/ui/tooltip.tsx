'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant?: 'default' | 'glass' | 'gradient'
  }
>(({ className, sideOffset = 4, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800',
    glass: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-white/20 dark:border-neutral-800/20',
    gradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-transparent text-white'
  }

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-lg px-3 py-1.5 text-sm shadow-lg',
        'border backdrop-blur-sm',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="relative">
        {props.children}
        {variant === 'gradient' && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
        )}
      </div>
      <TooltipPrimitive.Arrow
        className={cn(
          'fill-current',
          variant === 'gradient' ? 'text-indigo-500' : 'text-white dark:text-neutral-900'
        )}
      />
    </TooltipPrimitive.Content>
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Enhanced Tooltip with animation wrapper
const AnimatedTooltip = React.forwardRef<
  React.ElementRef<typeof Tooltip>,
  React.ComponentPropsWithoutRef<typeof Tooltip> & {
    variant?: 'default' | 'glass' | 'gradient'
  }
>(({ children, variant = 'default', ...props }, ref) => {
  return (
    <Tooltip {...props}>
      <AnimatePresence>
        {children}
      </AnimatePresence>
    </Tooltip>
  )
})
AnimatedTooltip.displayName = 'AnimatedTooltip'

// Enhanced TooltipContent with motion
const MotionTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipContent>,
  React.ComponentPropsWithoutRef<typeof TooltipContent>
>(({ className, ...props }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <TooltipContent ref={ref} className={className} {...props} />
    </motion.div>
  )
})
MotionTooltipContent.displayName = 'MotionTooltipContent'

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  AnimatedTooltip,
  MotionTooltipContent
}
