import getDiscussion from "app/discussions/queries/getDiscussion"
import { Breadcrumbs } from "app/core/components"
import { PreviewableMessage } from "app/core/components/PreviewableMessage/PreviewableMessage"
import { ITEMS_PER_PAGE } from "app/core/constants"
import { typeGuard } from "app/core/modules/TypeGuard"
import {
	Routes,
	usePaginatedQuery,
	useQuery,
	useRouter,
	useSession,
} from "blitz"
import { FC, Fragment, useState } from "react"
import {
	CommentForm,
	CommentFormValuesType,
	CommentList,
	CommentSchema,
	CommentService,
	CommentType,
} from "app/comments"
import { QuestionService } from "app/questions/services"
import { QuestionMainWidgetProps } from "./QuestionMainWidget.types"
import getComments from "app/comments/queries/getComments"
import getQuestion from "app/questions/queries/getQuestion"
import getPaginatedComments from "app/comments/queries/getPaginatedComments"
import getUserById from "app/users/queries/getUserById"

export const QuestionMainWidget: FC<QuestionMainWidgetProps> = (props) => {
	const { questionId, nestingLevel } = props

	const router = useRouter()
	const session = useSession()
	const page = Number(router.query.page) || 0

	const [reply, setReply] = useState<boolean>(false)

	const commentService = new CommentService()
	const questionService = new QuestionService()

	const [question, { setQueryData }] = useQuery(
		getQuestion,
		{
			id_: questionId,
		},
		{
			staleTime: Infinity,
		}
	)

	const [comments] = useQuery(getComments, {})

	const answer = comments.find((comment) => {
		return comment.id === question.answerId
	})

	const answerNonEqualUndefined =
		question.answered && typeGuard.isComment(answer)

	const [author] = useQuery(getUserById, {
		id: answer?.authorId,
	})
	const [{ paginatedComments, hasMore }, { isPreviousData }] =
		usePaginatedQuery(getPaginatedComments, {
			where: {
				parent: questionId,
				type: "question",
			},
			orderBy: { id_: "asc" },
			skip: ITEMS_PER_PAGE * page,
			take: ITEMS_PER_PAGE,
		})

	const [discussion] = useQuery(getDiscussion, {
		id_: question.parent,
	})

	const [user] = useQuery(getUserById, {
		id: question.authorId,
	})

	const breadcrumbsItems = [
		{
			id: 0,
			name: "General",
			route: Routes.ShowHome(),
		},
		{
			id: 1,
			name: "Discussions",
			route: Routes.ShowDiscussionsPage(),
		},
		{
			id: 2,
			name: discussion.name,
			route: Routes.ShowDiscussionPage({ discussionId: discussion.id_ }),
		},
		{
			id: 2,
			name: question.name,
			route: Routes.ShowQuestionPage({
				discussionId: discussion.id_,
				questionId: question.id_,
			}),
		},
	]

	const commentQuestion = async (values: CommentFormValuesType) => {
		await questionService.comment(
			comments,
			router,
			values,
			question.id_,
			null,
			session,
			question
		)
	}

	const paginatedCommentsWithoutAnswer: CommentType[] =
		paginatedComments.filter((comment: CommentType) => {
			return comment.id !== question.answerId
		})

	return (
		<section className="w100 col aifs jcfs g1">
			<Breadcrumbs items={breadcrumbsItems} />
			<h2>{question.name}</h2>
			<PreviewableMessage message={question.description} user={user} />
			{answerNonEqualUndefined && (
				<Fragment>
					<h3 className="top-space-sm">Suggested answer:</h3>
					<PreviewableMessage
						message={answer.message}
						user={author}
						answer={true}
					/>
				</Fragment>
			)}
			<CommentList
				comments={
					question.answered ? paginatedCommentsWithoutAnswer : paginatedComments
				}
				session={session}
				reply={reply}
				editComment={async () => {
					await commentService.update()
				}}
				setReply={setReply}
				nestingLevel={nestingLevel}
				type="question"
				parent={question}
				setQueryData={setQueryData}
				page={page}
				isPreviousData={isPreviousData}
				hasMore={hasMore}
			/>
			<CommentForm
				className="w100 g1"
				submitText="Send"
				schema={CommentSchema}
				initialValues={{ message: "" }}
				onSubmit={async (values) => {
					await commentQuestion(values)
				}}
			/>
		</section>
	)
}
