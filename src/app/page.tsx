'use client'

import { useMemo, useState, useEffect } from 'react'
import { ArrowUpRight, FileDown } from 'lucide-react'
import { ButtonLink } from '@/components/button-link'
import { CardLink } from '@/components/card-link'
import { SearchBar } from '@/components/search-bar'
import { useLinkTracker } from '@/hooks/use-link-tracker'
import { useFavorites } from '@/hooks/use-favorites'
import { BracketTitle, Frame, FrameBody, FrameHeader } from '@/components/frame'
import { QuickActions } from '@/components/quick-actions'
import { ViewsBadge } from '@/components/views-badge'
import { FlipWords } from '@/components/flip-words'
import { DotBanner } from '@/components/dot-banner'
import { StripedBox } from '@/components/striped-box'
import { VerifiedBadge } from '@/components/verified-badge'
import { Reveal } from '@/components/ui/reveal'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import { IdentityCard } from '@/components/home/identity-card'
import { AboutSection } from '@/components/home/about-section'
import { FocusSection } from '@/components/home/focus-section'
import { ConnectSection } from '@/components/home/connect-section'
import { LearningHub } from '@/components/home/learning-hub'
import { getAllLinks, getFeaturedLinks } from '@/lib/links'
import { data } from '@/constants'
import { IMPACT_STATS, SPECIALTIES } from '@/data/personal'
import { cn } from '@/lib/utils'
import type { Links } from '@/types'

type FilterId = 'all' | 'socials' | 'communities' | 'resources'

const roles = [
  'Platform Engineer',
  'AI Infrastructure',
  'Agentic Systems',
  'DevOps & Cloud'
]

