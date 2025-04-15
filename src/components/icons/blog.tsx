import type { SVGProps } from 'react'

export const BlogIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-blog ${props.className ?? ''}`}
  >
    <path d="M4 4h16v16H4z" /> {/* Outer box (blog post container) */}
    <path d="M8 8h8" />         {/* Blog title line */}
    <path d="M8 12h8" />        {/* First content line */}
    <path d="M8 16h5" />        {/* Second content line */}
  </svg>
)
