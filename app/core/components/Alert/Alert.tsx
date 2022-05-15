import React, { FC } from "react"
import { icons } from "../../utils/icons"
import { Icon } from "../Icon/Icon"
import { IconButton } from "../IconButton/IconButton"
import { Button } from "../index"
import { AlertProps } from "./Alert.types"

export const Alert: FC<AlertProps> = (props) => {
	const {
		variant,
		message,
		action,
		toast,
		actionMessage,
		remove,
		nestingLevel,
		styles,
		iconHref,
	} = props
	const className =
		styles !== undefined ? `alert-${variant} ${styles}` : `alert-${variant}`

	return (
		<dialog className={className} role="alert">
			<div className="row aic jcfs g2">
				<Icon href={iconHref} size="lg" nestingLevel={nestingLevel} />
				<p className="simple-text">{message}</p>
			</div>
			<div className="row jcfe aic g2">
				{action !== undefined && (
					<Button
						variant="secondary"
						size="md"
						styles="bg-800"
						onClick={() => action()}
					>
						{actionMessage}
					</Button>
				)}
				{!toast && (
					<IconButton
						variant="tertiary"
						size="sm"
						href={icons.close}
						nestinglevel={nestingLevel}
						onClick={() => remove()}
						styles="text-slate-400"
					/>
				)}
			</div>
		</dialog>
	)
}
