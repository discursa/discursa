import { Head } from "blitz"
import React, { FC } from "react"
import { HeaderProps } from "./Header.types"

export const Header: FC<HeaderProps> = (props) => {
  const { title } = props

  return (
    <Head>
      <html lang="EN" />
      <title>{title}</title>
      <body className="dark" />
    </Head>
  )
}
