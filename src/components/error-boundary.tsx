'use client'

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
    // In production, you could log to an error reporting service
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-black relative">
          {/* Background decoration matching site style */}
          <div className="fixed top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/50 via-purple-50/30 to-transparent dark:from-blue-950/20 dark:via-purple-950/10 dark:to-transparent -z-10"></div>
          <div className="fixed top-20 -left-5 sm:-left-10 md:left-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse -z-10"></div>
          <div className="fixed top-40 -right-5 sm:-right-10 md:right-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse -z-10"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gradient-to-br from-white/80 via-white/90 to-blue-50/80 dark:from-zinc-900/80 dark:via-zinc-800/80 dark:to-blue-950/70 backdrop-blur-lg border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-xl"></div>
                <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 dark:text-red-400 relative z-10" />
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-600 to-red-600 dark:from-red-400 dark:via-orange-400 dark:to-red-400">
                  Something went wrong
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                  We encountered an unexpected error. Please try refreshing the page.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="w-full mt-4 text-left">
                  <summary className="cursor-pointer text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Error details (development only)
                  </summary>
                  <pre className="text-xs bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg overflow-auto max-h-40 border border-neutral-200 dark:border-neutral-700">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}

              <motion.button
                onClick={this.handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 dark:from-blue-500 dark:via-purple-500 dark:to-blue-500 dark:hover:from-blue-600 dark:hover:via-purple-600 dark:hover:to-blue-600 text-white font-medium rounded-xl sm:rounded-lg transition-all duration-300 focus-ring shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Refresh Page</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

