import getComments from "app/api/queries/Comment/getComments"
import getRepliedComments from "app/api/queries/Comment/getRepliedComments"
import getUserById from "app/api/queries/User/getUserById"
import { QuestionService } from "app/api/services"
import { CommentService } from "app/api/services/Comment/Comment"
import { check } from "app/core/modules/Check"
import { CommentFormValuesType } from "app/core/types"
import { icons } from "app/core/utils/icons"
import { CommentSchema } from "app/core/validation"
import { useQuery, useRouter } from "blitz"
import { FC, Fragment, useState } from "react"
import { Avatar } from "../Avatar/Avatar"
import { CommentList } from "../CommentList/CommentList"
import { CommentForm } from "../Form/children/CommentForm"
import { IconButtonDropdown } from "../IconButtonDropdown/IconButtonDropdown"
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
		if (
			type === "discussion" &&
			check.author(session.userId, parentObj.authorId)
		) {
			const buttons = allButtons.filter((button) => button.id !== 1)
			return buttons
		}
		if (
			type === "discussion" &&
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
