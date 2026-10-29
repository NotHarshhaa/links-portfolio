import { Check, Compass } from 'lucide-react'
import { Frame, FrameBody, FrameHeader } from '@/components/frame'
import { Marquee, MarqueeChip } from '@/components/ui/marquee'
import { Reveal } from '@/components/ui/reveal'
import { CURRENT_FOCUS, EXPERTISE } from '@/data/personal'

/** Current focus ticker + a compact capability matrix. */
export function FocusSection() {
  return (
    <Reveal>
      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <Frame className="flex min-w-0 flex-col">
          <FrameHeader label="Current Focus">
            <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase tabular-nums">
              {CURRENT_FOCUS.length} tracks
            </span>
          </FrameHeader>

          <FrameBody className="flex min-w-0 flex-1 flex-col gap-5">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              A rolling snapshot of what I&apos;m building, breaking, and
              learning right now — across platform, infrastructure, and applied
              AI.
            </p>

            <div className="-mx-4 min-w-0 space-y-2.5 border-y border-border py-4 sm:-mx-6">
              <Marquee duration={58}>
                {CURRENT_FOCUS.map((item, index) => (
                  <MarqueeChip key={item} index={index}>
                    {item}
                  </MarqueeChip>
                ))}
              </Marquee>
              <Marquee duration={72} reverse>
                {[...CURRENT_FOCUS].reverse().map((item, index) => (
                  <MarqueeChip key={item} index={index}>
                    {item}
                  </MarqueeChip>
                ))}
              </Marquee>
            </div>

            <div className="relative mt-auto flex items-start gap-3 border border-border bg-muted/20 p-3.5">
              <span className="flex size-8 shrink-0 items-center justify-center border border-border bg-background">
                <Compass className="size-4 text-signal" />
              </span>
              <div>
                <p className="font-mono text-[9px] tracking-[0.18em] text-signal uppercase">
                  North star
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Make shipping AI products as boring and reliable as deploying
                  any other service.
                </p>
              </div>
            </div>
          </FrameBody>
        </Frame>

        <Frame className="flex min-w-0 flex-col">
          <FrameHeader label="Areas of Expertise">
            <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase tabular-nums">
              {EXPERTISE.length} domains
            </span>
          </FrameHeader>

          <div className="grid flex-1 gap-px bg-border xs:grid-cols-2">
            {EXPERTISE.map((item, index) => (
              <div
                key={item}
                className="group flex items-start gap-2.5 bg-background px-3.5 py-3 transition-colors hover:bg-muted/20"
              >
                <Check className="mt-0.5 size-3 shrink-0 text-signal/60 transition-colors group-hover:text-signal" />
                <span className="text-xs leading-snug text-muted-foreground transition-colors group-hover:text-foreground">
                  {item}
                </span>
                <span className="ml-auto font-mono text-[9px] text-muted-foreground/30 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </Frame>
      </div>
    </Reveal>
  )
}
