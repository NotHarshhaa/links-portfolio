'use client'

import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function TypingRole() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const roles = [
    'DevOps Engineer',
    'Cloud Enthusiast',
    'Automation Fanatic',
    'Open-Source Contributor',
  ]

  if (isMobile) {
    return (
      <div className="h-8 md:h-10 relative p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-70"></div>
        <p className="relative text-center text-base md:text-lg font-mono font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600 dark:from-blue-400 dark:to-purple-400 break-words px-6 py-1">
          &lt; {roles[0]} /&gt;
        </p>
      </div>
    )
  }

  return (
    <motion.div 
      className="h-8 md:h-10 relative p-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-70"></div>
      <p className="relative text-center text-base md:text-lg font-mono font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600 dark:from-blue-400 dark:to-purple-400 break-words px-6 py-1">
        &lt; <Typewriter
          words={roles}
          loop
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        /> /&gt;
      </p>
    </motion.div>
  )
}
