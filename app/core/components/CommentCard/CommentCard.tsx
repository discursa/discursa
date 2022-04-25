import getComments from "app/api/queries/Comment/getComments"
import getRepliedComments from "app/api/queries/Comment/getRepliedComments"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getUser from "app/api/queries/User/getUser"
import { CommentService } from "app/api/services/Comment/Comment"
import { check } from "app/core/modules/Check"
import { icons } from "app/core/utils/icons"
import { CommentSchema } from "app/core/validation"
import { useQuery, useRouter } from "blitz"
import React, { FC, Fragment, useState } from "react"
import { Avatar } from "../Avatar/Avatar"
import { CommentList } from "../CommentList/CommentList"
import { CommentForm } from "../Form/children/CommentForm"
import { IconButton } from "../IconButton/IconButton"
import { IconButtonDropdown } from "../IconButtonDropdown/IconButtonDropdown"
import styles from "./CommentCard.module.scss"
import { CommentCardProps } from "./CommentCard.types"

const commentService = new CommentService()

export const CommentCard: FC<CommentCardProps> = (props) => {
	const { comment, session, editComment, nestingLevel, reply, setReply } = props
	const { message, authorId, parent } = comment
	const router = useRouter()
	const [listReply, setListReply] = useState<boolean>(false)
	const [user] = useQuery(getUser, {
		id: authorId,
	})
	const [discussion] = useQuery(getDiscussion, {
		id_: parent,
	})
	const [repliedComments] = useQuery(getRepliedComments, {
		replierId: comment.id,
	})
	const [comments] = useQuery(getComments, {})
	const shortenName = user.name?.slice(0, 1)
	const authorButtons = [
		{
			id: 0,
			name: "Reply",
			variant: "secondary",
			size: "md",
			onClick: () => setReply(true),
		},
		{
			id: 2,
			name: "Delete",
			variant: "danger",
			size: "md",
			onClick: () => commentService.delete(comment, router),
		},
	]

	const showButtons =
		check.admin(session) || check.author(session, authorId) ? authorButtons : ""

	return (
		<Fragment>
			<div className={styles.CommentCard}>
				<div className="row w100 aic jcsb">
					<div className="row aic jcfs g1">
						<Avatar type="text" size="sm" shortenName={shortenName} />
						<p className="simple-text">{user.name}</p>
					</div>
					<div className="row aic jcfe g2">
						<p className="sub-text">{repliedComments.length} replies</p>
						{showButtons ? (
							<IconButtonDropdown
								variant="tertiary"
								size="sm"
								href={icons.kebabHorizontal}
								items={authorButtons}
								nestingLevel={nestingLevel}
							/>
						) : (
							<IconButton
								variant="tertiary"
								size="sm"
								href={icons.reply}
								onClick={() => setReply(true)}
								nestinglevel={nestingLevel}
							/>
						)}
					</div>
				</div>
				<p className="simple-text">{message}</p>
				{reply && (
					<div className={styles.ReplyBlock}>
						<CommentForm
							className="w100"
							submitText="Reply"
							resetText="Cancel"
							schema={CommentSchema}
							onSubmit={async (values) => {
								await commentService.create(
									comments,
									values,
									discussion.id_,
									session,
									router,
									true,
									comment.id
								)
							}}
							onReset={() => setReply(false)}
						/>
					</div>
				)}
			</div>
			{repliedComments.length > 0 && (
				<div className="col pl-1 w100 box-border">
					<CommentList
						comments={repliedComments}
						nestingLevel={nestingLevel}
						reply={listReply}
						setReply={setListReply}
						session={session}
						editComment={() => editComment()}
					/>
				</div>
			)}
		</Fragment>
	)
}
