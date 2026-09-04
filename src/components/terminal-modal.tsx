'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react'
import { Frame, FrameBody, FrameHeader } from '@/components/frame'
import { useActiveModal } from '@/hooks/use-modals'
import { data } from '@/constants'
import { getAllLinks } from '@/lib/links'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface OutputLine {
  id: string
  type: 'input' | 'output' | 'error' | 'success' | 'system'
  content: string | React.ReactNode
}

const QUICK_COMMANDS = ['help', 'whoami', 'skills', 'status', 'links', 'matrix', 'clear', 'exit']

export function TerminalModal() {
  const { activeModal, closeModal } = useActiveModal()
  const open = activeModal === 'terminal'
  const { theme, setTheme } = useTheme()

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
          content: 'Type "help" or tap quick actions below. Tap [Close] or type "exit" to quit.'
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
        else {
          const { triggerModal } = require('@/hooks/use-modals')
          triggerModal('terminal')
        }
      } else if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        if (open) closeModal()
        else {
          const { triggerModal } = require('@/hooks/use-modals')
          triggerModal('terminal')
        }
      } else if (e.key === 'Escape' && open) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, closeModal])

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim()
    if (!cmd) return

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
                <p className="text-foreground font-semibold">Available Commands:</p>
                <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-0.5 pt-1">
                  <span className="text-emerald-400">whoami</span>
                  <span>About Harshhaa & background</span>
                  <span className="text-emerald-400">skills</span>
                  <span>DevOps, Cloud & AI Infrastructure stack</span>
                  <span className="text-emerald-400">status</span>
                  <span>Edge node telemetry & cluster status</span>
                  <span className="text-emerald-400">links</span>
                  <span>List all portfolio links & resources</span>
                  <span className="text-emerald-400">open &lt;name&gt;</span>
                  <span>Open link (e.g. "open github", "open blog")</span>
                  <span className="text-emerald-400">ping &lt;host&gt;</span>
                  <span>Simulate network ping to host</span>
                  <span className="text-emerald-400">curl contact</span>
                  <span>Print contact card and direct handles</span>
                  <span className="text-emerald-400">theme &lt;mode&gt;</span>
                  <span>Set theme ('light', 'dark', 'toggle')</span>
                  <span className="text-emerald-400">matrix</span>
                  <span>Toggle digital code rain</span>
                  <span className="text-emerald-400">clear</span>
                  <span>Clear screen</span>
                  <span className="text-emerald-400">exit</span>
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
                  Location: <span className="text-foreground">{data.location}</span> ({data.timezone})
                </p>
                <p className="text-muted-foreground">
                  Focus: <span className="text-emerald-400">{data.now}</span>
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
                <p className="text-foreground font-semibold">Technical Architecture & Stack:</p>
                <div className="space-y-1.5 text-muted-foreground">
                  <p>
                    <span className="text-emerald-400 font-semibold">[DevOps & Orchestration]:</span>{' '}
                    Kubernetes, Docker, Helm, Terraform, Ansible, ArgoCD, GitHub Actions
                  </p>
                  <p>
                    <span className="text-emerald-400 font-semibold">[Cloud & Infrastructure]:</span>{' '}
                    AWS, Google Cloud, Edge Anycast, Linux Kernel/eBPF, CI/CD Pipelines
                  </p>
                  <p>
                    <span className="text-emerald-400 font-semibold">[AI & LLMOps]:</span>{' '}
                    PyTorch, LangChain, Agentic Workflows, Vector Stores, Model Serving, GPU Clusters
                  </p>
                  <p>
                    <span className="text-emerald-400 font-semibold">[Platforms & Web]:</span>{' '}
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
                <p className="text-emerald-400 font-semibold">● CLUSTER STATUS: 100% OPERATIONAL</p>
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
                <p className="text-foreground font-semibold">Available Links (use 'open &lt;name&gt;'):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-muted-foreground">
                  {allLinks.map((l) => (
                    <div key={l.url} className="truncate">
                      <span className="text-emerald-400">{l.title.toLowerCase().replace(/\s+/g, '-')}</span>
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

        const match = allLinks.find(
          (l) =>
            l.title.toLowerCase() === target ||
            l.title.toLowerCase().includes(target) ||
            l.url.toLowerCase().includes(target)
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
          response = [
            {
              id: Math.random().toString(36),
              type: 'error',
              content: `Link not found for "${target}". Type "links" to see available destinations.`
            }
          ]
        }
        break
      }

      case 'ping': {
        const host = args[0] || 'link.harshhaareddy.com'
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
                  <p className="text-emerald-400">HTTP/1.1 200 OK</p>
                  <p className="text-muted-foreground">Content-Type: application/json</p>
                  <pre className="border border-border/80 bg-muted/20 p-2 text-foreground">
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
          const next = theme === 'dark' ? 'light' : 'dark'
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
            content: matrixActive ? 'Matrix digital rain deactivated.' : 'Matrix digital rain engaged! (type matrix to stop)'
          }
        ]
        break
      }

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
        className="relative w-full max-w-2xl overflow-hidden shadow-2xl border-foreground/30 bg-black/95 text-emerald-400"
        onClick={(e) => e.stopPropagation()}
      >
        <FrameHeader
          label="Edge Node Terminal · bash"
          className="bg-black/90 border-b border-emerald-500/20 text-emerald-400"
        >
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-mono text-[10px] text-emerald-500/70">
              Press ` or ESC to close
            </span>
            <button
              type="button"
              onClick={closeModal}
              className="flex items-center gap-1 border border-emerald-500/40 bg-emerald-950/70 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20 active:scale-95 touch-manipulation"
              aria-label="Close terminal"
            >
              <X className="size-3.5" />
              <span>CLOSE</span>
            </button>
          </div>
        </FrameHeader>

        <FrameBody className="relative flex flex-col p-4 font-mono sm:p-5 h-[65vh] max-h-[550px] bg-black text-emerald-400">
          {/* Subtle Scanline Overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 z-0"
            aria-hidden
          />

          {/* Terminal Output Area */}
          <div ref={outputContainerRef} className="relative z-10 flex-1 overflow-y-auto space-y-2 pr-1 text-xs overscroll-contain">
            {lines.map((line) => (
              <div
                key={line.id}
                className={cn(
                  'leading-relaxed break-words',
                  line.type === 'input' && 'text-emerald-300 font-bold',
                  line.type === 'system' && 'text-emerald-500/80',
                  line.type === 'error' && 'text-rose-400',
                  line.type === 'success' && 'text-emerald-400 font-semibold',
                  line.type === 'output' && 'text-emerald-100/90'
                )}
              >
                {line.content}
              </div>
            ))}
          </div>

          {/* Quick Command Chips */}
          <div className="relative z-10 mt-3 flex flex-wrap gap-1.5 border-t border-emerald-500/20 pt-3">
            <span className="self-center font-mono text-[10px] text-emerald-500/60 uppercase">
              Quick:
            </span>
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => executeCommand(cmd)}
                className={cn(
                  'border px-2 py-0.5 font-mono text-[11px] transition-colors',
                  cmd === 'exit'
                    ? 'border-rose-500/40 bg-rose-950/30 text-rose-300 hover:bg-rose-500/20'
                    : 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/20'
                )}
              >
                {cmd === 'exit' ? '✕ exit' : cmd}
              </button>
            ))}
          </div>

          {/* Command Prompt Input */}
          <div className="relative z-10 mt-3 flex items-center gap-2 border-t border-emerald-500/20 pt-3">
            <span className="shrink-0 font-mono text-xs font-semibold text-emerald-400">
              harshhaa@edge:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent font-mono text-xs text-emerald-200 outline-none placeholder:text-emerald-500/40"
              placeholder="type a command... (try 'help')"
              spellCheck={false}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              className="shrink-0 p-1 text-emerald-400 hover:text-emerald-300 active:scale-95"
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
