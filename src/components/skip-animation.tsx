'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { useMobile } from '@/hooks/use-mobile'

export default function SkipAnimation() {
  const [showSkip, setShowSkip] = useState(true)
  const { isMobile } = useMobile()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])
  
  const handleSkip = () => {
    // Find all animated elements and set them to their final state
    document.querySelectorAll('[data-skip-animation]').forEach((el) => {
      // Remove animation classes/styles
      if (el instanceof HTMLElement) {
        el.style.opacity = '1'
        el.style.transform = 'none'
        el.style.transition = 'none'
      }
    })
    
    // Hide the skip button
    setShowSkip(false)
    
    // Store in session storage so it persists during page navigation
    sessionStorage.setItem('animations-skipped', 'true')
  }
  
  // Don't show on mobile, if skip was clicked, or if user prefers reduced motion
  if (!showSkip || isMobile || prefersReducedMotion) return null
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <Button 
        onClick={handleSkip}
        variant="outline"
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg border border-neutral-200 dark:border-neutral-800 text-xs font-medium"
      >
        Skip Animations
      </Button>
    </motion.div>
  )
} 