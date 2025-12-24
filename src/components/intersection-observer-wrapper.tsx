'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface IntersectionObserverWrapperProps {
  children: ReactNode
  className?: string
  fallback?: ReactNode
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Wrapper component that uses Intersection Observer to lazy load content
 * Only renders children when they come into view for better performance
 */
export function IntersectionObserverWrapper({
  children,
  className,
  fallback,
  threshold = 0.1,
  rootMargin = '100px',
  triggerOnce = true
}: IntersectionObserverWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: triggerOnce,
    margin: rootMargin as any,
    amount: threshold
  })

  return (
    <div ref={ref} className={className || ''}>
      {isInView ? children : (fallback || (
        <div className="w-full min-h-[200px] bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/30 dark:border-neutral-800/30 rounded-3xl animate-pulse" />
      ))}
    </div>
  )
}

