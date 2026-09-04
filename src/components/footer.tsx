'use client'

import { ArrowUp, Activity, QrCode, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BracketTitle, Frame, FrameBody } from '@/components/frame'
import { triggerModal } from '@/hooks/use-modals'

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
                `
              </kbd>{' '}
              terminal ·{' '}
              <kbd className="border border-border px-1 py-0.5 font-mono text-[10px]">
                Q
              </kbd>{' '}
              pass ·{' '}
              <kbd className="border border-border px-1 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>{' '}
              jump
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 font-mono text-xs"
              onClick={() => triggerModal('telemetry')}
            >
              <Activity className="size-3.5 text-emerald-500" />
              <span className="hidden sm:inline">Telemetry</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 font-mono text-xs"
              onClick={() => triggerModal('terminal')}
            >
              <Terminal className="size-3.5" />
              <span className="hidden sm:inline">CLI</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 font-mono text-xs"
              onClick={() => triggerModal('qr')}
            >
              <QrCode className="size-3.5" />
              <span className="hidden sm:inline">QR Pass</span>
            </Button>
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
