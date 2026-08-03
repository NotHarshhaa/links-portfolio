'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ButtonLink } from '@/components/button-link'
import { CardLink } from '@/components/card-link'
import { data } from '@/constants'
import TypingRole from '@/components/TypingRole'
import { useState, useMemo } from 'react'
import { SearchBar } from '@/components/search-bar'
import { useLinkTracker } from '@/hooks/use-link-tracker'
import { Frame, FrameBody, FrameHeader } from '@/components/frame'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { trackClick } = useLinkTracker()

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data

    const query = searchQuery.toLowerCase().trim()
    const match = (item: { title: string; url: string }) =>
      item.title.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query)

    return {
      ...data,
      contacts: data.contacts.filter(match),
      socials: data.socials.filter(match),
      communities: data.communities.filter(match),
      resources: data.resources.filter(match)
    }
  }, [searchQuery])

  return (
    <div className="site-shell relative pt-24 pb-8 sm:pt-28">
      <div className="flex w-full flex-col gap-4">
        <Frame>
          <FrameHeader label="Links / Hub">
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              All in one place
            </span>
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
              </a>

              <div className="order-2 w-full flex-1 space-y-4 text-center sm:order-1 sm:text-left">
                <div>
                  <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
                    {data.name}
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
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </FrameBody>
        </Frame>

        <LinkSection
          id="personal-network"
          label="Personal Network"
          items={filteredData.socials}
          trackClick={trackClick}
        />

        <LinkSection
          id="community-network"
          label="Community Network"
          items={filteredData.communities}
          trackClick={trackClick}
        />

        <LinkSection
          id="resources"
          label="Resources"
          items={filteredData.resources}
          trackClick={trackClick}
        />
      </div>
    </div>
  )
}

function LinkSection({
  id,
  label,
  items,
  trackClick
}: {
  id: string
  label: string
  items: Array<{
    title: string
    url: string
    icon: React.FC<React.SVGProps<SVGSVGElement>>
  }>
  trackClick: (url: string, title: string) => void
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
          <p className="text-sm text-muted-foreground">No links match your search.</p>
        </FrameBody>
      ) : (
        <ul>
          {items.map((item, index) => (
            <CardLink
              key={item.url}
              {...item}
              isLast={index === items.length - 1}
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
