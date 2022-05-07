import React, { FC } from "react"
import { Spinner } from "../Spinner/Spinner"
import styles from "./LoadingOverlay.module.scss"

export const LoadingOverlay: FC = () => (
	<div className={styles.LoadingOverlay}>
		<Spinner />
	</div>
)
