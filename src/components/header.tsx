'use client'

import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { ChevronRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { handleAnchorClick } from '@/lib/scroll-utils'

const navItems = [
  { href: '#personal-network', label: 'Personal' },
  { href: '#community-network', label: 'Community' },
  { href: '#resources', label: 'Resources' }
]

function Corners() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-px -left-px z-10 size-2.5 border-t-2 border-l-2 border-foreground/45 sm:size-3"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-px -right-px z-10 size-2.5 border-t-2 border-r-2 border-foreground/45 sm:size-3"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px -left-px z-10 size-2.5 border-b-2 border-l-2 border-foreground/45 sm:size-3"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-px -bottom-px z-10 size-2.5 border-b-2 border-r-2 border-foreground/45 sm:size-3"
      />
    </>
  )
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="site-shell pt-3 sm:pt-4">
        <div className="relative flex h-12 items-center justify-between border border-border bg-background/90 px-4 sm:h-14 sm:px-5">
          <Corners />

          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.18em] uppercase"
            aria-label="Home"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Harshhaa
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleAnchorClick(e, item.href)
                }}
                className="text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            className="relative -mt-px border border-t-0 border-border bg-background/95 md:hidden"
            aria-label="Mobile"
          >
            <Corners />
            <div className="border-b border-border px-4 py-3">
              <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Navigate
              </span>
            </div>
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className={
                    index < navItems.length - 1
                      ? 'border-b border-border'
                      : undefined
                  }
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      handleAnchorClick(e, item.href)
                      setIsMobileMenuOpen(false)
                    }}
                    className={cn(
                      'group flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] tabular-nums tracking-wider text-muted-foreground/60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </span>
                    <ChevronRight className="size-3.5 shrink-0 opacity-40 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
