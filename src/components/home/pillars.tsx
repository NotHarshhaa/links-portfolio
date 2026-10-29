import { Cpu, Layers, Network, Sparkles } from 'lucide-react'
import { PILLARS } from '@/data/personal'

const icons = {
  layers: Layers,
  cpu: Cpu,
  network: Network,
  sparkles: Sparkles,
} as const

/** Four-column capability grid: the scannable version of the engineering pillars. */
export function Pillars() {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
      {PILLARS.map((pillar, index) => {
        const Icon = icons[pillar.icon]

        return (
          <article
            key={pillar.id}
            className="group relative flex flex-col gap-4 bg-background p-5 transition-colors hover:bg-muted/20 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex size-9 items-center justify-center border border-border bg-muted/30 transition-colors group-hover:border-signal/40 group-hover:bg-signal/5">
                <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-signal" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/50 tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[9px] tracking-[0.18em] text-signal uppercase">
                {pillar.kicker}
              </p>
              <h3 className="font-heading text-base font-semibold tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>

            <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {pillar.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-border/80 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-muted-foreground/80 uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        )
      })}
    </div>
  )
}
