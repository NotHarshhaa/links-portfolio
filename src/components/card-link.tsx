import { CopyToClipboard } from '@/components/copy-to-clipboard'
import { type Links } from '@/types'

export function CardLink({ title, url, icon }: Links) {
  return (
    <div className="group relative flex items-center justify-between w-full border shadow rounded-lg hover:scale-105 transition-all ease-in-out duration-300 dark:bg-black/90 bg-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center w-full p-3 rounded-lg gap-4"
      >
        {/* Icon container */}
        <div className="shrink-0 flex items-center justify-center">
          {icon({ className: 'size-6' })}
        </div>

        {/* Text container */}
        <h2 className="font-medium font-mono dark:text-neutral-100 text-neutral-800">
          {title}
        </h2>
      </a>

      {/* Copy icon */}
      <div className="absolute group-hover:flex right-3 top-4 items-center hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <CopyToClipboard url={url} />
      </div>
    </div>
  )
}
