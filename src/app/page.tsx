'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ButtonLink } from '@/components/button-link'
import { CardLink } from '@/components/card-link'
import { data } from '@/constants'
import TypingRole from '@/components/TypingRole'
import { motion, type HTMLMotionProps } from 'framer-motion'
import ParticleBackground from '@/components/particle-background'
import SkipAnimation from '@/components/skip-animation'
import { ChevronDown } from 'lucide-react'
import { MouseEvent, MouseEventHandler } from 'react'

const MotionDiv = motion.div
const MotionSection = motion.section

export default function HomePage() {
  const scrollToContent: MouseEventHandler<HTMLButtonElement> = () => {
    const personalNetwork = document.getElementById('personal-network')
    if (personalNetwork) {
      personalNetwork.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-black">
      {/* Background decoration */}
      <ParticleBackground />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent -z-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl -z-10"></div>

      {/* Skip Animation Button */}
      <SkipAnimation />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-8 pt-28 pb-16 lg:pb-8">
        <MotionDiv
          data-skip-animation
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <a
            href="https://github.com/NotHarshhaa"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-full transition-transform hover:scale-105 relative"
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
          data-skip-animation
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="flex gap-4 justify-center items-center mt-8 mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "easeInOut",
              repeatDelay: 5
            }}
          >
            <h1 className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 text-center">
              {data.name}
            </h1>
          </motion.div>

          <TypingRole />

          <h2 className="mx-auto max-w-2xl px-4 text-sm font-mono font-medium dark:text-neutral-300 text-neutral-700 md:text-pretty text-center mt-4 leading-relaxed">
            {data.about}
          </h2>
        </MotionSection>

        <MotionSection 
          data-skip-animation
          className="flex items-center gap-4 my-8 flex-wrap justify-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {data.contacts.map((contact, index) => (
            <motion.div
              key={contact.url}
              data-skip-animation
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              <ButtonLink {...contact} />
            </motion.div>
          ))}
        </MotionSection>
          
        {/* Scroll indicator - moved outside to be more visible */}
        <motion.button
          onClick={scrollToContent}
          className="flex flex-col items-center justify-center cursor-pointer mb-12 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-base font-medium mb-2">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.button>

        <SectionContainer
          title="Personal Network"
          delay={0.6}
          items={data.socials}
          id="personal-network"
        />

        <SectionContainer
          title="Community Network"
          delay={0.8}
          items={data.communities}
        />

        <SectionContainer
          title="One Resource at a Time"
          delay={1.0}
          items={data.resources}
          special
        />
      </main>
    </div>
  )
}

type SectionContainerProps = {
  title: string
  delay: number
  items: any[]
  special?: boolean
  id?: string
}

function SectionContainer({ title, delay, items, special, id }: SectionContainerProps) {
  return (
    <MotionSection 
      id={id}
      data-skip-animation
      className={`w-full max-w-md lg:max-w-2xl mt-8 rounded-3xl p-6 shadow-xl backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50 ${
        special 
          ? 'bg-gradient-to-br from-white/90 via-white/95 to-blue-50/90 dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-blue-950/80' 
          : id === 'personal-network'
            ? 'bg-gradient-to-br from-white/90 via-white/95 to-purple-50/80 dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-purple-950/80'
            : 'bg-gradient-to-br from-white/90 via-white/95 to-green-50/80 dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-green-950/80'
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
    >
      <motion.div 
        data-skip-animation
        className="flex flex-col items-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        <div className="relative mb-8">
          <h3 className={`font-semibold text-2xl ${
            special 
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400' 
              : id === 'personal-network'
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400'
                : 'bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400'
          } text-center`}>
            {title}
          </h3>
          <div className={`w-full h-0.5 mt-2 bg-gradient-to-r from-transparent ${
            special 
              ? 'via-blue-500/50' 
              : id === 'personal-network'
                ? 'via-purple-500/50'
                : 'via-green-500/50'
          } to-transparent rounded-full`}></div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
        {items.map((item, index) => (
          <MotionDiv 
            data-skip-animation
            key={item.url} 
            className="w-full max-w-[600px] mx-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.3 + (index * 0.1) }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CardLink {...item} special={special} sectionId={id} />
          </MotionDiv>
        ))}
      </div>
    </MotionSection>
  )
}
