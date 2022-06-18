import getComments from "app/api/queries/Comment/getComments"
import getPaginatedComments from "app/api/queries/Comment/getPaginatedComments"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getQuestion from "app/api/queries/Question/getQuestion"
import getQuestions from "app/api/queries/Question/getQuestions"
import getThreads from "app/api/queries/Thread/getThreads"
import getUserById from "app/api/queries/User/getUserById"
import { CommentService, QuestionService } from "app/api/services"
import { getQuestionComments } from "app/api/services/Comment/functions"
import {
	Breadcrumbs,
	CommentForm,
	CommentList,
	Header,
	LoadingOverlay,
	ModalWindow,
} from "app/core/components"
import { PreviewableMessage } from "app/core/components/PreviewableMessage/PreviewableMessage"
import { ITEMS_PER_PAGE } from "app/core/constants"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { CommentFormValuesType, ModalWindowType } from "app/core/types"
import { CommentSchema } from "app/core/validation"
import { QuestionAsideWidget, ThreadsSidebarWidget } from "app/core/widgets"
import {
	BlitzPage,
	Routes,
	usePaginatedQuery,
	useParam,
	useQuery,
	useRouter,
	useSession,
} from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

const NESTING_LEVEL = "../../../"

const QuestionPage: FC = () => {
	const questionId = useParam("questionId", "number")
	const router = useRouter()
	const session = useSession()
	const page = Number(router.query.page) || 0

	const [question, { setQueryData }] = useQuery(
		getQuestion,
		{
			id_: questionId,
		},
		{
			staleTime: Infinity,
		}
	)
	const [discussion] = useQuery(getDiscussion, {
		id_: question.parent,
	})
	const [comments] = useQuery(getComments, {})
	const answer = comments.find((comment) => {
		return comment.id === question.answerId
	})
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
	const [threads] = useQuery(getThreads, {})
	const [questions] = useQuery(getQuestions, {})
	const [user] = useQuery(getUserById, {
		id: question.authorId,
	})
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [reply, setReply] = useState<boolean>(false)

	const commentService = new CommentService()
	const questionService = new QuestionService()

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

	// @ts-ignore
	const paginatedCommentsWithoutAnswer = paginatedComments.filter((comment) => {
		return comment.id !== question.answerId
	})

	return (
		<Layout
			activePage="Discussions"
			pageTitle={question.name}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<ThreadsSidebarWidget
				discussion={discussion}
				session={session}
				threads={threads}
				nestingLevel={NESTING_LEVEL}
				modals={modals}
				setModals={setModals}
				questions={questions}
			/>
			<section className="w100 col aifs jcfs g1">
				<Breadcrumbs items={breadcrumbsItems} />
				<h2>{question.name}</h2>
				<PreviewableMessage message={question.description} user={user} />
				{question.answered && (
					<Fragment>
						<h3 className="top-space-sm">Suggested answer:</h3>
						{/* @ts-ignore */}
						<PreviewableMessage
							// @ts-ignore
							message={answer.message}
							user={author}
							answer={true}
						/>
					</Fragment>
				)}
				<CommentList
					comments={
						question.answered
							? paginatedCommentsWithoutAnswer
							: paginatedComments
					}
					session={session}
					reply={reply}
					editComment={async () => {
						await commentService.update()
					}}
					setReply={setReply}
					nestingLevel={NESTING_LEVEL}
					type="question"
					parent={question}
					setQueryData={setQueryData}
					page={page}
					isPreviousData={isPreviousData}
					hasMore={hasMore}
				/>
				<CommentForm
					className="w100 g1"
					submitText="Create"
					schema={CommentSchema}
					initialValues={{ message: "" }}
					onSubmit={async (values) => {
						await commentQuestion(values)
					}}
				/>
			</section>
			<QuestionAsideWidget
				question={question}
				nestingLevel={NESTING_LEVEL}
				session={session}
			/>
			{modals.map((modal) => (
				<ModalWindow
					key={modal.id}
					title={modal.title}
					modals={modals}
					setModals={setModals}
					nestingLevel={NESTING_LEVEL}
				>
					{modal.children}
				</ModalWindow>
			))}
		</Layout>
	)
}

const ShowQuestionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<QuestionPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowQuestionPage
