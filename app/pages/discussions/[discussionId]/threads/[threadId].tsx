import getComments from "app/api/queries/Comment/getComments"
import getPaginatedComments from "app/api/queries/Comment/getPaginatedComments"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getThread from "app/api/queries/Thread/getThread"
import getThreads from "app/api/queries/Thread/getThreads"
import getUserById from "app/api/queries/User/getUserById"
import { CommentService, ThreadService } from "app/api/services"
import { getThreadComments } from "app/api/services/functions"
import {
	Alert,
	Breadcrumbs,
	CommentForm,
	CommentList,
	Header,
	LoadingOverlay,
	ModalWindow,
} from "app/core/components"
import { ITEMS_PER_PAGE } from "app/core/constants"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import {
	AlertType,
	CommentFormValuesType,
	CommentType,
	ModalWindowType,
} from "app/core/types"
import { CommentSchema } from "app/core/validation"
import { ThreadAsideWidget, ThreadsSidebarWidget } from "app/core/widgets"
import {
	BlitzPage,
	Routes,
	usePaginatedQuery,
	useParam,
	useQuery,
	useRouter,
	useSession,
} from "blitz"
import { Fragment, Suspense, useState } from "react"

const NESTING_LEVEL = "../../"
const threadService = new ThreadService()
const commentService = new CommentService()

const ThreadPage = () => {
	const threadId = useParam("threadId", "number")
	const router = useRouter()
	const session = useSession()
	const page = Number(router.query.page) || 0
	const [reply, setReply] = useState<boolean>(false)
	const [alerts, setAlerts] = useState<AlertType[]>([])
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [user] = useQuery(getUserById, {
		// @ts-ignore
		id: session.userId,
	})
	const [thread, { setQueryData }] = useQuery(
		getThread,
		{
			id_: threadId,
		},
		{
			staleTime: Infinity,
		}
	)
	const [{ paginatedComments, hasMore }, { isPreviousData }] =
		usePaginatedQuery(getPaginatedComments, {
			where: {
				parent: threadId,
				type: "question",
			},
			orderBy: { id_: "asc" },
			skip: ITEMS_PER_PAGE * page,
			take: ITEMS_PER_PAGE,
		})
	const [comments] = useQuery(getComments, {})

	const [discussion] = useQuery(getDiscussion, {
		id_: thread.parent,
	})
	const [threads] = useQuery(getThreads, {})

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
			id: 3,
			name: thread.name,
			route: Routes.ShowThreadPage({
				discussionId: discussion.id_,
				threadId: thread.id_,
			}),
		},
	]

	const commentThread = async (values: CommentFormValuesType) => {
		await threadService.comment(
			comments,
			router,
			values,
			thread.id_,
			null,
			session,
			thread
		)
	}

	return (
		<Layout
			activePage=""
			pageTitle={thread.name}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<ThreadsSidebarWidget
				discussion={discussion}
				modals={modals}
				setModals={setModals}
				threads={threads}
				session={session}
				nestingLevel={NESTING_LEVEL}
				questions={[]}
			/>
			<div className="w100 col g2">
				<Breadcrumbs items={breadcrumbsItems} />
				<CommentList
					comments={paginatedComments}
					session={session}
					reply={reply}
					editComment={async () => {
						await commentService.update()
					}}
					setReply={setReply}
					nestingLevel={NESTING_LEVEL}
					type="thread"
					parent={thread}
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
						await commentThread(values)
					}}
				/>
			</div>
			<ThreadAsideWidget
				thread={thread}
				user={user}
				nestingLevel={NESTING_LEVEL}
				setQueryData={setQueryData}
				setModals={setModals}
				modals={modals}
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

const ShowThreadPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading" />
			<Suspense fallback={<LoadingOverlay />}>
				<ThreadPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowThreadPage
