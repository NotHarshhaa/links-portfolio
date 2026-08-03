'use client'

import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { ChevronRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { handleAnchorClick } from '@/lib/scroll-utils'
import { HoverMark } from '@/components/hover-mark'

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
        <div className="relative flex h-12 items-center justify-between overflow-visible border border-border bg-background/90 px-4 sm:h-14 sm:px-5">
          <Corners />

          <Link
            href="/"
            className="relative z-10 text-sm font-semibold tracking-[0.18em] uppercase"
            aria-label="Home"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Harshhaa
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navItems.map((item) => (
              <HoverMark key={item.href} className="px-2.5 py-1.5">
                <a
                  href={item.href}
                  onClick={(e) => {
                    handleAnchorClick(e, item.href)
                  }}
                  className="text-xs font-medium tracking-wide text-muted-foreground transition-colors group-hover/mark:text-foreground"
                >
                  {item.label}
                </a>
              </HoverMark>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
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
            className="relative -mt-px overflow-visible border border-t-0 border-border bg-background/95 md:hidden"
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
                <HoverMark
                  as="li"
                  key={item.href}
                  label="Go"
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
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm text-muted-foreground transition-colors group-hover/mark:text-foreground"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </span>
                    <ChevronRight className="size-3.5 shrink-0 opacity-40 transition-transform group-hover/mark:translate-x-0.5" />
                  </a>
                </HoverMark>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
