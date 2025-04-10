'use client'

import { Typewriter } from 'react-simple-typewriter'

export default function TypingRole() {
  return (
    <div className="h-6 md:h-8"> {/* Reserve space */}
      <p className="text-center text-base md:text-lg font-mono text-gray-600 dark:text-gray-300 break-words px-2">
        <Typewriter
          words={[
            'DevOps Engineer',
            'Cloud Enthusiast',
            'Automation Fanatic',
            'Open-Source Contributor',
          ]}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </p>
    </div>
  )
}
