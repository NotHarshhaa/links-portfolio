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
        w-[92%] max-w-4xl z-50 rounded-full border 
        flex items-center justify-between 
        bg-white/70 dark:bg-zinc-900/70 
        border-zinc-200/50 dark:border-zinc-700/50 
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={36} 
            height={36} 
            className="relative z-10 group-hover:opacity-90 transition-opacity duration-300" 
          />
        </motion.div>
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base font-medium tracking-wide text-zinc-800 dark:text-zinc-200 hidden sm:inline"
        >
          H A R S H H A A
        </motion.span>
      </Link>

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ModeToggle />
      </motion.div>
    </motion.header>
  )
}
