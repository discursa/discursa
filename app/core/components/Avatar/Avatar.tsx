import React, { FC } from "react"
import { AvatarProps } from "./Avatar.types"
import Image from "blitz"

// eslint-disable-next-line complexity
export const Avatar: FC<AvatarProps> = (props) => {
  const { alt, shortenName, type, size, src } = props
  const className = `${type}-avatar-${size}`
  const imageSize =
    size === "sm" ? 30 : size === "md" ? 35 : size === "lg" ? 40 : ""

  if (type === "img" && shortenName !== undefined) {
    throw new Error("Avatar image shouldn't have any text")
  }

  if (type === "text" && src !== "") {
    throw new Error("Text image shoudn't have any src")
  }

  if (type === "img") {
    // @ts-ignore
    return (
      <Image
        className={className}
        src={src}
        width={imageSize}
        height={imageSize}
        style={{
          borderRadius: "50%",
        }}
        alt={alt}
      />
    )
  }

  return <div className={className}>{shortenName}</div>
}

Avatar.defaultProps = {
  src: "",
}
