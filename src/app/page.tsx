'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ButtonLink } from '@/components/button-link'
import { CardLink } from '@/components/card-link'
import { data } from '@/constants'
import TypingRole from '@/components/TypingRole'
import { useMemo, useState } from 'react'
import { SearchBar } from '@/components/search-bar'
import { useLinkTracker } from '@/hooks/use-link-tracker'
import { useFavorites } from '@/hooks/use-favorites'
import { BracketTitle, Frame, FrameBody, FrameHeader } from '@/components/frame'
import { LocalTime } from '@/components/local-time'
import { QuickActions } from '@/components/quick-actions'
import { getAllLinks, getFeaturedLinks } from '@/lib/links'
import { cn } from '@/lib/utils'
import type { Links } from '@/types'

type FilterId = 'all' | 'socials' | 'communities' | 'resources'

const filters: Array<{ id: FilterId; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'socials', label: 'Personal' },
  { id: 'communities', label: 'Community' },
  { id: 'resources', label: 'Resources' }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterId>('all')
  const { trackClick, recentVisits, visits } = useLinkTracker()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const allLinks = useMemo(() => getAllLinks(), [])
  const visitCounts = useMemo(
    () => Object.fromEntries(visits.map((item) => [item.url, item.count])),
    [visits]
  )

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

  return (
    <div className="site-shell relative pt-24 pb-8 sm:pt-28">
      <div className="flex w-full flex-col gap-4">
        <Frame>
          <FrameHeader label="Links / Hub">
            <LocalTime
              timezone={data.timezone}
              location={data.location?.split(',')[0]}
            />
          </FrameHeader>
          <FrameBody className="py-8 sm:py-10">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
              <a
                href="https://github.com/NotHarshhaa"
                target="_blank"
                rel="noopener noreferrer"
                className="order-1 shrink-0 focus:outline-none sm:order-2"
                aria-label={`View ${data.name}'s GitHub profile`}
              >
                <span className="relative block">
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
                  <Avatar className="size-24 rounded-none border border-border after:rounded-none sm:size-32">
                    <AvatarImage
                      alt={data.name}
                      src={data.avatar}
                      className="rounded-none object-cover"
                    />
                    <AvatarFallback className="rounded-none font-mono">
                      {data.initials}
                    </AvatarFallback>
                  </Avatar>
                </span>
              </a>

              <div className="order-2 w-full flex-1 space-y-4 text-center sm:order-1 sm:text-left">
                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    {data.availability && (
                      <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                        <span className="size-1.5 bg-foreground" aria-hidden />
                        {data.availability}
                      </span>
                    )}
                    {data.now && (
                      <span className="inline-flex border border-border px-2 py-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                        Now · {data.now}
                      </span>
                    )}
                  </div>
                  <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
                    <BracketTitle>{data.name}</BracketTitle>
                  </h1>
                  <div className="mt-2 flex justify-center sm:justify-start">
                    <TypingRole />
                  </div>
                  <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mx-0 sm:text-base">
                    {data.about}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 pt-1 sm:justify-start">
                  {data.contacts.map((contact) => (
                    <ButtonLink key={contact.url} {...contact} />
                  ))}
                </div>

                <QuickActions />
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-border pt-6">
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
                      'border px-3 py-1.5 text-xs font-medium tracking-wide uppercase',
                      filter === item.id
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </FrameBody>
        </Frame>

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

        {show('resources') && (
          <LinkSection
            id="resources"
            label="Resources"
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
  )
}
