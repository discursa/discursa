import React, { FC, ReactNode } from "react"
import styles from "./Box.module.scss"
import { BoxProps } from "./Box.types"

export const Box: FC<BoxProps> = (props) => {
	const { children } = props

	return <div className={styles.Box}>{children}</div>
}
