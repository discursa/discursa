import { icons } from "app/core/utils/icons"
import React, { FC } from "react"
import { CommentCard } from "../CommentCard/CommentCard"
import InfoBlock from "../InfoBlock/InfoBlock"
import styles from "./CommentList.module.scss"
import { CommentListProps } from "./CommentList.types"

export const CommentList: FC<CommentListProps> = (props) => {
	const { comments, nestingLevel, editComment, session, reply, setReply } =
		props

	return (
		<div className={styles.CommentList}>
			{comments.length === 0 ? (
				<InfoBlock
					title="Comments not found"
					description="No one comment has found, your may be first"
					href={icons.info}
					nestingLevel={nestingLevel}
				/>
			) : (
				comments.map((comment) => (
					<CommentCard
						key={comment.id_}
						comment={comment}
						nestingLevel={nestingLevel}
						editComment={() => editComment()}
						session={session}
						reply={reply}
						setReply={setReply}
					/>
				))
			)}
		</div>
	)
}
