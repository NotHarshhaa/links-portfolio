'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ButtonLink } from '@/components/button-link'
import { CardLink } from '@/components/card-link'
import { data } from '@/constants'
import TypingRole from '@/components/TypingRole'
import { motion, type HTMLMotionProps } from 'framer-motion'

const MotionDiv = motion.div
const MotionSection = motion.section

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden from-white to-neutral-100 dark:from-neutral-950 dark:to-black">

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-8 pt-28 pb-16 lg:pb-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://github.com/NotHarshhaa"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-full transition-transform hover:scale-105"
          >
            <Avatar className="size-32 shadow-xl border-2 border-neutral-200 dark:border-neutral-800">
              <AvatarImage alt={data.name} src={data.avatar} />
              <AvatarFallback className="font-mono font-bold text-xl">
                {data.initials}
              </AvatarFallback>
            </Avatar>
          </a>
        </MotionDiv>

        <MotionSection 
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex gap-4 justify-center items-center mt-8 mb-2">
            <h1 className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 text-center">
              {data.name}
            </h1>
          </div>

          <TypingRole />

          <h2 className="mx-auto max-w-2xl px-4 text-sm font-mono font-medium dark:text-neutral-300 text-neutral-700 md:text-pretty text-center mt-4 leading-relaxed">
            {data.about}
          </h2>
        </MotionSection>

        <MotionSection 
          className="flex items-center gap-4 my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {data.contacts.map((contact) => (
            <ButtonLink key={contact.url} {...contact} />
          ))}
        </MotionSection>

        <MotionSection 
          className="w-full max-w-md lg:max-w-2xl bg-white/90 dark:bg-zinc-900/90 rounded-3xl p-6 shadow-xl backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="font-semibold mb-6 text-2xl bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 text-center">
            Personal Network
          </h3>
          <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
            {data.socials.map((social) => (
              <MotionDiv 
                key={social.url} 
                className="w-full max-w-[600px] mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CardLink {...social} />
              </MotionDiv>
            ))}
          </div>
        </MotionSection>

        <MotionSection 
          className="w-full max-w-md lg:max-w-2xl mt-8 bg-white/90 dark:bg-zinc-900/90 rounded-3xl p-6 shadow-xl backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="font-semibold mb-6 text-2xl bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 text-center">
            Community Network
          </h3>
          <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
            {data.communities.map((community) => (
              <MotionDiv 
                key={community.url} 
                className="w-full max-w-[600px] mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CardLink {...community} />
              </MotionDiv>
            ))}
          </div>
        </MotionSection>
      </main>
    </div>
  )
}
