import React, { FC } from "react"
import { Spinner } from "../Spinner/Spinner"
import styles from "./LoaderBox.module.scss"
import { LoaderBoxProps } from "./LoaderBox.types"

export const LoaderBox: FC<LoaderBoxProps> = (props) => {
	const { size } = props

	return (
		<div className={styles.LoaderBox}>
			<Spinner size={size} />
		</div>
	)
}