const filters: Array<{ id: FilterId; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'socials', label: 'Personal' },
  { id: 'communities', label: 'Community' },
  { id: 'resources', label: 'Resources' }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterId>('all')
  const [globalCounts, setGlobalCounts] = useState<Record<string, number>>({})
  const { trackClick, recentVisits, visits } = useLinkTracker()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const allLinks = useMemo(() => getAllLinks(), [])

  useEffect(() => {
    let active = true
    fetch('/api/stats')
      .then((res) => res.json())
      .then((body: { configured?: boolean; top?: Array<{ url: string; count: number }> }) => {
        if (!active || !body?.configured || !Array.isArray(body.top)) return
        setGlobalCounts(
          Object.fromEntries(body.top.map((item) => [item.url, item.count]))
        )
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  // Global counts win when present (they include everyone); local counts are
  // the fallback so the site still shows useful numbers without analytics KV.
  const visitCounts = useMemo(() => {
    const merged: Record<string, number> = { ...globalCounts }
    for (const visit of visits) {
      if (merged[visit.url] === undefined) merged[visit.url] = visit.count
    }
    return merged
  }, [visits, globalCounts])

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    const match = (item: { title: string; url: string; description?: string }) =>
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)

    return {
      contacts: data.contacts.filter(match),
      socials: data.socials.filter(match),
      communities: data.communities.filter(match),
      resources: data.resources.filter(match)
    }
  }, [searchQuery])

  const catalogByUrl = useMemo(
    () => Object.fromEntries(allLinks.map((item) => [item.url, item])),
    [allLinks]
  )

  const favoriteItems = favorites
    .map((url) => catalogByUrl[url])
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .filter((item) => {
      const query = searchQuery.toLowerCase().trim()
      if (!query) return true
      return (
        item.title.toLowerCase().includes(query) ||
        item.url.toLowerCase().includes(query)
      )
    })

  const featuredItems = getFeaturedLinks().filter((item) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true
    return (
      item.title.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    )
  })

  const recentItems = recentVisits
    .map((visit) => catalogByUrl[visit.url])
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .filter(
      (item) =>
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const show = (section: FilterId) => filter === 'all' || filter === section
  const totalVisible =
    filteredData.socials.length +
    filteredData.communities.length +
    filteredData.resources.length

  const resume = data.contacts.find((c) => c.title.toLowerCase() === 'resume')

  return (
    <div className="site-shell relative pt-20 pb-8 sm:pt-24">
      <div className="flex w-full flex-col gap-4 sm:gap-5">
        <DotBanner />

        {/* Blueprint Hero Section */}
        <div className="flex flex-col">
          {/* Blueprint banner strip */}
          <div className="bg-dot-grid border-border bg-background relative flex h-20 w-full shrink-0 items-center justify-center overflow-hidden border sm:h-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/70"
            />
            <span className="absolute top-2 left-3 hidden font-mono text-[9px] tracking-[0.16em] text-muted-foreground/40 uppercase sm:inline">
              sys / links-hub
            </span>
            <span className="absolute top-2 right-3 hidden font-mono text-[9px] tracking-[0.16em] text-muted-foreground/40 uppercase sm:inline">
              rev 2026.10
            </span>
            <span
              aria-hidden
              className="font-mono absolute bottom-1.5 left-3 hidden text-[10px] tracking-[0.14em] text-muted-foreground/50 sm:inline"
            >
              {'// harshhaa.pipeline'}
            </span>
            <span
              aria-hidden
              className="font-mono absolute right-3 bottom-1.5 hidden text-[10px] tracking-[0.14em] text-muted-foreground/50 sm:inline"
            >
              status: operational
            </span>
            <div className="relative z-10 flex items-center gap-2 px-4 py-1.5 font-mono text-xs text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-semibold text-foreground tracking-wide uppercase text-[11px]">
                Platform & AI Infrastructure Hub
              </span>
            </div>
          </div>

          <Frame className="border-t-0">
            <FrameHeader label="Links / Hub">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <ViewsBadge />
              </div>
            </FrameHeader>

            <FrameBody className="p-0">
              <div className="grid lg:grid-cols-[1.4fr_0.6fr]">
                {/* Hero Main Content */}
                <div className="p-5 sm:p-7 lg:p-8 space-y-6">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/5 px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                        </span>
                        available for work
                      </span>
                      {data.availability && (
                        <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 font-mono text-[9px] tracking-wide uppercase">
                          <span className="size-1.5 bg-foreground" aria-hidden />
                          <AnimatedShinyText>{data.availability}</AnimatedShinyText>
                        </span>
                      )}
                      <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground/60 uppercase">
                        Hyderabad, IN · UTC+5:30
                      </span>
                    </div>

                    <h1 className="font-heading flex items-center gap-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
                      <BracketTitle>{data.name}</BracketTitle>
                      <VerifiedBadge className="size-5 shrink-0 sm:size-6" />
                    </h1>

                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="font-mono text-sm text-muted-foreground/40">/</span>
                      <div className="font-heading text-xl font-medium tracking-tight text-muted-foreground sm:text-2xl">
                        <FlipWords words={roles} />
                      </div>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {data.about}
                    </p>

                    {/* Specialties Pills */}
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {SPECIALTIES.map((item) => (
                        <li
                          key={item}
                          className="border border-border/80 px-2 py-1 font-mono text-[9px] tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:border-foreground/40 hover:text-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {data.contacts.map((contact) => (
                      <ButtonLink key={contact.url} {...contact} />
                    ))}
                  </div>

                  <QuickActions />

                  {/* Impact Stats Grid */}
                  <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
                    {IMPACT_STATS.map((stat) => (
                      <div
                        key={stat.label}
                        className="group bg-background px-3 py-3 transition-colors hover:bg-muted/20"
                      >
                        <p className="font-heading text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                          {stat.value}
                        </p>
                        <p className="mt-0.5 font-mono text-[8px] leading-snug tracking-[0.1em] text-muted-foreground uppercase">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operator Passport Identity Card */}
                <div className="relative border-t border-border p-5 sm:p-7 lg:border-t-0 lg:border-l lg:p-6">
                  <div className="sticky top-24 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                        Operator Profile
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground/50 uppercase">
                        live
                      </span>
                    </div>

                    <IdentityCard
                      avatar={data.avatar}
                      initials={data.initials}
                      name={data.name}
                      role="Platform & AI Infrastructure"
                    />

                    {resume && (
                      <a
                        href={resume.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border border-border px-3 py-2.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:border-foreground/40 hover:text-foreground"
                      >
                        <span className="inline-flex items-center gap-2">
                          <FileDown className="size-3.5" />
                          Download resume
                        </span>
                        <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="space-y-4 border-t border-border p-5 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <SearchBar onSearch={setSearchQuery} />
                  <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
                    {totalVisible} links · {favorites.length} saved
                  </p>
                </div>
                <div
                  className="flex flex-wrap gap-1.5"
                  role="tablist"
                  aria-label="Filter sections"
                >
                  {filters.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={filter === item.id}
                      onClick={() => setFilter(item.id)}
                      className={cn(
                        'border px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors',
                        filter === item.id
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </FrameBody>
          </Frame>
        </div>

        <StripedBox />

        {/* Favorite items */}
        {filter === 'all' && favoriteItems.length > 0 && (
          <LinkSection
            id="favorites"
            label="Favorites"
            items={favoriteItems}
            trackClick={trackClick}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            visitCounts={visitCounts}
          />
        )}

        {/* Recent items */}
        {filter === 'all' && !searchQuery && recentItems.length > 0 && (
          <LinkSection
            id="recent"
            label="Recently visited"
            items={recentItems}
            trackClick={trackClick}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            visitCounts={visitCounts}
          />
        )}

        {/* Featured items */}
        {filter === 'all' && featuredItems.length > 0 && (
          <LinkSection
            id="featured"
            label="Featured"
            items={featuredItems}
            trackClick={trackClick}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            visitCounts={visitCounts}
          />
        )}

        {/* Home Sections from commit b56fc1f */}
        {filter === 'all' && !searchQuery && (
          <>
            <ConnectSection />
            <FocusSection />
            <AboutSection />
            <LearningHub />
          </>
        )}

        <StripedBox />

        {/* Personal Network Section */}
        {show('socials') && (
          <LinkSection
            id="personal-network"
            label="Personal Network"
            items={filteredData.socials}
            trackClick={trackClick}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            visitCounts={visitCounts}
          />
        )}

        <StripedBox />

        {/* Community Network Section */}
        {show('communities') && (
          <LinkSection
            id="community-network"
            label="Community Network"
            items={filteredData.communities}
            trackClick={trackClick}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            visitCounts={visitCounts}
          />
        )}

        <StripedBox />

        {/* Resources Section */}
        {show('resources') && (
          <LinkSection
            id="resources"
            label="Resources & Docs"
            items={filteredData.resources}
            trackClick={trackClick}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            visitCounts={visitCounts}
          />
        )}
      </div>
    </div>
  )
}

function LinkSection({
  id,
  label,
  items,
  trackClick,
  isFavorite,
  onToggleFavorite,
  visitCounts
}: {
  id: string
  label: string
  items: Links[]
  trackClick: (url: string, title: string) => void
  isFavorite: (url: string) => boolean
  onToggleFavorite: (url: string) => void
  visitCounts: Record<string, number>
}) {
  return (
    <Reveal className="w-full">
      <Frame id={id} className="scroll-mt-28 overflow-visible">
        <FrameHeader label={label}>
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            {items.length}
          </span>
        </FrameHeader>
        {items.length === 0 ? (
          <FrameBody>
            <p className="text-sm text-muted-foreground">
              No links match your search.
            </p>
          </FrameBody>
        ) : (
          <ul>
            {items.map((item, index) => (
              <CardLink
                key={`${id}-${item.url}`}
                {...item}
                isLast={index === items.length - 1}
                isFavorite={isFavorite(item.url)}
                onToggleFavorite={() => onToggleFavorite(item.url)}
                visits={visitCounts[item.url]}
                onTrackClick={() => {
                  trackClick(item.url, item.title)
                }}
              />
            ))}
          </ul>
        )}
      </Frame>
    </Reveal>
  )
}
