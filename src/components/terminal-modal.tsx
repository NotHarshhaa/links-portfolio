'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { X, CornerDownLeft } from 'lucide-react'
import { Frame, FrameBody, FrameHeader } from '@/components/frame'
import { triggerModal, useActiveModal } from '@/hooks/use-modals'
import { data } from '@/constants'
import { getAllLinks } from '@/lib/links'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface OutputLine {
  id: string
  type: 'input' | 'output' | 'error' | 'success' | 'system'
  content: string | React.ReactNode
}

const QUICK_COMMANDS = ['help', 'whoami', 'skills', 'status', 'stats', 'links', 'matrix', 'clear', 'exit']

const COMMANDS = [
  'help', 'whoami', 'bio', 'skills', 'stack', 'status', 'links', 'ls',
  'open', 'ping', 'curl', 'theme', 'matrix', 'stats', 'history',
  'clear', 'exit', 'quit'
]

const THEME_MODES = ['light', 'dark', 'toggle']

const linkSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-')

/** Small Levenshtein distance used for "did you mean" suggestions. */
function editDistance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    const curr = [i]
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(
        (prev[j] ?? 0) + 1,
        (curr[j - 1] ?? 0) + 1,
        (prev[j - 1] ?? 0) + cost
      )
    }
    prev = curr
  }
  return prev[b.length] ?? 0
}

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>[]{}#$%&*+=/'.split('')

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement
    const resize = () => {
      canvas.width = parent?.clientWidth ?? canvas.offsetWidth
      canvas.height = parent?.clientHeight ?? canvas.offsetHeight
    }
    resize()

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * (canvas.height / fontSize))
    )

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)] ?? '0'
        const x = i * fontSize
        const y = (drops[i] ?? 0) * fontSize

        ctx.fillStyle = Math.random() > 0.975 ? '#c8ffe0' : '#00ff41'
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        else drops[i]++
      }
    }

    const id = window.setInterval(draw, 50)
    window.addEventListener('resize', resize)
    return () => {
      window.clearInterval(id)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 size-full opacity-25"
    />
  )
}

