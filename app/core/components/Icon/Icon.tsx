import React, { FC } from "react"
import { IconProps } from "./Icon.types"

export const Icon: FC<IconProps> = (props) => {
  const { styles, size, nestingLevel, href } = props

  const className =
    styles === undefined ? `icon-${size}` : `icon-${size} ${styles}`

  return (
    <svg className={className} aria-hidden="true">
      <use xlinkHref={`${nestingLevel}${href}`} />
    </svg>
  )
}
