import getComments from "app/api/queries/Comment/getComments"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getNotifications from "app/api/queries/Notification/getNotifications"
import getThread from "app/api/queries/Thread/getThread"
import getThreads from "app/api/queries/Thread/getThreads"
import getUserById from "app/api/queries/User/getUserById"
import { CommentService, ThreadService } from "app/api/services"
import {
	getDiscussionThreads,
	getThreadComments,
	getUserPrivateThreads,
} from "app/api/services/functions"
import {
	AddUserToUSerThreadModal,
	Alert,
	Breadcrumbs,
	CommentForm,
	CommentList,
	CreateThreadModal,
	Header,
	Icon,
	JoinToPrivateThreadModal,
	LoadingOverlay,
	ModalWindow,
	UpdateThreadModal,
} from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import {
	AlertType,
	CommentType,
	ModalWindowType,
	ThreadType,
} from "app/core/types"
import { addObjectToStore, getId } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { CommentSchema } from "app/core/validation"
import { ThreadAsideWidget, ThreadsSidebarWidget } from "app/core/widgets"
import {
	BlitzPage,
	Routes,
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
	const [reply, setReply] = useState<boolean>(false)
	const [alerts, setAlerts] = useState<AlertType[]>([])
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [notifications] = useQuery(getNotifications, {})
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
	const [commets] = useQuery(getComments, {})

	const [discussion] = useQuery(getDiscussion, {
		id_: thread.parent,
	})
	const [threads] = useQuery(getThreads, {})

	const threadComments: CommentType[] = getThreadComments(commets, thread)

	const alreadyMemberAlert: AlertType = {
		id: getId(alerts),
		variant: "warning",
		message: "You have already been member of this thread",
		iconHref: icons.warning,
	}

	const joinToThreadModal = {
		id: getId(modals),
		title: "Join to private thread",
		children: (
			<JoinToPrivateThreadModal
				threads={threads}
				pushErrorAlert={() => addObjectToStore(setAlerts, alreadyMemberAlert)}
			/>
		),
	}

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
				alerts={alerts}
				setAlerts={setAlerts}
				setModals={setModals}
				threads={threads}
				session={session}
				nestingLevel={NESTING_LEVEL}
			/>
			<div className="w100 col g2">
				<Breadcrumbs items={breadcrumbsItems} />
				<CommentList
					comments={threadComments}
					session={session}
					reply={reply}
					editComment={async () => {
						await commentService.update()
					}}
					setReply={setReply}
					nestingLevel={NESTING_LEVEL}
				/>
				<CommentForm
					className="w100 g1"
					submitText="Create"
					schema={CommentSchema}
					initialValues={{ message: "" }}
					onSubmit={async (values) => {
						await threadService.comment(
							threadComments,
							router,
							values,
							thread.id_,
							false,
							"",
							session
						)
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
