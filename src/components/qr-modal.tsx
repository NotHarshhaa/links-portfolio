'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Check, Copy, Download, QrCode, Sparkles, UserCheck, X } from 'lucide-react'
import { Frame, FrameBody, FrameHeader } from '@/components/frame'
import { useActiveModal } from '@/hooks/use-modals'
import { data } from '@/constants'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type TabType = 'qr' | 'badge'

export function QrModal() {
  const { activeModal, closeModal } = useActiveModal()
  const open = activeModal === 'qr'

  const [tab, setTab] = useState<TabType>('qr')
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [badgeQrUrl, setBadgeQrUrl] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const badgeRef = useRef<HTMLDivElement>(null)

  const targetUrl: string =
    typeof window !== 'undefined' && window.location?.href
      ? window.location.href
      : data.siteUrl || 'https://link.harshhaareddy.com'

  useEffect(() => {
    if (open) {
      // Generate clean QR code
      QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H'
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error(err))

      // Generate badge QR code (compact)
      QRCode.toDataURL(targetUrl, {
        width: 180,
        margin: 1,
        color: {
          dark: '#0a0a0a',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      })
        .then((url) => setBadgeQrUrl(url))
        .catch((err) => console.error(err))
    }
  }, [open, targetUrl])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable

      if ((e.key === 'q' || e.key === 'Q') && !isInput && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        if (open) closeModal()
        else {
          const { triggerModal } = require('@/hooks/use-modals')
          triggerModal('qr')
        }
      } else if (e.key === 'Escape' && open) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, closeModal])

  const downloadQr = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = `harshhaa-links-qr.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success('QR Code downloaded')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl)
      setCopied(true)
      toast.success('Link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy link')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label="QR Code and Conference Pass"
    >
      <Frame
        className="w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <FrameHeader label="Network Pass / QR Code">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground">
              Press Q or ESC
            </span>
            <button
              type="button"
              onClick={closeModal}
              className="flex items-center gap-1 border border-border bg-background px-2.5 py-1 font-mono text-[11px] font-bold text-foreground transition-colors hover:bg-muted active:scale-95 touch-manipulation"
              aria-label="Close modal"
            >
              <X className="size-3.5" />
              <span>CLOSE</span>
            </button>
          </div>
        </FrameHeader>

        <FrameBody className="space-y-4 p-4 sm:p-6">
          {/* Tab Switcher */}
          <div className="flex border border-border bg-muted/20 p-1">
            <button
              type="button"
              onClick={() => setTab('qr')}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 py-1.5 font-mono text-xs font-medium uppercase transition-all',
                tab === 'qr'
                  ? 'bg-foreground text-background shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <QrCode className="size-3.5" />
              Quick QR
            </button>
            <button
              type="button"
              onClick={() => setTab('badge')}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 py-1.5 font-mono text-xs font-medium uppercase transition-all',
                tab === 'badge'
                  ? 'bg-foreground text-background shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <UserCheck className="size-3.5" />
              Conference Pass
            </button>
          </div>

          {/* Tab 1: Clean QR View */}
          {tab === 'qr' && (
            <div className="flex flex-col items-center space-y-4 py-2">
              <div className="relative rounded-none border-2 border-foreground/30 bg-white p-3 shadow-lg">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`QR code for ${targetUrl}`}
                    className="size-56 object-contain"
                  />
                ) : (
                  <div className="size-56 animate-pulse bg-muted/40" />
                )}
                {/* Center logo pill */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border-2 border-white bg-black px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-md">
                    HR
                  </div>
                </div>
              </div>

              <div className="w-full text-center">
                <p className="font-mono text-xs text-muted-foreground truncate px-4">
                  {targetUrl}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  Scan with any camera to instantly access links and socials.
                </p>
              </div>

              <div className="flex w-full gap-2 pt-1">
                <Button variant="outline" className="flex-1 gap-1.5 font-mono text-xs" onClick={copyLink}>
                  {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  {copied ? 'Copied' : 'Copy Link'}
                </Button>
                <Button variant="default" className="flex-1 gap-1.5 font-mono text-xs" onClick={downloadQr}>
                  <Download className="size-3.5" />
                  Download PNG
                </Button>
              </div>
            </div>
          )}

          {/* Tab 2: Conference Lanyard Badge View */}
          {tab === 'badge' && (
            <div className="flex flex-col items-center space-y-4">
              <div
                ref={badgeRef}
                className="relative w-full overflow-hidden border-2 border-foreground/30 bg-gradient-to-b from-background via-muted/30 to-background p-5 shadow-xl"
              >
                {/* Lanyard Hole cutout visual */}
                <div className="mx-auto mb-4 h-2.5 w-14 rounded-full border border-foreground/40 bg-foreground/10" />

                {/* Badge Header */}
                <div className="flex items-center justify-between border-b border-border/80 pb-3">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    DEVOPS & AI DELEGATE
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">PASS #HR-2026</span>
                </div>

                {/* Attendee Profile Section */}
                <div className="mt-4 flex items-center gap-4">
                  <div className="relative size-16 shrink-0 border border-border">
                    <img
                      src={data.avatar}
                      alt={data.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground truncate">
                      {data.name}
                    </h3>
                    <p className="font-mono text-xs font-medium text-emerald-500 truncate">
                      Platform & AI Infrastructure
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground truncate">
                      {data.location}
                    </p>
                  </div>
                </div>

                {/* Badge Bottom Section with QR */}
                <div className="mt-5 flex items-end justify-between border-t border-border/80 pt-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase text-muted-foreground">
                      <Sparkles className="size-2.5 text-amber-500" />
                      Verified Profile
                    </span>
                    <p className="font-mono text-[10px] text-muted-foreground/90">
                      link.harshhaareddy.com
                    </p>
                  </div>

                  <div className="border border-border bg-white p-1 shadow-sm">
                    {badgeQrUrl ? (
                      <img
                        src={badgeQrUrl}
                        alt="Badge QR"
                        className="size-16 object-contain"
                      />
                    ) : (
                      <div className="size-16 animate-pulse bg-muted" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex w-full gap-2">
                <Button variant="outline" className="flex-1 gap-1.5 font-mono text-xs" onClick={downloadQr}>
                  <Download className="size-3.5" />
                  Save QR Pass
                </Button>
                <Button variant="default" className="flex-1 gap-1.5 font-mono text-xs" onClick={copyLink}>
                  <Copy className="size-3.5" />
                  Share URL
                </Button>
              </div>
            </div>
          )}
        </FrameBody>
      </Frame>
    </div>
  )
}
