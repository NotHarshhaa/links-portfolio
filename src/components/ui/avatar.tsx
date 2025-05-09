'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    variant?: 'default' | 'glow' | 'ring'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'shadow-md hover:shadow-lg transition-shadow duration-300',
    glow: 'shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300',
    ring: 'ring-2 ring-offset-2 ring-neutral-200 dark:ring-neutral-800 ring-offset-white dark:ring-offset-neutral-950 hover:ring-primary/50 transition-all duration-300'
  }

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        'transition-transform duration-300 hover:scale-105',
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      'aspect-square h-full w-full object-cover',
      'transition-opacity duration-300',
      className
    )}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full',
      'bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900',
      'text-neutral-900 dark:text-neutral-100',
      'font-medium',
      'transition-colors duration-300',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Enhanced Avatar with animation wrapper
const AnimatedAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  React.ComponentPropsWithoutRef<typeof Avatar>
>(({ className, ...props }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Avatar ref={ref} className={className} {...props} />
    </motion.div>
  )
})
AnimatedAvatar.displayName = 'AnimatedAvatar'

export { Avatar, AvatarImage, AvatarFallback, AnimatedAvatar }
