'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ButtonLink } from '@/components/button-link'
import { CardLink } from '@/components/card-link'
import { data } from '@/constants'
import TypingRole from '@/components/TypingRole'
import { motion, type HTMLMotionProps } from 'framer-motion'
import ParticleBackground from '@/components/particle-background'
import SkipAnimation from '@/components/skip-animation'
import { ChevronDown, Sparkles, TrendingUp, Users } from 'lucide-react'
import { MouseEvent, MouseEventHandler, useState, useEffect, useMemo } from 'react'
import { scrollToElement } from '@/lib/scroll-utils'
import { IntersectionObserverWrapper } from '@/components/intersection-observer-wrapper'
import { SearchBar } from '@/components/search-bar'
import { useLinkTracker } from '@/hooks/use-link-tracker'

const MotionDiv = motion.div
const MotionSection = motion.section

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { trackClick } = useLinkTracker()

  useEffect(() => {
    setMounted(true)
    setIsLoaded(true)
    
    // Check if mobile for performance optimizations
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    // Throttle scroll events on mobile for better performance
    let scrollTimeout: NodeJS.Timeout
    const throttledHandleScroll = () => {
      if (isMobile) {
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(handleScroll, 16) // ~60fps
      } else {
        handleScroll()
      }
    }

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      window.removeEventListener('resize', checkMobile)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const scrollToContent: MouseEventHandler<HTMLButtonElement> = () => {
    scrollToElement('personal-network', { offset: 100, behavior: 'smooth', focus: true })
  }

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data

    const query = searchQuery.toLowerCase().trim()
    return {
      ...data,
      contacts: data.contacts.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.url.toLowerCase().includes(query)
      ),
      socials: data.socials.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.url.toLowerCase().includes(query)
      ),
      communities: data.communities.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.url.toLowerCase().includes(query)
      ),
      resources: data.resources.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.url.toLowerCase().includes(query)
      )
    }
  }, [searchQuery])

  return (
    <div className="relative w-full bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-black">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-800 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Background decoration */}
      <ParticleBackground />
      <div className="fixed top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/50 via-purple-50/30 to-transparent dark:from-blue-950/20 dark:via-purple-950/10 dark:to-transparent -z-10"></div>
      <div className="fixed top-20 -left-5 sm:-left-10 md:left-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="fixed top-40 -right-5 sm:-right-10 md:right-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse -z-10"></div>

      {/* Skip Animation Button */}
      <SkipAnimation />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-3 sm:px-8 pt-24 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-32">
        <MotionDiv
          data-skip-animation
          initial={mounted && !isMobile ? { opacity: 0, y: 20 } : {}}
          animate={mounted && !isMobile ? { opacity: 1, y: 0 } : {}}
          transition={mounted && !isMobile ? { duration: 0.5 } : {}}
          className="relative mt-6 sm:mt-8"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <a
            href="https://github.com/NotHarshhaa"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-full transition-transform hover:scale-105 relative group"
            aria-label={`View ${data.name}'s GitHub profile`}
          >
            <Avatar className="size-24 sm:size-32 shadow-xl border-2 border-neutral-200 dark:border-neutral-800 transition-transform duration-300 group-hover:rotate-6">
              <AvatarImage alt={data.name} src={data.avatar} />
              <AvatarFallback className="font-mono font-bold text-xl">
                {data.initials}
              </AvatarFallback>
            </Avatar>
          </a>
        </MotionDiv>

        <MotionSection 
          data-skip-animation
          className="flex flex-col items-center justify-center mt-2 sm:mt-4"
          initial={mounted && !isMobile ? { opacity: 0, y: 20 } : {}}
          animate={mounted && !isMobile ? { opacity: 1, y: 0 } : {}}
          transition={mounted && !isMobile ? { duration: 0.5, delay: 0.2 } : {}}
        >
          <div className="flex gap-4 justify-center items-center mt-4 sm:mt-8 mb-2">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 text-center">
              {data.name}
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="hidden md:block"
            >
              <Sparkles className="h-8 w-8 text-purple-500" />
            </motion.div>
          </div>

          <TypingRole />

          <h2 className="mx-auto max-w-2xl px-3 sm:px-4 text-sm font-mono font-medium dark:text-neutral-300 text-neutral-700 md:text-pretty text-center mt-3 sm:mt-4 leading-relaxed">
            {data.about}
          </h2>
        </MotionSection>

        {/* Search Bar */}
        <MotionSection 
          data-skip-animation
          className="flex items-center justify-center my-4 sm:my-6"
          initial={mounted && !isMobile ? { opacity: 0, y: 20 } : {}}
          animate={mounted && !isMobile ? { opacity: 1, y: 0 } : {}}
          transition={mounted && !isMobile ? { duration: 0.5, delay: 0.35 } : {}}
        >
          <SearchBar onSearch={setSearchQuery} />
        </MotionSection>

        <MotionSection 
          data-skip-animation
          className="flex items-center gap-3 sm:gap-4 my-6 sm:my-8 flex-wrap justify-center relative"
          initial={mounted && !isMobile ? { opacity: 0, y: 20 } : {}}
          animate={mounted && !isMobile ? { opacity: 1, y: 0 } : {}}
          transition={mounted && !isMobile ? { duration: 0.5, delay: 0.4 } : {}}
        >
          {data.contacts.map((contact, index) => (
            <motion.div
              key={contact.url}
              data-skip-animation
              initial={mounted && !isMobile ? { opacity: 0, y: 20 } : {}}
              animate={mounted && !isMobile ? { opacity: 1, y: 0 } : {}}
              transition={mounted && !isMobile ? { duration: 0.3, delay: 0.4 + index * 0.1 } : {}}
            >
              <ButtonLink {...contact} />
            </motion.div>
          ))}
        </MotionSection>
          
        {/* Scroll indicator - moved outside to be more visible */}
        <motion.button
          onClick={scrollToContent}
          className="flex flex-col items-center justify-center cursor-pointer mb-8 sm:mb-12 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          initial={mounted && !isMobile ? { opacity: 0, y: -10 } : {}}
          animate={mounted && !isMobile ? { opacity: 1, y: 0 } : {}}
          transition={mounted && !isMobile ? { delay: 0.8, duration: 0.5 } : {}}
          whileHover={mounted && !isMobile ? { scale: 1.1 } : {}}
          whileTap={mounted && !isMobile ? { scale: 0.9 } : {}}
          aria-label="Scroll to explore more content"
        >
          <span className="text-base font-medium mb-2">Explore</span>
          <motion.div
            animate={mounted && !isMobile ? { y: [0, 8, 0] } : {}}
            transition={mounted && !isMobile ? { duration: 1.5, repeat: Infinity, repeatType: "loop" } : {}}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.button>

        {/* Sections with lazy loading for better performance */}
        <IntersectionObserverWrapper
          rootMargin="50px"
          threshold={0.1}
          triggerOnce={true}
        >
          <SectionContainer
            title="Personal Network"
            delay={0.6}
            items={filteredData.socials}
            id="personal-network"
            icon={<TrendingUp className="h-5 w-5" />}
            trackClick={trackClick}
          />
        </IntersectionObserverWrapper>

        <IntersectionObserverWrapper
          rootMargin="50px"
          threshold={0.1}
          triggerOnce={true}
        >
          <SectionContainer
            title="Community Network"
            delay={0.8}
            items={filteredData.communities}
            id="community-network"
            icon={<Users className="h-5 w-5" />}
            trackClick={trackClick}
          />
        </IntersectionObserverWrapper>

        <IntersectionObserverWrapper
          rootMargin="50px"
          threshold={0.1}
          triggerOnce={true}
        >
          <SectionContainer
            title="One Resource at a Time"
            delay={1.0}
            items={filteredData.resources}
            id="resources"
            special
            icon={<Sparkles className="h-5 w-5" />}
            trackClick={trackClick}
          />
        </IntersectionObserverWrapper>
      </div>
    </div>
  )
}

