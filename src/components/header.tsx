'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 10)
  })

  return (
    <motion.header
      initial={false}
      animate={{
      padding: scrolled ? '0.5rem 1rem' : '1rem 1.5rem',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`
      fixed top-4 left-1/2 transform -translate-x-1/2 
      w-[90%] max-w-5xl z-50 rounded-2xl border 
      flex items-center justify-between 
      bg-white/80 dark:bg-zinc-900/80 
      border-zinc-200 dark:border-zinc-700 
      shadow-md
      `}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        <span className="text-base font-semibold text-black dark:text-white hidden sm:inline">
          H A R S H H A A
        </span>
      </Link>

      {/* Theme Toggle and Mobile Menu */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <ModeToggle />
      </div>
    </motion.header>
  )
}
