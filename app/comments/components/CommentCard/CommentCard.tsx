import getComments from "app/comments/queries/getComments"
import getRepliedComments from "app/comments/queries/getRepliedComments"
import { CommentService } from "app/comments/services"
import { CommentFormValuesType } from "app/comments/types"
import { CommentSchema } from "app/comments/validations"
import { Avatar, IconButtonDropdown } from "app/core/components"
import { check } from "app/core/modules/Check"
import { icons } from "app/core/utils/icons"
import { QuestionService } from "app/questions"
import getUserById from "app/users/queries/getUserById"
import { useQuery, useRouter } from "blitz"
import { FC, Fragment, useState } from "react"
import { CommentForm } from "../CommentForm/CommentForm"
import { CommentList } from "../CommentList/CommentList"
import styles from "./CommentCard.module.scss"
import { CommentCardProps } from "./CommentCard.types"

export const CommentCard: FC<CommentCardProps> = (props) => {
	const {
		comment,
		session,
		editComment,
		nestingLevel,
		reply,
		setReply,
		type,
		parentObj,
		setQueryData,
	} = props
	const { message, authorId, parent } = comment
	const router = useRouter()
	const [listReply, setListReply] = useState<boolean>(false)
	const [user] = useQuery(getUserById, {
		id: authorId,
	})
	const [repliedComments] = useQuery(getRepliedComments, {
		replierId: comment.id_,
	})
	const [comments] = useQuery(getComments, {})
	const shortenName = user.name?.slice(0, 1)
	const commentService = new CommentService()
	const allButtons = [
		{
			id: 0,
			name: "Reply",
			variant: "secondary",
			size: "md",
			onClick() {
				setReply(true)
			},
		},
		{
			id: 1,
			name: "Mark as answer",
			variant: "secondary",
			size: "md",
			async onClick() {
				const questionService = new QuestionService()
				// @ts-ignore
				await questionService.answer(parentObj, comment, setQueryData)
			},
		},
		{
			id: 2,
			name: "Delete",
			variant: "danger",
			size: "md",
			async onClick() {
				await commentService.delete(comment, router)
			},
		},
	]

	const showButtons = () => {
		if (
			type === "question" &&
			check.author(session.userId, parentObj.authorId)
		) {
			return allButtons
		}
		if (
			type === "question" &&
			!check.author(session.userId, parentObj.authorId)
		) {
			const buttons = allButtons.filter((button) => button.id === 0)
			return buttons
		}
		if (type === "thread" && check.author(session.userId, parentObj.authorId)) {
			const buttons = allButtons.filter((button) => button.id !== 1)
			return buttons
		}
		if (
			type === "thread" &&
			!check.author(session.userId, parentObj.authorId)
		) {
			const buttons = allButtons.filter((button) => button.id === 0)
			return buttons
		}
	}

	const commentButtons = showButtons()

	const style =
		// @ts-ignore
		type === "question" && parentObj.answerId === comment.id
			? styles.Answer
			: styles.CommentCard

	const replyComment = async (values: CommentFormValuesType) => {
		await commentService.reply(
			type,
			comments,
			router,
			values,
			parentObj,
			comment,
			session
		)
	}

	return (
		<Fragment>
			<div className={style}>
				<div className="row w100 aic jcsb">
					<div className="row aic jcfs g1">
						<Avatar type="text" size="sm" shortenName={shortenName} />
						<p className="simple-text">{user.name}</p>
					</div>
					<div className="row aic jcfe g2">
						<p className="sub-text">{repliedComments.length} replies</p>
						<IconButtonDropdown
							variant="tertiary"
							size="sm"
							href={icons.kebabHorizontal}
							// @ts-ignore
							items={commentButtons}
							nestingLevel={nestingLevel}
						/>
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
								await replyComment(values)
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
						type={type}
						parent={parentObj}
						setQueryData={setQueryData}
					/>
				</div>
			)}
		</Fragment>
	)
}
