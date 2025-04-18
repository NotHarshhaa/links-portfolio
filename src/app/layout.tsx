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

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
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
      <body className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(circle,theme(colors.border/30)_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(circle,theme(colors.border/15)_1px,transparent_1px)]"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeTransitionWrapper>
            <TooltipProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </TooltipProvider>
            <Toaster />
          </ThemeTransitionWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

function ThemeTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

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
