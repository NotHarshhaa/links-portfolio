'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowUp } from 'lucide-react'

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full mt-24 mb-8 px-4 flex flex-col items-center"
    >
      <div
        className="backdrop-blur-md bg-white/60 dark:bg-neutral-900/60
        border border-neutral-200 dark:border-neutral-800
        text-neutral-800 dark:text-neutral-300
        shadow-lg dark:shadow-none
        rounded-xl w-full max-w-2xl mx-auto px-4 py-4
        flex flex-col md:flex-row items-center md:justify-between text-sm font-medium space-y-4 md:space-y-0"
      >
        <div className="flex flex-col md:flex-row items-center md:space-x-3 text-center md:text-left space-y-2 md:space-y-0">
          <Image
            src="/assets/avatar.jpg"
            alt="Logo"
            width={28}
            height={28}
            className="rounded-full border dark:border-neutral-700"
          />
          <p className="text-sm">
            © {year}
            <span className="mx-2">•</span>
            <a
              href="https://notharshhaa.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:underline-offset-4 transition-all duration-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              H A R S H H A A
            </a>
            <span className="mx-2">—</span>
            All rights reserved.
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2 rounded-full border bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>
      </div>
    </motion.footer>
  )
}
