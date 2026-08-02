'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  onSearch,
  placeholder = 'Search links...',
  className
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setQuery('')
        onSearch('')
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSearch])

  useEffect(() => {
    onSearch(query)
  }, [query, onSearch])

  return (
    <div className={cn('relative w-full max-w-md', className)}>
      <Search className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full border-0 border-b border-border bg-transparent pr-16 pl-7 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-foreground"
        aria-label="Search links"
      />
      <div className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-1">
        {query ? (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => {
              setQuery('')
              onSearch('')
            }}
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </Button>
        ) : (
          <kbd className="hidden border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            ⌘K
          </kbd>
        )}
      </div>
    </div>
  )
}
