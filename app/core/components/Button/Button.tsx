import React, { FC } from "react"
import { ButtonProps } from "./Button.types"

export const Button: FC<ButtonProps> = (props) => {
	const { children, size, variant, styles, leadingicon } = props

	const className =
		styles === undefined
			? `${variant}-btn-${size}`
			: `${variant}-btn-${size} ${styles}`

	if (leadingicon !== undefined) {
		return (
			<button className={className} {...props}>
				{leadingicon}
				{children}
			</button>
		)
	}

	return (
		<button className={className} {...props}>
			{children}
		</button>
	)
}
