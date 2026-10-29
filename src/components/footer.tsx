'use client'

import { ArrowUp, ArrowUpRight, ChevronRight, Mail, MapPin } from 'lucide-react'
import { data } from '@/constants'
import { Frame } from '@/components/frame'
import { Clock } from '@/components/ui/clock'
import { RotatingText } from '@/components/rotating-text'
import { StripedBox } from '@/components/striped-box'
import { triggerModal } from '@/hooks/use-modals'

const footerStatusLines = [
  'Open to new opportunities — let’s talk.',
  'Building platforms & agentic systems.',
  'DevOps · Cloud · AI Infrastructure.',
  'Thanks for scrolling this far.'
]

const navItems = [
  { title: 'Featured Links', url: '#featured' },
  { title: 'Personal Network', url: '#personal-network' },
  { title: 'Community & Groups', url: '#community-network' },
  { title: 'Learning Resources', url: '#resources' },
  { title: 'Engineering Profile', url: '#about' }
]

export function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const elsewhereLinks = [
    ...data.contacts.slice(0, 3),
    ...data.socials.slice(0, 3)
  ]

  return (
    <footer className="site-shell mt-auto w-full pt-10 pb-8 sm:pt-14">
      <StripedBox className="mb-4" />

      <Frame className="overflow-hidden">
        {/* Contact CTA */}
        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-10 lg:p-7">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] tracking-[0.18em] uppercase">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <span aria-hidden className="size-1.5 bg-signal" />
                contact.channel
              </span>
              <span className="hidden text-muted-foreground/40 sm:inline">/</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                open to work
              </span>
            </div>

            <h2 className="mt-3 max-w-xl font-heading text-2xl font-medium tracking-tight text-balance sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]">
              Have a platform to scale or an agent to ship?
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              I build developer platforms, production AI infrastructure, and agentic
              systems. Let&apos;s talk about what you&apos;re taking to production next.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="mailto:harshhaa03@gmail.com"
                className="group inline-flex items-center gap-2 bg-foreground px-3.5 py-2 font-mono text-[11px] font-semibold tracking-[0.12em] text-background uppercase transition-opacity hover:opacity-90"
              >
                <Mail className="size-3.5" />
                Email me
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://harshhaareddy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-border bg-background px-3.5 py-2 font-mono text-[11px] font-semibold tracking-[0.12em] text-foreground uppercase transition-colors hover:border-foreground/40 hover:bg-muted/40"
              >
                Personal Portfolio
                <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px self-stretch border border-border bg-border">
            <div className="bg-background p-3">
              <p className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground/70 uppercase">
                Local time
              </p>
              <p className="mt-1 flex items-baseline gap-1.5 font-mono text-sm font-semibold tabular-nums">
                <Clock />
                <span className="text-[9px] font-normal tracking-[0.12em] text-muted-foreground/60 uppercase">
                  IST
                </span>
              </p>
            </div>
            <div className="bg-background p-3">
              <p className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground/70 uppercase">
                Base
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-sm font-semibold">
                <MapPin className="size-3 text-muted-foreground/70" />
                HYD, IN
              </p>
            </div>
            <div className="bg-background p-3">
              <p className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground/70 uppercase">
                Availability
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Open to build
              </p>
            </div>
            <div className="bg-background p-3">
              <p className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground/70 uppercase">
                Response
              </p>
              <p className="mt-1 font-mono text-sm font-semibold tabular-nums">
                &lt; 24h
              </p>
            </div>
          </div>
        </div>

        {/* Directory */}
        <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-b border-border px-4 py-4 sm:border-r sm:border-b-0 sm:px-6 lg:border-b-0">
            <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Navigation
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-y-2">
              {navItems.map((link, index) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-[9px] text-muted-foreground/50 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-border px-4 py-4 sm:px-6 lg:border-r lg:border-b-0">
            <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Elsewhere
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {elsewhereLinks.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      target={item.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {Icon && (
                        <Icon className="size-3.5 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-foreground" />
                      )}
                      {item.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="px-4 py-4 sm:col-span-2 sm:border-t sm:border-border sm:px-6 lg:col-span-1 lg:border-t-0">
            <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              System
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
              <button
                type="button"
                onClick={() => triggerModal('telemetry')}
                className="flex items-center justify-between gap-2 text-left transition-colors hover:opacity-80"
              >
                <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground/70 uppercase">
                  Status
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  HEALTHY
                </span>
              </button>
              <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-2">
                <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground/70 uppercase">
                  Region
                </span>
                <span className="font-mono text-[11px] font-semibold text-foreground">BOM1</span>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-2">
                <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground/70 uppercase">
                  Runtime
                </span>
                <span className="font-mono text-[11px] font-semibold text-foreground">
                  Next.js 16
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-2">
                <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground/70 uppercase">
                  Stack
                </span>
                <span className="font-mono text-[11px] font-semibold text-foreground">
                  K8s · AWS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status ticker */}
        <div className="flex items-center gap-3 border-t border-border px-4 py-2 sm:px-6">
          <span className="hidden shrink-0 border border-border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-foreground uppercase sm:inline-flex">
            Status
          </span>
          <RotatingText
            texts={footerStatusLines}
            align="left"
            className="text-xs text-muted-foreground"
          />
        </div>

        {/* Baseline */}
        <div className="flex flex-col gap-2 border-t border-border bg-muted/10 px-4 py-3 font-mono text-[10px] tracking-[0.1em] text-muted-foreground/80 uppercase sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p suppressHydrationWarning>
            © {year} Harshhaa
            <span className="mx-2 text-border">·</span>
            <span className="text-muted-foreground/60">All systems nominal</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 tabular-nums">
              <Clock />
              <span className="text-muted-foreground/50">HYD</span>
            </span>
            <span className="text-border">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to top
              <ArrowUp className="size-3 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </Frame>
    </footer>
  )
}
