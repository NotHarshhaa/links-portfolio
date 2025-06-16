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
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      className="w-full mt-24 mb-8 px-4 flex flex-col items-center"
    >
      <div
        className="
          bg-gradient-to-r from-white/80 via-white/90 to-white/80 
          dark:from-zinc-900/80 dark:via-zinc-900/90 dark:to-zinc-900/80 
          backdrop-blur-[16px]
          border border-zinc-100/70 dark:border-zinc-800/70 
          text-zinc-800 dark:text-zinc-200
          shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)]
          hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.25)]
          hover:border-blue-300/30 dark:hover:border-blue-700/30
          rounded-full w-[92%] max-w-4xl mx-auto px-6 py-4
          flex flex-col md:flex-row items-center md:justify-between text-sm font-medium
          transition-all duration-300"
      >
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center md:space-x-4 text-center md:text-left space-y-2 md:space-y-0"
        >
          <div className="relative size-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
            <Image
              src="/assets/avatar.png"
              alt="Logo"
              width={32}
              height={32}
              className="relative z-10 rounded-full border border-zinc-200/50 dark:border-zinc-700/50 drop-shadow-md"
            />
          </div>
          <p className="text-sm tracking-wide">
            © {year}
            <span className="mx-2 text-zinc-400 dark:text-zinc-500">•</span>
            <a
              href="https://notharshhaa.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400 hover:from-purple-500 hover:to-blue-600 dark:hover:from-purple-400 dark:hover:to-blue-400 transition-all duration-300 font-semibold"
            >
              H A R S H H A A
            </a>
            <span className="mx-2 text-zinc-400 dark:text-zinc-500">—</span>
            <span className="text-zinc-600 dark:text-zinc-400">All rights reserved.</span>
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          onClick={scrollToTop}
          className="
            p-2.5 rounded-full 
            bg-gradient-to-r from-white via-white/95 to-white/90
            dark:from-zinc-800 dark:via-zinc-800/95 dark:to-zinc-800/90
            border border-zinc-200/80 dark:border-zinc-700/80 
            hover:border-blue-300/50 dark:hover:border-blue-700/50
            hover:shadow-md hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10
            transition-all duration-300
            group
          "
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-blue-600/70 dark:text-blue-400/70 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
        </motion.button>
      </div>
    </motion.footer>
  )
}
