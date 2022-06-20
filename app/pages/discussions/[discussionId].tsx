import getComments from "app/api/queries/Comment/getComments"
import getPaginatedComments from "app/api/queries/Comment/getPaginatedComments"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getQuestions from "app/api/queries/Question/getQuestions"
import getThreads from "app/api/queries/Thread/getThreads"
import getUser from "app/api/queries/User/getUser"
import { CommentService, DiscussionService } from "app/api/services"
import {
	Alert,
	Breadcrumbs,
	Button,
	CommentList,
	Header,
	InfoBlock,
	LoadingOverlay,
	ModalWindow,
} from "app/core/components"
import { CommentForm } from "app/core/components/Form/children/CommentForm"
import { PreviewableMessage } from "app/core/components/PreviewableMessage/PreviewableMessage"
import { ITEMS_PER_PAGE } from "app/core/constants"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import {
	AlertType,
	CommentFormValuesType,
	ModalWindowType,
} from "app/core/types"
import { icons } from "app/core/utils/icons"
import { CommentSchema } from "app/core/validation"
import {
	DiscussionAsideWidget,
	ThreadsSidebarWidget,
	UserBannedWidget,
} from "app/core/widgets"
import {
	BlitzPage,
	Link,
	Routes,
	usePaginatedQuery,
	useParam,
	useQuery,
	useRouter,
	useSession,
} from "blitz"
import { Fragment, Suspense, useState } from "react"

const NESTING_LEVEL = "../"
const discussionService = new DiscussionService()
const commentService = new CommentService()

export const DiscussionPage = () => {
	const router = useRouter()
	const session = useSession()
	const page = Number(router.query.page) || 0
	const discussionId = useParam("discussionId", "number")
	const [discussion, { setQueryData }] = useQuery(
		getDiscussion,
		{ id_: discussionId },
		{ staleTime: Infinity }
	)
	const [{ paginatedComments, hasMore }, { isPreviousData }] =
		usePaginatedQuery(getPaginatedComments, {
			where: {
				parent: discussionId,
				type: "discussion",
			},
			orderBy: { id_: "asc" },
			skip: ITEMS_PER_PAGE * page,
			take: ITEMS_PER_PAGE,
		})
	const [threads] = useQuery(getThreads, {})
	const [reply, setReply] = useState<boolean>(false)
	// @ts-ignore
	const [user] = useQuery(getUser, { id: discussion.authorId })
	const [questions] = useQuery(getQuestions, {})
	const [comments] = useQuery(getComments, {})
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [alerts, setAlerts] = useState<AlertType[]>([])

	const breadcrumbsItems = [
		{
			id: 0,
			name: "General",
			route: Routes.ShowHome(),
		},
		{
			id: 2,
			name: "Discussions",
			route: Routes.ShowDiscussionsPage(),
		},
		{
			id: 0,
			name: discussion.name,
			route: Routes.ShowDiscussionPage({ discussionId: discussion.id_ }),
		},
	]

	const commentDiscussion = async (values: CommentFormValuesType) => {
		await discussionService.comment(
			comments,
			router,
			values,
			discussion.id_,
			null,
			session,
			discussion
		)
	}

	// @ts-ignore
	return discussion.banned.includes(session.userId) ? (
		<UserBannedWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage="Discussions"
			pageTitle={discussion.name}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<ThreadsSidebarWidget
				discussion={discussion}
				nestingLevel={NESTING_LEVEL}
				modals={modals}
				setModals={setModals}
				threads={threads}
				session={session}
				questions={questions}
			/>
			<div className="col g1">
				<Breadcrumbs items={breadcrumbsItems} />
				<h1 className="bottom-space-sm">{discussion.name}</h1>
				<PreviewableMessage message={discussion.message} user={user} />
				<CommentList
					comments={paginatedComments}
					session={session}
					nestingLevel={NESTING_LEVEL}
					editComment={async () => await commentService.update()}
					reply={reply}
					setReply={setReply}
					type="discussion"
					parent={discussion}
					page={page}
					isPreviousData={isPreviousData}
					hasMore={hasMore}
				/>
				<section className={styles.MessageForm}>
					{session && (
						<CommentForm
							className="w100 g1"
							submitText="Create"
							schema={CommentSchema}
							onSubmit={async (values) => {
								await commentDiscussion(values)
							}}
						/>
					)}
				</section>
			</div>
			<DiscussionAsideWidget
				discussion={discussion}
				nestingLevel={NESTING_LEVEL}
				setQueryData={setQueryData}
				modals={modals}
				setModals={setModals}
				user={user}
			/>
			{alerts.map((alert) => (
				<Alert
					key={alert.id}
					variant={alert.variant}
					message={alert.message}
					toast={false}
					nestingLevel={NESTING_LEVEL}
					iconHref={alert.iconHref}
				/>
			))}
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

const ShowDiscussionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<DiscussionPage />
			</Suspense>
		</Fragment>
	)
}

ShowDiscussionPage.authenticate = false

export default ShowDiscussionPage
