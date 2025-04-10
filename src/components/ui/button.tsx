'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        fancy:
          'relative z-10 bg-black dark:bg-neutral-950 text-white border border-transparent px-4 py-2'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  animate?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animate = true, ...props }, ref) => {
    const isFancy = variant === 'fancy'

    const shimmerWrapperClass = isFancy
      ? 'group relative inline-block overflow-hidden rounded-md'
      : ''

    const shimmerBorderClass = isFancy
      ? 'absolute -inset-0.5 z-0 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-60 blur-md group-hover:opacity-100 transition duration-500'
      : ''

    const buttonContent = (
      <motion.button
        ref={ref}
        whileHover={animate ? { scale: 1.03 } : undefined}
        whileTap={animate ? { scale: 0.96 } : undefined}
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      />
    )

    if (asChild) {
      const Comp = Slot
      return (
        <Comp
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      )
    }

    return isFancy ? (
      <div className={shimmerWrapperClass}>
        <div className={shimmerBorderClass} />
        {buttonContent}
      </div>
    ) : (
      buttonContent
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
