import * as React from "react"
import { SVGProps } from "react"

const IconArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon is-clickable"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={48}
      d="m112 184 144 144 144-144"
    />
  </svg>
)

export default IconArrowDown