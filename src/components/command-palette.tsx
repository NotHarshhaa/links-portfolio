'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Search, Terminal, QrCode, Activity } from 'lucide-react'
import { data } from '@/constants'
import { getAllLinks, getCategoryLabel } from '@/lib/links'
import { cn } from '@/lib/utils'
import { Frame, FrameBody, FrameHeader } from '@/components/frame'
import { triggerModal } from '@/hooks/use-modals'

interface PaletteItem {
  id: string
  title: string
  url?: string
  description?: string
  categoryLabel: string
  action?: () => void
  icon?: React.ComponentType<{ className?: string }>
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const links = useMemo(() => getAllLinks(), [])

  const actions: PaletteItem[] = useMemo(
    () => [
      {
        id: 'action-terminal',
        title: 'Open Edge Terminal',
        description: 'Interactive CLI shell with whoami, skills, ping, matrix',
        categoryLabel: 'System',
        icon: Terminal,
        action: () => triggerModal('terminal')
      },
      {
        id: 'action-qr',
        title: 'QR Code & Conference Pass',
        description: 'Show printable QR code and digital attendee badge',
        categoryLabel: 'Networking',
        icon: QrCode,
        action: () => triggerModal('qr')
      },
      {
        id: 'action-telemetry',
        title: 'Edge Telemetry & Subdomain Status',
        description: 'Live latency ping and subdomains health monitor',
        categoryLabel: 'DevOps',
        icon: Activity,
        action: () => triggerModal('telemetry')
      }
    ],
    []
  )

  const results: PaletteItem[] = useMemo(() => {
    const q = query.toLowerCase().trim()
    const linkItems: PaletteItem[] = links.map((l, index) => ({
      id: `${l.category}-${l.url}-${index}`,
      title: l.title,
      url: l.url,
      description: l.description,
      categoryLabel: getCategoryLabel(l.category)
    }))

    const combined = [...actions, ...linkItems]
    if (!q) return combined

    return combined.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.url && item.url.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q)
    )
  }, [actions, links, query])

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

  const handleSelect = (item: PaletteItem) => {
    setOpen(false)
    if (item.action) {
      item.action()
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
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
        <FrameHeader label="Jump to link or tool">
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
                handleSelect(selected)
              }
            }}
            placeholder={`Search ${data.name}'s links or actions (terminal, qr, status)...`}
            className="h-12 w-full bg-transparent pr-4 pl-11 text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Filter links and tools"
          />
        </div>
        <FrameBody className="max-h-[50vh] overflow-y-auto p-0 sm:p-0">
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No matches.
            </p>
          ) : (
            <ul>
              {results.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActive(index)}
                      className={cn(
                        'flex w-full items-center justify-between gap-3 border-b border-border px-4 py-3 text-left last:border-b-0',
                        index === active && 'bg-muted'
                      )}
                    >
                      <span className="min-w-0 flex items-center gap-3">
                        {IconComponent && (
                          <span className="flex size-7 shrink-0 items-center justify-center border border-border bg-background/80">
                            <IconComponent className="size-3.5 text-foreground" />
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-[11px] text-muted-foreground">
                            {item.categoryLabel}
                            {item.url ? ` · ${item.url.replace(/^https?:\/\//, '')}` : item.description ? ` · ${item.description}` : ''}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight className="size-3.5 shrink-0 opacity-40" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </FrameBody>
      </Frame>
    </div>
  )
}