type SectionContainerProps = {
  title: string
  delay: number
  items: any[]
  special?: boolean
  id?: string
  icon?: React.ReactNode
  trackClick?: (url: string, title: string) => void
}

function SectionContainer({ title, delay, items, special, id, icon, trackClick }: SectionContainerProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <MotionSection 
      id={id}
      data-skip-animation
      className={`w-full max-w-[98vw] sm:max-w-[95vw] md:max-w-md lg:max-w-2xl mt-6 sm:mt-8 rounded-3xl p-3 sm:p-6 backdrop-blur-lg border border-neutral-200/50 dark:border-neutral-800/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.01] ${
        special 
          ? 'bg-gradient-to-br from-white/80 via-white/90 to-blue-50/80 dark:from-zinc-900/80 dark:via-zinc-800/80 dark:to-blue-950/70' 
          : id === 'personal-network'
            ? 'bg-gradient-to-br from-white/80 via-white/90 to-purple-50/70 dark:from-zinc-900/80 dark:via-zinc-800/80 dark:to-purple-950/70'
            : 'bg-gradient-to-br from-white/80 via-white/90 to-green-50/70 dark:from-zinc-900/80 dark:via-zinc-800/80 dark:to-green-950/70'
      }`}
      initial={mounted && !isMobile ? { opacity: 0, y: 40 } : {}}
      animate={mounted && !isMobile ? { opacity: 1, y: 0 } : {}}
      transition={mounted && !isMobile ? { duration: 0.7, delay } : {}}
    >
      <motion.div 
        data-skip-animation
        className="flex flex-col items-center"
        initial={mounted && !isMobile ? { y: 20 } : {}}
        animate={mounted && !isMobile ? { y: 0 } : {}}
        transition={mounted && !isMobile ? { duration: 0.5, delay: delay + 0.2 } : {}}
      >
        <div className="relative mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2">
            {icon && (
              <motion.div
                animate={mounted && !isMobile ? { rotate: [0, 360] } : {}}
                transition={mounted && !isMobile ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
                className={`${
                  special 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : id === 'personal-network'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-green-600 dark:text-green-400'
                }`}
              >
                {icon}
              </motion.div>
            )}
            <h3 className={`font-semibold text-2xl ${
              special 
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400' 
                : id === 'personal-network'
                  ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400'
                  : 'bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400'
            } text-center`}>
              {title}
            </h3>
          </div>
          <div className={`w-full h-0.5 mt-2 bg-gradient-to-r from-transparent ${
            special 
              ? 'via-blue-500/50' 
              : id === 'personal-network'
                ? 'via-purple-500/50'
                : 'via-green-500/50'
          } to-transparent rounded-full`}></div>
        </div>
      </motion.div>

          <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-lg mx-auto px-1 sm:px-0">
        {items.map((item, index) => (
          <MotionDiv 
            data-skip-animation
            key={item.url} 
            className="w-full max-w-[600px] mx-auto px-0"
            initial={mounted && !isMobile ? { opacity: 0, x: -20 } : {}}
            animate={mounted && !isMobile ? { opacity: 1, x: 0 } : {}}
            transition={mounted && !isMobile ? { duration: 0.3, delay: delay + 0.3 + (index * 0.1) } : {}}
            whileHover={mounted && !isMobile ? { scale: 1.02 } : {}}
            whileTap={mounted && !isMobile ? { scale: 0.98 } : {}}
          >
            <CardLink 
              {...item} 
              special={special} 
              sectionId={id} 
              onTrackClick={trackClick ? () => trackClick(item.url, item.title) : undefined}
            />
          </MotionDiv>
        ))}
      </div>
    </MotionSection>
  )
}
