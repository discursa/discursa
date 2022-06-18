import React, { FC } from "react"
import { Avatar } from "../Avatar/Avatar"
import styles from "./PreviewableMessage.module.scss"
import { PreviewableMessageProps } from "./PreviewableMessage.types"

export const PreviewableMessage: FC<PreviewableMessageProps> = (props) => {
	const { message, user, answer } = props
	const shortenName = user.name?.slice(0, 1)

	const style = answer
		? styles.AnswerPreviewableMessage
		: styles.PreviewableMessage

	return (
		<div className={style}>
			<div className="w100 row jcfs aic g1">
				<Avatar type="text" size="sm" shortenName={shortenName} />
				<p className="simple-text">{user.name}</p>
			</div>
			<p className="simple-text top-space-sm">{message}</p>
		</div>
	)
}
