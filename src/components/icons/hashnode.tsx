import type { SVGProps } from 'react'

export const HashnodeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="256"
    height="256"
    viewBox="0 0 256 256"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded dark:bg-white bg-black text-white dark:text-black ${
      props.className ?? ''
    }`}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M128 0C57.308 0 0 57.308 0 128C0 198.692 57.308 256 128 256C198.692 256 256 198.692 256 128C256 57.308 198.692 0 128 0ZM192.615 129.061C192.615 131.631 191.661 134.084 189.941 135.804L135.802 189.941C134.082 191.662 131.629 192.615 129.059 192.615C126.49 192.615 124.037 191.662 122.317 189.941L68.179 135.804C66.458 134.084 65.505 131.631 65.505 129.061C65.505 126.491 66.458 124.038 68.179 122.317L122.317 68.18C124.037 66.46 126.49 65.506 129.059 65.506C131.629 65.506 134.082 66.46 135.802 68.18L189.941 122.317C191.661 124.038 192.615 126.491 192.615 129.061Z"
      fill="currentColor"
    />
  </svg>
)
