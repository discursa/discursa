import { Head } from "blitz"
import React, { FC } from "react"
import { HeaderProps } from "./Header.types"

export const Header: FC<HeaderProps> = (props) => {
	const { title } = props

	return (
		<Head>
			<html lang="EN" />
			<link rel="icon" type="image/x-icon" href="favicon.ico" />
			<title>{title}</title>
			<body className="dark" />
		</Head>
	)
}
