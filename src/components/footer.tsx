'use client'

import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BracketTitle, Frame, FrameBody } from '@/components/frame'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-shell pb-8 sm:pb-10">
      <Frame>
        <FrameBody className="flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center sm:py-6">
          <div className="space-y-1">
            <p className="text-sm font-medium tracking-[0.14em] uppercase">
              <BracketTitle>Harshhaa</BracketTitle>
            </p>
            <p className="text-xs text-muted-foreground">
              © {year} · Platform Engineer · Hyderabad
            </p>
            <p className="hidden text-[11px] text-muted-foreground/80 sm:block">
              Press{' '}
              <kbd className="border border-border px-1 py-0.5 font-mono text-[10px]">
                ?
              </kbd>{' '}
              for shortcuts ·{' '}
              <kbd className="border border-border px-1 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>{' '}
              to jump
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://github.com/NotHarshhaa"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </FrameBody>
      </Frame>
    </footer>
  )
}
