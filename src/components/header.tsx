'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'
import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 10)
  })

  return (
    <motion.header
      initial={false}
      animate={{
        padding: scrolled ? '0.75rem 1.5rem' : '1.25rem 2rem',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
      }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className={`
        fixed top-6 left-1/2 transform -translate-x-1/2 
        w-[92%] max-w-4xl z-50 rounded-full
        flex items-center justify-between 
        bg-gradient-to-r from-white/80 via-white/90 to-white/80 
        dark:from-zinc-900/80 dark:via-zinc-900/90 dark:to-zinc-900/80 
        border border-zinc-100/70 dark:border-zinc-800/70 
        shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)]
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.25)]
        hover:border-blue-300/30 dark:hover:border-blue-700/30
        transition-all duration-300
      `}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3 group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl group-hover:blur-2xl group-hover:scale-110 transition-all duration-500" />
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={38} 
            height={38} 
            className="relative z-10 group-hover:opacity-90 transition-opacity duration-300 drop-shadow-md" 
          />
        </motion.div>
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 hidden sm:inline"
        >
          H A R S H H A A
        </motion.span>
      </Link>

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <ModeToggle />
      </motion.div>
    </motion.header>
  )
}
