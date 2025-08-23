import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  className?: string
  width?: string
  height?: string
  rounded?: string
}

export function LoadingSkeleton({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4', 
  rounded = 'rounded' 
}: LoadingSkeletonProps) {
  return (
    <motion.div
      className={`skeleton ${width} ${height} ${rounded} ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="w-full max-w-[600px] mx-auto p-4 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <LoadingSkeleton width="w-10" height="h-10" rounded="rounded-lg" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton width="w-3/4" height="h-4" />
          <LoadingSkeleton width="w-1/2" height="h-3" />
        </div>
        <LoadingSkeleton width="w-6" height="h-6" rounded="rounded" />
      </div>
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="w-full max-w-[95vw] md:max-w-md lg:max-w-2xl mt-8 rounded-3xl p-4 sm:p-6 backdrop-blur-lg border border-neutral-200/50 dark:border-neutral-800/50 bg-gradient-to-br from-white/80 via-white/90 to-blue-50/80 dark:from-zinc-900/80 dark:via-zinc-800/80 dark:to-blue-950/70">
      <div className="flex flex-col items-center mb-8">
        <LoadingSkeleton width="w-48" height="h-8" rounded="rounded" />
        <LoadingSkeleton width="w-32" height="h-1" rounded="rounded-full" className="mt-2" />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
