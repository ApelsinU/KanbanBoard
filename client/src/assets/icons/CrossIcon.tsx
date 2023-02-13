import { SVGProps } from 'react'

export const CrossIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      {...props}
    >
      <line
        x1="0.707107"
        y1="1.29289"
        x2="20.7071"
        y2="21.2929"
        stroke="currentColor"
        strokeWidth="3"
      />
      <line
        x1="20.7071"
        y1="1.70711"
        x2="0.707107"
        y2="21.7071"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  )
}
