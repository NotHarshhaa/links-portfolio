'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ onSearch, placeholder = 'Search links...', className }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 0)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setQuery('')
        onSearch('')
      }
    }

    window.addEventListener('keydown', handleKeyDown as unknown as EventListener)
    return () => window.removeEventListener('keydown', handleKeyDown as unknown as EventListener)
  }, [isOpen, onSearch])

  // Update search when query changes
  useEffect(() => {
    onSearch(query)
  }, [query, onSearch])

  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => {
          setIsOpen(true)
          setTimeout(() => inputRef.current?.focus(), 0)
        }}
        className={cn(
          'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl',
          'bg-gradient-to-br from-white/80 via-white/90 to-blue-50/80 dark:from-neutral-900/80 dark:via-neutral-800/80 dark:to-blue-950/70',
          'backdrop-blur-lg border border-neutral-200/50 dark:border-neutral-800/50',
          'text-neutral-600 dark:text-neutral-400',
          'hover:border-blue-300/50 dark:hover:border-blue-700/50',
          'hover:shadow-md shadow-sm transition-all duration-300',
          'focus-ring',
          className
        )}
        aria-label="Open search"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline text-sm font-medium">Search links</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 'auto' }}
        exit={{ opacity: 0, width: 0 }}
        className={cn('relative flex items-center', className)}
      >
        <div className="relative flex items-center w-full max-w-[90vw] sm:w-80">
          <Search className="absolute left-3 w-4 h-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn(
              'w-full pl-10 pr-10 py-2.5 sm:py-2.5 rounded-xl',
              'bg-gradient-to-br from-white/80 via-white/90 to-blue-50/80 dark:from-neutral-900/80 dark:via-neutral-800/80 dark:to-blue-950/70',
              'backdrop-blur-lg border border-neutral-200/50 dark:border-neutral-800/50',
              'text-neutral-900 dark:text-neutral-100',
              'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
              'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300/50 dark:focus:border-blue-700/50',
              'shadow-sm hover:shadow-md transition-all duration-300',
              'text-sm sm:text-base'
            )}
            autoFocus
          />
          {query && (
            <button
              onClick={() => {
                setQuery('')
                onSearch('')
              }}
              className="absolute right-3 p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-ring"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

