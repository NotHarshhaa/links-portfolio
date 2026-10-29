'use client'

import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity
} from '@/components/ui/contribution-graph'
import { Frame, FrameBody, FrameHeader } from '@/components/frame'
import { Reveal } from '@/components/ui/reveal'
import { ArrowUpRight, Flame, CalendarDays, GitCommitHorizontal } from 'lucide-react'

const GITHUB_USERNAME = 'NotHarshhaa'
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`
const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de'

function computeStats(activities: Activity[]) {
  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date))
  const total = sorted.reduce((sum, activity) => sum + activity.count, 0)
  const activeDays = sorted.filter((activity) => activity.count > 0).length
  const bestDay = sorted.reduce(
    (best, activity) => (activity.count > best.count ? activity : best),
    { date: '', count: 0, level: 0 }
  )

  let currentStreak = 0
  const todayKey = format(new Date(), 'yyyy-MM-dd')
  let end = sorted.length - 1
  while (end >= 0 && sorted[end]!.date > todayKey) end--
  for (let i = end; i >= 0; i--) {
    if ((sorted[i]?.count ?? 0) > 0) currentStreak++
    else break
  }

  let bestStreak = 0
  let running = 0
  for (const activity of sorted) {
    if (activity.count > 0) {
      running++
      bestStreak = Math.max(bestStreak, running)
    } else {
      running = 0
    }
  }

  return { total, activeDays, bestDay, currentStreak, bestStreak }
}

function StatCell({
  icon: Icon,
  label,
  value,
  hint
}: {
  icon: typeof Flame
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <div className="group flex flex-col justify-between gap-3 bg-background p-3.5 transition-colors hover:bg-muted/20">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
          {label}
        </span>
        <Icon className="size-3.5 text-muted-foreground/50 transition-colors group-hover:text-emerald-500" />
      </div>
      <div>
        <p className="font-heading text-2xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
        {hint && (
          <p className="mt-0.5 font-mono text-[9px] text-muted-foreground/60">
            {hint}
          </p>
        )}
      </div>
    </div>
  )
}

export function GitHubActivity() {
  const [activities, setActivities] = useState<Activity[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const year = new Date().getFullYear()
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 10000)

        const res = await fetch(
          `${CONTRIBUTIONS_API}/v4/${GITHUB_USERNAME}?y=${year}`,
          { signal: controller.signal }
        )
        clearTimeout(timeout)

        if (!res.ok) throw new Error(`GitHub contributions API error: ${res.status}`)
        const data = await res.json()
        if (!cancelled) setActivities(data.contributions ?? [])
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const stats = useMemo(
    () => (activities && activities.length > 0 ? computeStats(activities) : null),
    [activities]
  )

  return (
    <Reveal>
      <Frame id="github-activity" className="scroll-mt-24">
        <FrameHeader label="GitHub Activity">
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            @{GITHUB_USERNAME}
            <ArrowUpRight className="size-3" />
          </a>
        </FrameHeader>

        {activities && activities.length > 0 && stats ? (
          <FrameBody className="p-0">
            <div className="grid lg:grid-cols-[15rem_1fr]">
              <div className="grid grid-cols-2 gap-px border-b border-border bg-border lg:border-r lg:border-b-0">
                <StatCell
                  icon={GitCommitHorizontal}
                  label="Contributions"
                  value={stats.total.toLocaleString('en')}
                  hint="current year"
                />
                <StatCell
                  icon={CalendarDays}
                  label="Active days"
                  value={stats.activeDays}
                  hint="days with code"
                />
                <StatCell
                  icon={Flame}
                  label="Current streak"
                  value={stats.currentStreak}
                  hint={`best: ${stats.bestStreak}d`}
                />
                <StatCell
                  icon={Flame}
                  label="Peak day"
                  value={stats.bestDay.count}
                  hint={
                    stats.bestDay.date
                      ? format(new Date(stats.bestDay.date), 'dd MMM')
                      : '—'
                  }
                />
              </div>

              <div className="flex flex-col justify-center gap-4 p-4 sm:p-6">
                <ContributionGraph
                  className="mx-auto py-1"
                  data={activities}
                  blockSize={12}
                  blockMargin={3.5}
                  blockRadius={1}
                >
                  <ContributionGraphCalendar
                    className="px-1"
                    title="GitHub Contributions"
                  >
                    {({ activity, dayIndex, weekIndex }) => (
                      <ContributionGraphBlock
                        activity={activity}
                        dayIndex={dayIndex}
                        weekIndex={weekIndex}
                      >
                        <title>{`${activity.count} contribution${activity.count !== 1 ? 's' : ''} on ${format(new Date(activity.date), 'dd MMM yyyy')}`}</title>
                      </ContributionGraphBlock>
                    )}
                  </ContributionGraphCalendar>

                  <ContributionGraphFooter className="px-1">
                    <ContributionGraphTotalCount>
                      {({ totalCount, year }) => (
                        <div className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
                          {totalCount.toLocaleString('en')} commits & PRs in {year}
                        </div>
                      )}
                    </ContributionGraphTotalCount>

                    <ContributionGraphLegend />
                  </ContributionGraphFooter>
                </ContributionGraph>

                <p className="border-t border-border/60 pt-3 font-mono text-[9px] tracking-[0.1em] text-muted-foreground/50 uppercase">
                  synced live from github public contributions api
                </p>
              </div>
            </div>
          </FrameBody>
        ) : (
          <FrameBody>
            {failed ? (
              <p className="text-sm text-muted-foreground">
                Couldn&apos;t load GitHub activity right now.{' '}
                <a
                  className="text-foreground underline decoration-current/30 underline-offset-2 transition-colors hover:decoration-current"
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live profile on GitHub
                </a>
                .
              </p>
            ) : (
              <div className="font-mono flex h-32 w-full items-center justify-center text-xs text-muted-foreground">
                loading github contributions…
              </div>
            )}
          </FrameBody>
        )}
      </Frame>
    </Reveal>
  )
}
