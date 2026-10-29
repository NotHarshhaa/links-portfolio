'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useCallback } from 'react'
import {
  ChevronRight,
  Menu,
  QrCode,
  Share2,
  Terminal,
  X,
  Search,
  Sun,
  Moon
} from 'lucide-react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { sharePage } from '@/lib/links'
import { handleAnchorClick } from '@/lib/scroll-utils'
import { HoverMark } from '@/components/hover-mark'
import { BracketTitle, Corners } from '@/components/frame'
import { TelemetryBadge } from '@/components/telemetry-badge'
import { triggerModal } from '@/hooks/use-modals'
import { cn } from '@/lib/utils'
import { data } from '@/constants'

const navItems = [
  { href: '#featured', label: 'Featured' },
  { href: '#personal-network', label: 'Personal' },
  { href: '#community-network', label: 'Community' },
  { href: '#resources', label: 'Resources' },
  { href: '#about', label: 'About' }
]

/** Compact light/dark switch. Icons swap via the `dark` class to avoid hydration mismatch. */
function ThemeCycleButton() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="inline-flex size-9 items-center justify-center text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  )
}

export function Header() {
  const { scrollYProgress } = useScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll on mobile sheet open
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Escape key closes mobile sheet
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const openPalette = () => {
    closeMobileMenu()
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
    )
  }

  return (
    <header className="site-header fixed top-0 right-0 left-0 z-50 pointer-events-none">
      <div className="site-shell pt-3 sm:pt-4 pointer-events-auto">
        <div
          className={cn(
            'relative flex h-12 items-center justify-between overflow-hidden border border-border px-4 transition-[background-color,box-shadow] duration-300 sm:h-14 sm:px-5',
            scrolled
              ? 'bg-background/90 shadow-[0_12px_32px_-20px_oklch(0_0_0/0.4)] backdrop-blur-md'
              : 'bg-background/80 backdrop-blur-sm'
          )}
        >
          <Corners />

          <Link
            href="/"
            className="relative z-10 text-sm font-semibold tracking-[0.18em] uppercase"
            aria-label="Home"
            onClick={closeMobileMenu}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Harshhaa logo"
                width={32}
                height={32}
                priority
                className="block size-7 shrink-0 object-contain sm:size-8"
              />
              <BracketTitle>Harshhaa</BracketTitle>
            </span>
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

          <div className="relative z-10 flex items-center gap-1 sm:gap-1.5">
            <TelemetryBadge className="hidden sm:flex" />

            <Button
              variant="ghost"
              size="icon"
              className="size-8 sm:size-9"
              onClick={openPalette}
              aria-label="Open Command Palette"
              title="Command Palette (⌘K)"
            >
              <Search className="size-3.5 sm:size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 sm:size-9"
              onClick={() => triggerModal('terminal')}
              aria-label="Open terminal"
              title="Open Terminal (`)"
            >
              <Terminal className="size-3.5 sm:size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 sm:size-9"
              onClick={() => triggerModal('qr')}
              aria-label="Show QR Pass"
              title="QR Pass (Q)"
            >
              <QrCode className="size-3.5 sm:size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 sm:size-9"
              onClick={async () => {
                try {
                  const result = await sharePage()
                  if (result === 'copied') toast.success('Page link copied')
                } catch (error) {
                  if (error instanceof Error && error.name === 'AbortError') return
                  toast.error('Could not share page')
                }
              }}
              aria-label="Share this page"
              title="Share"
            >
              <Share2 className="size-3.5 sm:size-4" />
            </Button>

            <ThemeCycleButton />

            <Button
              variant="ghost"
              size="icon"
              className="size-8 sm:size-9 md:hidden"
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

          {/* Scroll progress bar attached to header's bottom border */}
          <motion.div
            className="bg-signal absolute inset-x-0 bottom-0 h-0.5 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative -mt-px overflow-hidden border border-t-0 border-border bg-background shadow-2xl backdrop-blur-md md:hidden"
              aria-label="Mobile Navigation"
            >
              <Corners />
              <div className="flex items-center justify-between border-b border-border bg-muted/20 px-4 py-2.5">
                <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  Navigate
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  {navItems.length} sections
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
                        closeMobileMenu()
                      }}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-muted-foreground transition-colors group-hover/mark:text-foreground"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[10px] tracking-wider text-muted-foreground/50 tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {item.label}
                      </span>
                      <ChevronRight className="size-3.5 shrink-0 opacity-40 transition-transform group-hover/mark:translate-x-0.5" />
                    </a>
                  </HoverMark>
                ))}
              </ul>

              <div className="border-t border-border bg-muted/10 p-3">
                <div className="flex flex-col gap-2">
                  <div className="px-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    Platform Tools
                  </div>

                  <button
                    type="button"
                    onClick={openPalette}
                    className="flex w-full items-center justify-between border border-border bg-background px-3 py-2 text-left font-mono text-xs transition-colors hover:bg-muted/40 active:bg-muted/60"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="size-3.5 text-foreground/70" />
                      <span className="font-medium text-foreground">Command Palette</span>
                    </div>
                    <kbd className="border border-border/80 bg-muted px-1.5 py-0.5 text-[10px] font-semibold">
                      ⌘K
                    </kbd>
                  </button>

                  <div className="grid grid-cols-3 gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-mono text-[11px] gap-1 px-2"
                      onClick={() => {
                        triggerModal('terminal')
                        closeMobileMenu()
                      }}
                    >
                      <Terminal className="size-3" />
                      CLI
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-mono text-[11px] gap-1 px-2"
                      onClick={() => {
                        triggerModal('qr')
                        closeMobileMenu()
                      }}
                    >
                      <QrCode className="size-3" />
                      QR Pass
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-mono text-[11px] gap-1 px-2"
                      onClick={() => {
                        triggerModal('telemetry')
                        closeMobileMenu()
                      }}
                    >
                      <span className="size-1.5 rounded-full bg-emerald-500 inline-block mr-0.5" />
                      Status
                    </Button>
                  </div>

                  <div className="grid grid-cols-4 border border-border bg-background mt-1">
                    {data.contacts.slice(0, 4).map(({ title, url, icon: Icon }) => (
                      <a
                        key={title}
                        href={url}
                        target={url.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={title}
                        title={title}
                        className="flex items-center justify-center border-r border-border py-2.5 text-muted-foreground transition-colors last:border-r-0 hover:bg-muted/40 hover:text-foreground"
                      >
                        <Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
