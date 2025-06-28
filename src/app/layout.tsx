'use client'

import type React from 'react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Head } from '@/components/head'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full bg-background font-sans antialiased',
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <Head
        metadata={{
          title: 'Link | HARSHHAA',
          description: 'Links to my social media'
        }}
      />
      <body className="flex min-h-screen flex-col bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeTransitionWrapper>
            <TooltipProvider>
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </TooltipProvider>
            <Toaster 
              position="bottom-right"
              toastOptions={{
                className: 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800',
                duration: 3000,
              }}
            />
          </ThemeTransitionWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

function ThemeTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return <div>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.5, scale: 0.98 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="transition-colors duration-500"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
