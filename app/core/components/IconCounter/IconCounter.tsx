import React, { FC } from "react"
import { Icon } from "../Icon/Icon"
import styles from "./IconCounter.module.scss"
import { IconCounterProps } from "./IconCounter.types"

export const IconCounter: FC<IconCounterProps> = (props) => {
	const { counter, href, nestingLevel } = props

	return (
		<div className={styles.IconCounter}>
			<Icon size="sm" href={href} nestingLevel={nestingLevel} />
			{counter}
		</div>
	)
}
