'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { data } from '@/constants'
import { getAllLinks, getCategoryLabel } from '@/lib/links'
import { cn } from '@/lib/utils'
import { Frame, FrameBody, FrameHeader } from '@/components/frame'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const links = useMemo(() => getAllLinks(), [])

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return links
    return links.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        getCategoryLabel(item.category).toLowerCase().includes(q)
    )
  }, [links, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((value) => !value)
        return
      }

      if (e.key === 'Escape') {
        setOpen(false)
        return
      }

      if (!open && !typing && e.key === '/') {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActive(0)
      return
    }
    const id = window.setTimeout(() => inputRef.current?.focus(), 20)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-background/70 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <Frame
        className="w-full max-w-xl overflow-hidden shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <FrameHeader label="Jump to link">
          <kbd className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </FrameHeader>
        <div className="relative border-b border-border">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((i) => Math.max(i - 1, 0))
              } else if (e.key === 'Enter') {
                const selected = results[active]
                if (!selected) return
                e.preventDefault()
                openLink(selected.url)
              }
            }}
            placeholder={`Search ${data.name}'s links...`}
            className="h-12 w-full bg-transparent pr-4 pl-11 text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Filter links"
          />
        </div>
        <FrameBody className="max-h-[50vh] overflow-y-auto p-0 sm:p-0">
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No matches.
            </p>
          ) : (
            <ul>
              {results.map((item, index) => (
                <li key={item.url}>
                  <button
                    type="button"
                    onClick={() => openLink(item.url)}
                    onMouseEnter={() => setActive(index)}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 border-b border-border px-4 py-3 text-left last:border-b-0',
                      index === active && 'bg-muted'
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[11px] text-muted-foreground">
                        {getCategoryLabel(item.category)} ·{' '}
                        {item.url.replace(/^https?:\/\//, '')}
                      </span>
                    </span>
                    <ArrowUpRight className="size-3.5 shrink-0 opacity-40" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </FrameBody>
      </Frame>
    </div>
  )
}
