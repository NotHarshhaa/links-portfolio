'use client'

import { Typewriter } from 'react-simple-typewriter'

const roles = [
  'Platform Engineer',
  'AI Infrastructure',
  'Agentic Systems',
  'DevOps & Cloud'
]

export default function TypingRole() {
  return (
    <p className="font-mono text-sm text-muted-foreground sm:text-base">
      <Typewriter
        words={roles}
        loop
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1500}
      />
    </p>
  )
}
