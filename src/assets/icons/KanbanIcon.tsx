import { SVGProps } from 'react'

export const KanbanIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1"
        y="1"
        width="23"
        height="23"
        rx="3"
        stroke="#6e6e6e"
        strokeWidth="2"
      />
      <line x1="8.5" x2="8.5" y2="25" stroke="#6e6e6e" strokeWidth="2" />
      <line
        x1="16.5"
        y1="1"
        x2="16.5"
        y2="23"
        stroke="#6e6e6e"
        strokeWidth="2"
      />
    </svg>
  )
}
