'use client'

import React from 'react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Head } from '@/components/head'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PerformanceMonitor } from '@/components/performance-monitor'
import { SEOOptimizer } from '@/components/seo-optimizer'
import { ErrorBoundary } from '@/components/error-boundary'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState, Suspense } from 'react'

// Lazy load header only, keep footer direct for reliable display
const LazyHeader = React.lazy(() => import('@/components/header').then(mod => ({ default: mod.Header })))

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
          title: 'Links | HARSHHAA',
          description: 'A curated collection of links to all my social media profiles, professional networks, portfolio, and ways to connect with me online. Stay updated with my latest projects, blog posts, and DevOps insights.',
          keywords: 'DevOps Engineer, Cloud Infrastructure, Automation, AWS, Azure, GCP, Kubernetes, Docker, CI/CD, Hyderabad, India'
        }}
      />
      <body className="flex min-h-screen flex-col bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-black relative">
        <PerformanceMonitor />
        <SEOOptimizer />
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeTransitionWrapper>
              <TooltipProvider>
                <Suspense fallback={<div className="h-14 sm:h-16" />}>
                  <LazyHeader />
                </Suspense>
                <main id="main-content" className="flex-grow" tabIndex={-1}>
                  {children}
                </main>
              </TooltipProvider>
              <Toaster 
                position="bottom-right"
                toastOptions={{
                  className: 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-sm sm:text-base',
                  duration: 3000,
                }}
              />
            </ThemeTransitionWrapper>
            <Footer />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

function ThemeTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  // Disable animations on mobile for better performance
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
