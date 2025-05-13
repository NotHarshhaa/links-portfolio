import type { SVGProps } from 'react'

export const HashnodeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 337 337"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className ?? ''}
  >
    <rect x="0.5" y="0.5" width="336" height="336" rx="42.5" fill="#2962FF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M168.1 71C110.8 71 64.5 117.3 64.5 174.6C64.5 231.9 110.8 278.2 168.1 278.2C225.4 278.2 271.7 231.9 271.7 174.6C271.7 117.3 225.4 71 168.1 71ZM232.5 175.7C232.5 178.3 231.5 180.7 229.8 182.4L175.6 236.5C173.9 238.2 171.5 239.2 168.9 239.2C166.3 239.2 163.9 238.3 162.2 236.5L108 182.4C106.3 180.7 105.3 178.3 105.3 175.7C105.3 173.1 106.3 170.7 108 169L162.2 114.9C163.9 113.2 166.3 112.2 168.9 112.2C171.5 112.2 173.9 113.2 175.6 114.9L229.8 169C231.5 170.7 232.5 173.1 232.5 175.7Z"
      fill="white"
    />
  </svg>
)
