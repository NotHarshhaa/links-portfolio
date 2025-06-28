'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { motion } from 'framer-motion'

export default function SkipAnimation() {
  const [showSkip, setShowSkip] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
  
  // Don't show on mobile or if skip was clicked
  if (!showSkip || isMobile) return null
  
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