export function TerminalModal() {
  const { activeModal, closeModal } = useActiveModal()
  const open = activeModal === 'terminal'
  const { resolvedTheme, setTheme } = useTheme()

  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [lines, setLines] = useState<OutputLine[]>([])
  const [matrixActive, setMatrixActive] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const outputContainerRef = useRef<HTMLDivElement>(null)

  const allLinks = useMemo(() => getAllLinks(), [])

  // Initial welcome message
  useEffect(() => {
    if (lines.length === 0) {
      setLines([
        {
          id: 'w-1',
          type: 'system',
          content: 'Harshhaa Cloud Edge Terminal v2.4 (x86_64-node-edge)'
        },
        {
          id: 'w-2',
          type: 'system',
          content: 'Type "help" or click quick actions below. Tap [Close] or type "exit" to quit.'
        }
      ])
    }
  }, [lines.length])

  // Focus input on open without forcing mobile viewport to scroll down
  useEffect(() => {
    if (open) {
      const isMobile =
        typeof window !== 'undefined' &&
        (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)
      if (!isMobile) {
        const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60)
        return () => clearTimeout(t)
      }
    }
  }, [open])

  // Scroll terminal output container to bottom without scrolling the outer window
  useEffect(() => {
    if (open && outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight
    }
  }, [lines, open])

  // Keyboard shortcut listener: ` or Ctrl+` to toggle terminal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable

      if (e.key === '`' && !isInput && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        if (open) closeModal()
        else triggerModal('terminal')
      } else if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        if (open) closeModal()
        else triggerModal('terminal')
      } else if (e.key === 'Escape' && open) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, closeModal])

  const executeCommand = async (rawCmd: string): Promise<void> => {
    const cmd = rawCmd.trim()
    if (!cmd) return

    // `!!` re-runs the previous command (bash-style history expansion)
    if (cmd === '!!') {
      const last = history[history.length - 1]
      if (!last) {
        setLines((prev) => [
          ...prev,
          {
            id: Math.random().toString(36),
            type: 'error',
            content: '!!: no previous command in history'
          }
        ])
        setInputVal('')
        return
      }
      return executeCommand(last)
    }

    // Add to history
    setHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)

    const inputLine: OutputLine = {
      id: Math.random().toString(36),
      type: 'input',
      content: `harshhaa@edge:~$ ${cmd}`
    }

    const parts = cmd.split(' ')
    const action = parts[0] || ''
    const args = parts.slice(1)
    const lowerAction = action.toLowerCase()
    let response: OutputLine[] = []

    switch (lowerAction) {
      case 'help':
        response = [
          {
            id: Math.random().toString(36),
            type: 'output',
            content: (
              <div className="space-y-1 font-mono text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Available Commands:</p>
                <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-1 pt-1">
                  <span className="font-medium text-foreground">whoami</span>
                  <span>About Harshhaa & background</span>
                  <span className="font-medium text-foreground">skills</span>
                  <span>DevOps, Cloud & AI Infrastructure stack</span>
                  <span className="font-medium text-foreground">status</span>
                  <span>Edge node telemetry & cluster status</span>
                  <span className="font-medium text-foreground">links</span>
                  <span>List all portfolio links & resources</span>
                  <span className="font-medium text-foreground">open &lt;name&gt;</span>
                  <span>Open link (e.g. &quot;open github&quot;, &quot;open blog&quot;)</span>
                  <span className="font-medium text-foreground">ping &lt;host&gt;</span>
                  <span>Simulate network ping to host</span>
                  <span className="font-medium text-foreground">curl contact</span>
                  <span>Print contact card and direct handles</span>
                  <span className="font-medium text-foreground">theme &lt;mode&gt;</span>
                  <span>Set theme (&apos;light&apos;, &apos;dark&apos;, &apos;toggle&apos;)</span>
                  <span className="font-medium text-foreground">matrix</span>
                  <span>Toggle digital code rain</span>
                  <span className="font-medium text-foreground">stats</span>
                  <span>Global click analytics (top links)</span>
                  <span className="font-medium text-foreground">history</span>
                  <span>Show command history (!! re-runs last)</span>
                  <span className="font-medium text-foreground">clear</span>
                  <span>Clear screen</span>
                  <span className="font-medium text-foreground">exit</span>
                  <span>Close this terminal</span>
                </div>
              </div>
            )
          }
        ]
        break

      case 'whoami':
      case 'bio':
        response = [
          {
            id: Math.random().toString(36),
            type: 'output',
            content: (
              <div className="space-y-1 font-mono text-xs">
                <p className="font-semibold text-foreground">{data.name}</p>
                <p className="text-muted-foreground">{data.about}</p>
                <p className="text-muted-foreground">
                  Location: <span className="text-foreground font-medium">{data.location}</span> ({data.timezone})
                </p>
                <p className="text-muted-foreground">
                  Focus: <span className="text-foreground font-medium">{data.now}</span>
                </p>
              </div>
            )
          }
        ]
        break

      case 'skills':
      case 'stack':
        response = [
          {
            id: Math.random().toString(36),
            type: 'output',
            content: (
              <div className="space-y-2 font-mono text-xs">
                <p className="font-semibold text-foreground">Technical Architecture & Stack:</p>
                <div className="space-y-1.5 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">[DevOps & Orchestration]:</span>{' '}
                    Kubernetes, Docker, Helm, Terraform, Ansible, ArgoCD, GitHub Actions
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">[Cloud & Infrastructure]:</span>{' '}
                    AWS, Google Cloud, Edge Anycast, Linux Kernel/eBPF, CI/CD Pipelines
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">[AI & LLMOps]:</span>{' '}
                    PyTorch, LangChain, Agentic Workflows, Vector Stores, Model Serving, GPU Clusters
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">[Platforms & Web]:</span>{' '}
                    Next.js, TypeScript, Tailwind CSS, Python, Go, Bash Shell Scripting
                  </p>
                </div>
              </div>
            )
          }
        ]
        break

      case 'status':
        response = [
          {
            id: Math.random().toString(36),
            type: 'output',
            content: (
              <div className="space-y-1 font-mono text-xs">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ● CLUSTER STATUS: 100% OPERATIONAL
                </p>
                <p className="text-muted-foreground">Region: Asia-Pacific (Edge Anycast · HYD/BOM/SIN)</p>
                <p className="text-muted-foreground">Edge Node: hr-edge-node-01</p>
                <p className="text-muted-foreground">HTTP Protocol: HTTP/3 (QUIC) over TLS 1.3</p>
                <p className="text-muted-foreground">Active Connections: Healthy · Zero Dropped Packets</p>
              </div>
            )
          }
        ]
        break

      case 'links':
      case 'ls':
        response = [
          {
            id: Math.random().toString(36),
            type: 'output',
            content: (
              <div className="space-y-1 font-mono text-xs">
                <p className="font-semibold text-foreground">Available Links (use &apos;open &lt;name&gt;&apos;):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-muted-foreground">
                  {allLinks.map((l) => (
                    <div key={`${l.category}-${l.url}`} className="truncate">
                      <span className="font-medium text-foreground">
                        {linkSlug(l.title)}
                      </span>
                      {' -> '}
                      <span className="text-[11px] opacity-75">{l.url.replace(/^https?:\/\//, '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        ]
        break

      case 'open': {
        const target = args[0]?.toLowerCase()
        if (!target) {
          response = [
            {
              id: Math.random().toString(36),
              type: 'error',
              content: 'Usage: open <name> (e.g. "open github", "open portfolio", "open blog")'
            }
          ]
          break
        }

        const t = target
        const match =
          allLinks.find(
            (l) => linkSlug(l.title) === t || l.title.toLowerCase() === t
          ) ??
          allLinks.find(
            (l) =>
              linkSlug(l.title).startsWith(t) ||
              l.title.toLowerCase().startsWith(t)
          ) ??
          allLinks.find(
            (l) =>
              l.url.toLowerCase().includes(t) ||
              linkSlug(l.title).includes(t) ||
              l.title.toLowerCase().includes(t)
          )

        if (match) {
          window.open(match.url, '_blank', 'noopener,noreferrer')
          response = [
            {
              id: Math.random().toString(36),
              type: 'success',
              content: `Opening ${match.title} (${match.url})...`
            }
          ]
        } else {
          const suggestions = allLinks
            .filter(
              (l) =>
                editDistance(linkSlug(l.title), t) <= 2 ||
                editDistance(l.title.toLowerCase(), t) <= 2
            )
            .slice(0, 3)
            .map((l) => `"open ${linkSlug(l.title)}"`)
          response = [
            {
              id: Math.random().toString(36),
              type: 'error',
              content: suggestions.length
                ? `Link not found for "${target}". Did you mean: ${suggestions.join(', ')}?`
                : `Link not found for "${target}". Type "links" to see available destinations.`
            }
          ]
        }
        break
      }

      case 'ping': {
        const host = args[0] || 'links.harshhaareddy.com'
        const fakeLatency = Math.floor(Math.random() * 15) + 18
        response = [
          {
            id: Math.random().toString(36),
            type: 'output',
            content: (
              <div className="space-y-0.5 font-mono text-xs text-muted-foreground">
                <p>PING {host} (56 data bytes)</p>
                <p>64 bytes from {host}: icmp_seq=1 ttl=116 time={fakeLatency}.2 ms</p>
                <p>64 bytes from {host}: icmp_seq=2 ttl=116 time={fakeLatency - 2}.8 ms</p>
                <p>64 bytes from {host}: icmp_seq=3 ttl=116 time={fakeLatency + 1}.4 ms</p>
                <p>--- {host} ping statistics ---</p>
                <p>3 packets transmitted, 3 received, 0% packet loss, time 2002ms</p>
              </div>
            )
          }
        ]
        break
      }

      case 'curl': {
        if (args[0]?.toLowerCase() === 'contact') {
          response = [
            {
              id: Math.random().toString(36),
              type: 'output',
              content: (
                <div className="space-y-1 font-mono text-xs">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">HTTP/1.1 200 OK</p>
                  <p className="text-muted-foreground">Content-Type: application/json</p>
                  <pre className="border border-border bg-muted/30 p-2 text-foreground">
{`{
  "name": "${data.name}",
  "email": "${data.email}",
  "phone": "${data.phone}",
  "location": "${data.location}",
  "timezone": "${data.timezone}",
  "website": "${data.siteUrl}",
  "github": "https://github.com/NotHarshhaa",
  "linkedin": "https://linkedin.com/in/harshhaa-vardhan-reddy"
}`}
                  </pre>
                </div>
              )
            }
          ]
        } else {
          response = [
            {
              id: Math.random().toString(36),
              type: 'output',
              content: 'Usage: curl contact'
            }
          ]
        }
        break
      }

      case 'theme': {
        const mode = args[0]?.toLowerCase()
        if (mode === 'dark' || mode === 'light') {
          setTheme(mode)
          response = [
            {
              id: Math.random().toString(36),
              type: 'success',
              content: `Theme switched to ${mode}.`
            }
          ]
        } else if (mode === 'toggle') {
          const next = resolvedTheme === 'dark' ? 'light' : 'dark'
          setTheme(next)
          response = [
            {
              id: Math.random().toString(36),
              type: 'success',
              content: `Theme toggled to ${next}.`
            }
          ]
        } else {
          response = [
            {
              id: Math.random().toString(36),
              type: 'output',
              content: 'Usage: theme <dark|light|toggle>'
            }
          ]
        }
        break
      }

      case 'matrix': {
        setMatrixActive((prev) => !prev)
        response = [
          {
            id: Math.random().toString(36),
            type: 'success',
            content: matrixActive
              ? 'Matrix mode deactivated.'
              : 'Matrix mode active! (type "matrix" to toggle)'
          }
        ]
        break
      }

      case 'stats': {
        setLines((prev) => [
          ...prev,
          inputLine,
          {
            id: Math.random().toString(36),
            type: 'system',
            content: 'Fetching global click analytics...'
          }
        ])
        setInputVal('')
        try {
          const res = await fetch('/api/stats')
          const body = (await res.json()) as {
            configured?: boolean
            total?: number
            top?: Array<{ url: string; title: string; count: number }>
          }
          const out: OutputLine[] = []
          if (!body.configured) {
            out.push({
              id: Math.random().toString(36),
              type: 'system',
              content:
                'Global analytics not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN to enable.'
            })
          } else if (!body.top?.length) {
            out.push({
              id: Math.random().toString(36),
              type: 'output',
              content: 'No link clicks recorded yet.'
            })
          } else {
            out.push({
              id: Math.random().toString(36),
              type: 'output',
              content: (
                <div className="space-y-0.5 font-mono text-xs">
                  <p className="font-semibold text-foreground">
                    Top Links by Global Clicks ({body.total ?? 0} total):
                  </p>
                  <div className="space-y-0.5 pt-1 text-muted-foreground">
                    {body.top.map((item, i) => (
                      <div key={item.url} className="flex justify-between gap-3">
                        <span className="truncate">
                          <span className="text-foreground">
                            {String(i + 1).padStart(2, '0')}
                          </span>{' '}
                          {item.title}
                        </span>
                        <span className="shrink-0 tabular-nums">{item.count}×</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          }
          setLines((prev) => [...prev, ...out])
        } catch {
          setLines((prev) => [
            ...prev,
            {
              id: Math.random().toString(36),
              type: 'error',
              content: 'stats: failed to fetch analytics'
            }
          ])
        }
        return
      }

      case 'history':
        response =
          history.length === 0
            ? [
                {
                  id: Math.random().toString(36),
                  type: 'system',
                  content: 'No commands in history yet.'
                }
              ]
            : [
                {
                  id: Math.random().toString(36),
                  type: 'output',
                  content: (
                    <div className="space-y-0.5 font-mono text-xs text-muted-foreground">
                      {history.map((entry, i) => (
                        <div key={`${i}-${entry}`}>
                          <span className="text-foreground">
                            {String(i + 1).padStart(3)}
                          </span>
                          {'  '}
                          {entry}
                        </div>
                      ))}
                    </div>
                  )
                }
              ]
        break

      case 'clear':
        setLines([])
        setInputVal('')
        return

      case 'exit':
      case 'quit':
        closeModal()
        return

      default:
        response = [
          {
            id: Math.random().toString(36),
            type: 'error',
            content: `bash: ${action}: command not found. Type "help" for a list of valid commands.`
          }
        ]
    }

    setLines((prev) => [...prev, inputLine, ...response])
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const value = inputVal
      if (!value.trim()) return
      const parts = value.split(' ')
      const prefix = (parts[parts.length - 1] ?? '').toLowerCase()
      const first = (parts[0] ?? '').toLowerCase()

      let pool: string[]
      if (parts.length <= 1) {
        pool = COMMANDS
      } else if (first === 'open') {
        pool = [...new Set(allLinks.map((l) => linkSlug(l.title)))]
      } else if (first === 'theme') {
        pool = THEME_MODES
      } else if (first === 'curl') {
        pool = ['contact']
      } else {
        return
      }

      const matches = pool.filter((entry) => entry.startsWith(prefix))
      if (matches.length === 0) return

      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0] ?? prefix
        setInputVal(parts.join(' '))
        return
      }

      // Multiple matches: complete to the longest common prefix and list options
      const common = matches.reduce((acc, entry) => {
        let i = 0
        while (i < acc.length && i < entry.length && acc[i] === entry[i]) i++
        return acc.slice(0, i)
      })
      parts[parts.length - 1] = common || prefix
      setInputVal(parts.join(' '))
      setLines((prev) => [
        ...prev,
        {
          id: Math.random().toString(36),
          type: 'system',
          content:
            matches.slice(0, 8).join('  ') +
            (matches.length > 8 ? `  (+${matches.length - 8} more)` : '')
        }
      ])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(nextIdx)
        setInputVal(history[nextIdx] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1
        if (nextIdx >= history.length) {
          setHistoryIndex(-1)
          setInputVal('')
        } else {
          setHistoryIndex(nextIdx)
          setInputVal(history[nextIdx] || '')
        }
      }
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Terminal"
    >
      <Frame
        className="relative w-full max-w-2xl overflow-hidden shadow-2xl border-border bg-background text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <FrameHeader label="Terminal / CLI">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground">
              Press ` or ESC
            </span>
            <button
              type="button"
              onClick={closeModal}
              className="flex items-center gap-1 border border-border bg-background px-2.5 py-1 font-mono text-[11px] font-bold text-foreground transition-colors hover:bg-muted active:scale-95 touch-manipulation"
              aria-label="Close terminal"
            >
              <X className="size-3.5" />
              <span>CLOSE</span>
            </button>
          </div>
        </FrameHeader>

        <FrameBody className="relative flex flex-col p-4 font-mono sm:p-5 h-[65vh] max-h-[550px] bg-background/95 text-foreground">
          {matrixActive && <MatrixRain />}
          {/* Terminal Output Area */}
          <div
            ref={outputContainerRef}
            className="relative z-10 flex-1 overflow-y-auto space-y-2 pr-1 text-xs overscroll-contain"
          >
            {lines.map((line) => (
              <div
                key={line.id}
                className={cn(
                  'leading-relaxed break-words font-mono',
                  line.type === 'input' && 'text-foreground font-bold',
                  line.type === 'system' && 'text-muted-foreground',
                  line.type === 'error' && 'text-destructive font-medium',
                  line.type === 'success' && 'text-emerald-600 dark:text-emerald-400 font-medium',
                  line.type === 'output' && 'text-foreground'
                )}
              >
                {line.content}
              </div>
            ))}
          </div>

          {/* Quick Command Chips */}
          <div className="relative z-10 mt-3 flex flex-wrap items-center gap-1.5 border-t border-border pt-3">
            <span className="font-mono text-[10px] text-muted-foreground uppercase">
              Quick:
            </span>
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => executeCommand(cmd)}
                className={cn(
                  'border px-2 py-0.5 font-mono text-[11px] transition-all active:scale-95',
                  cmd === 'exit'
                    ? 'border-border bg-muted/40 text-muted-foreground hover:border-destructive hover:text-destructive'
                    : 'border-border bg-muted/20 text-muted-foreground hover:border-foreground hover:text-foreground'
                )}
              >
                {cmd === 'exit' ? '✕ exit' : cmd}
              </button>
            ))}
          </div>

          {/* Command Prompt Input */}
          <div className="relative z-10 mt-3 flex items-center gap-2 border-t border-border pt-3">
            <span className="shrink-0 font-mono text-xs font-semibold text-foreground">
              harshhaa@edge:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground/60"
              placeholder="type a command... (try 'help')"
              spellCheck={false}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              className="shrink-0 p-1 text-muted-foreground hover:text-foreground active:scale-95"
              title="Submit command"
              aria-label="Submit command"
            >
              <CornerDownLeft className="size-3.5" />
            </button>
          </div>
        </FrameBody>
      </Frame>
    </div>
  )
}
