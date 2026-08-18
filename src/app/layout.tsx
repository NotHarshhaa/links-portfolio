'use client'

import React from 'react'
import { Instrument_Sans } from 'next/font/google'
import { Head } from '@/components/head'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ErrorBoundary } from '@/components/error-boundary'
import { CommandPalette } from '@/components/command-palette'
import { KeyboardHelp } from '@/components/keyboard-help'
import { ScrollProgress } from '@/components/scroll-progress'
import { cn } from '@/lib/utils'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        'min-h-screen font-sans antialiased',
        instrumentSans.variable
      )}
      suppressHydrationWarning
    >
      <Head
        metadata={{
          title: 'Links | Harshhaa',
          description:
            'Platform Engineer links — portfolio, resume, socials, communities, and DevOps/Cloud resources.',
          keywords:
            'Platform Engineer, AI Infrastructure, DevOps, Cloud, Kubernetes, MLOps, Hyderabad'
        }}
      />
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <ScrollProgress />
              <Header />
              <main id="main-content" className="flex-grow" tabIndex={-1}>
                {children}
              </main>
              <Footer />
              <CommandPalette />
              <KeyboardHelp />
            </TooltipProvider>
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
