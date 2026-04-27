'use client'

import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect if the current device is mobile
 * Provides debounced resize handling for better performance
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    }
    
    checkMobile()
    
    // Debounce resize event for better performance
    let resizeTimeout: NodeJS.Timeout
    const debouncedCheckMobile = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(checkMobile, 150)
    }
    
    window.addEventListener('resize', debouncedCheckMobile)
    
    return () => {
      window.removeEventListener('resize', debouncedCheckMobile)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return { isMobile, mounted }
}
