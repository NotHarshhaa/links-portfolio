'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [ripple, setRipple] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'
  const label = `Theme: ${isDark ? 'Dark' : 'Light'}`

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark')
    setRipple(true)
    setTimeout(() => setRipple(false), 300) // Reset ripple after animation
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="relative size-9 overflow-hidden rounded-lg transition-colors duration-300"
          >
            {/* Ripple effect */}
            {ripple && (
              <motion.div
                initial={{ scale: 0, opacity: 0.4 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-primary pointer-events-none"
              />
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ opacity: 0, y: -8, rotate: -15 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 8, rotate: 15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="absolute flex items-center justify-center inset-0"
              >
                {isDark ? (
                  <Moon className="h-[1.5rem] w-[1.5rem] stroke-[1.5]" />
                ) : (
                  <Sun className="h-[1.5rem] w-[1.5rem] stroke-[1.5]" />
                )}
              </motion.div>
            </AnimatePresence>

            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={6}>
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
