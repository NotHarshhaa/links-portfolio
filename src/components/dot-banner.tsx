'use client'

import { data } from '@/constants'
import { Corners } from '@/components/frame'
import { Magnet } from '@/components/magnet'
import { RotatingText } from '@/components/rotating-text'
import { Marquee } from '@/components/magicui/marquee'

const keywords = [
  'Platform Engineering',
  'AI Infrastructure',
  'Agentic Systems',
  'DevOps',
  'Cloud Native',
  'Kubernetes',
  'Terraform',
  'CI/CD',
  'Observability',
  'Open Source'
]

/** Dot-grid banner with a magnetic mailto CTA, ported from the reference
 *  portfolio's HeroBanner and framed to match the site's blueprint style.
 *  Bottom edge carries a keyword marquee ported from sleek-portfolio. */
export function DotBanner() {
  return (
    <div className="relative w-full border border-border bg-background/90">
      <Corners />
      <div className="flex h-28 w-full items-center justify-center bg-center sm:h-32 [background-size:10px_10px] bg-[radial-gradient(color-mix(in_oklch,var(--foreground)_16%,transparent)_1px,transparent_0)]">
        <Magnet padding={40} magnetStrength={5}>
          <a
            href={`mailto:${data.email}?subject=Let's connect&body=Hi Harshhaa,`}
            className="block max-w-[85vw] border border-border bg-background px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
            aria-label={`Email ${data.name}`}
          >
            <RotatingText
              texts={[
                data.availability ?? 'Open to collaborations',
                data.now ?? 'Building in public'
              ]}
            />
          </a>
        </Magnet>
      </div>

      <div className="border-t border-border">
        <Marquee
          pauseOnHover
          className="w-full py-2 [--duration:30s] [--gap:2.5rem]"
        >
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="flex items-center gap-2.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase"
            >
              <span className="size-1 bg-foreground/40" aria-hidden />
              {keyword}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

