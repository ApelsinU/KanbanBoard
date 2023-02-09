import React from 'react'

import './loader.scss'
import { STEP, COLORS, getShadow } from './loader-config'

type LoaderProps = {
  size?: number
  color?: 'purple' | 'white'
}

export const Loader = ({ size = 4, color = 'purple' }: LoaderProps) => {
  const shadow = getShadow(size)

  return (
    <div className="loader-container">
      <div className="loader">
        <div
          className="loader-spin"
          style={{
            width: `${STEP * size}px`,
            height: `${STEP * size}px`,
            boxShadow: `0 ${shadow}px 0 0 ${COLORS[color]}`,
          }}
        ></div>
      </div>
    </div>
  )
}
