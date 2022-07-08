import { Pagination } from "app/core/components"
import { FC } from "react"
import { CommentCard } from "../CommentCard/CommentCard"
import styles from "./CommentList.module.scss"
import { CommentListProps } from "./CommentList.types"

export const CommentList: FC<CommentListProps> = (props) => {
	const {
		comments,
		nestingLevel,
		editComment,
		session,
		reply,
		setReply,
		type,
		parent,
		setQueryData,
		page,
		isPreviousData,
		hasMore,
	} = props

	return (
		<div className={styles.CommentList}>
			{comments.map((comment) => (
				<CommentCard
					key={comment.id_}
					comment={comment}
					nestingLevel={nestingLevel}
					editComment={() => editComment()}
					session={session}
					reply={reply}
					setReply={setReply}
					type={type}
					parentObj={parent}
					setQueryData={setQueryData}
				/>
			))}
			{comments.length > 20 && (
				<Pagination
					page={page}
					isPreviousData={isPreviousData}
					hasMore={hasMore}
				/>
			)}
		</div>
	)
}
