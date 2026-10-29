import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Bot,
  Boxes,
  Cloud,
  Container,
  Cpu,
  FolderGit2,
  Github,
  Plug,
  Sparkles,
  TerminalSquare,
} from 'lucide-react'
import { Frame, FrameHeader } from '@/components/frame'
import { Reveal } from '@/components/ui/reveal'
import { LEARNING_HUB } from '@/data/personal'
import { cn } from '@/lib/utils'

const icons: Record<string, typeof BookOpen> = {
  'Docs Portal': BookOpen,
  'Projects Hub': FolderGit2,
  'Kubernetes Learning': Boxes,
  'Docker to Kubernetes': Container,
  'MLOps Generator': Cpu,
  'DevOps Generator': TerminalSquare,
  'AWS Infra Generator': Cloud,
  'Monitoring in a Box': Activity,
  'AI Platform Engineering': Sparkles,
  'Agentic AI': Bot,
  'MCP Learning': Plug,
  'Repositories Hub': Github,
}

/** Learning resources as a dense, icon-led knowledge grid. */
export function LearningHub() {
  return (
    <Reveal>
      <Frame id="learning-hub" className="scroll-mt-24">
        <FrameHeader label="Learning Hub.">
          <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase tabular-nums">
            {LEARNING_HUB.length} resources · open access
          </span>
        </FrameHeader>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {LEARNING_HUB.map((item, index) => {
            const Icon = icons[item.title] ?? BookOpen
            const featured = index === 0

            return (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group flex min-h-[8.5rem] flex-col justify-between gap-6 p-4 transition-colors sm:p-5',
                  featured
                    ? 'bg-foreground text-background hover:bg-foreground/90'
                    : 'bg-background hover:bg-muted/25'
                )}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      'flex size-8 items-center justify-center border transition-colors',
                      featured
                        ? 'border-background/20 bg-background/5 text-background'
                        : 'border-border bg-background text-muted-foreground group-hover:text-signal'
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[9px] tracking-[0.16em] tabular-nums',
                      featured
                        ? 'text-background/40'
                        : 'text-muted-foreground/40'
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className={cn(
                        'text-sm font-medium transition-colors',
                        !featured && 'group-hover:text-signal'
                      )}
                    >
                      {item.title}
                    </h3>
                    <ArrowUpRight
                      className={cn(
                        'size-3.5 shrink-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
                        featured
                          ? 'text-background/50'
                          : 'text-muted-foreground/40 group-hover:text-signal'
                      )}
                    />
                  </div>
                  <p
                    className={cn(
                      'mt-1 text-[11px] leading-relaxed',
                      featured ? 'text-background/60' : 'text-muted-foreground'
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </Frame>
    </Reveal>
  )
}
