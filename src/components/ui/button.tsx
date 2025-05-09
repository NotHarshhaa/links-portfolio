'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md',
        outline: 'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md',
        ghost: 'hover:bg-accent hover:text-accent-foreground hover:shadow-sm',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'relative z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg hover:shadow-xl',
        glass: 'bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-black/20 hover:bg-white/20 dark:hover:bg-black/20',
        subtle: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700',
        fancy: 'relative z-10 bg-black dark:bg-neutral-950 text-white border border-transparent px-4 py-2 shadow-lg hover:shadow-xl'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8 text-base',
        xl: 'h-12 rounded-lg px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12'
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
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animate = true, loading = false, ...props }, ref) => {
    const isFancy = variant === 'fancy'
    const isGradient = variant === 'gradient'

    const shimmerWrapperClass = isFancy
      ? 'group relative inline-block overflow-hidden rounded-lg'
      : ''

    const shimmerBorderClass = isFancy
      ? 'absolute -inset-0.5 z-0 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-60 blur-md group-hover:opacity-100 transition duration-500'
      : ''

    const buttonContent = (
      <motion.button
        ref={ref}
        whileHover={animate ? { scale: 1.02 } : undefined}
        whileTap={animate ? { scale: 0.98 } : undefined}
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && 'relative cursor-wait',
          isGradient && 'hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]'
        )}
        disabled={loading || props.disabled}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>
          {props.children}
        </span>
      </motion.button>
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
