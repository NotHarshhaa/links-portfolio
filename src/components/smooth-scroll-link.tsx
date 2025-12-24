'use client'

import { ReactNode, MouseEvent } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SmoothScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  [key: string]: any
}

/**
 * Smooth scroll link component that handles both internal anchor links
 * and external links with smooth scrolling behavior
 */
export function SmoothScrollLink({ 
  href, 
  children, 
  className,
  onClick,
  ...props 
}: SmoothScrollLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Check if it's an internal anchor link
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        const headerOffset = 100 // Account for fixed header
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })

        // Update URL without triggering scroll
        window.history.pushState(null, '', href)
        
        // Focus the element for accessibility
        targetElement.focus({ preventScroll: true })
        targetElement.setAttribute('tabindex', '-1')
      }
    }

    // Call custom onClick if provided
    onClick?.(e)
  }

  // For external links, use regular Link behavior
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <Link
        href={href}
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    )
  }

  // For internal anchor links, handle smooth scroll
  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn('focus-ring', className)}
      {...props}
    >
      {children}
    </a>
  )
}

