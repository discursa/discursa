import React, { FC } from "react"
import { SpinnerProps } from "./Spinner.types"

export const Spinner: FC<SpinnerProps> = (props) => {
	const { size } = props

	return <div className={`spinner-${size}`} />
}
