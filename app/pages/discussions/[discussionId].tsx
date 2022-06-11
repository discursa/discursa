import getComments from "app/api/queries/Comment/getComments"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getNotifications from "app/api/queries/Notification/getNotifications"
import getThreads from "app/api/queries/Thread/getThreads"
import getUser from "app/api/queries/User/getUser"
import { CommentService, DiscussionService } from "app/api/services"
import { getDiscussionComments } from "app/api/services/Comment/functions"
import {
	Alert,
	Breadcrumbs,
	CommentList,
	Header,
	LoadingOverlay,
	ModalWindow,
} from "app/core/components"
import { CommentForm } from "app/core/components/Form/children/CommentForm"
import { AddUserToPrivateDiscussionModal } from "app/core/components/ModalWindow/children/AddUserToPrivateDiscussionModal"
import { PreviewableMessage } from "app/core/components/PreviewableMessage/PreviewableMessage"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { AlertType, CommentType, ModalWindowType } from "app/core/types"
import { getId } from "app/core/utils/functions"
import { CommentSchema } from "app/core/validation"
import { DiscussionAsideWidget, ThreadsSidebarWidget } from "app/core/widgets"
import {
	BlitzPage,
	Link,
	Routes,
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
	const discussionId = useParam("discussionId", "number")
	const [discussion, { setQueryData }] = useQuery(
		getDiscussion,
		{ id_: discussionId },
		{ staleTime: Infinity }
	)
	const [threads] = useQuery(getThreads, {})
	const [reply, setReply] = useState<boolean>(false)
	// @ts-ignore
	const [user] = useQuery(getUser, { id: discussion.authorId })
	const [comments] = useQuery(getComments, {})
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [alerts, setAlerts] = useState<AlertType[]>([])
	const discussionComments: CommentType[] = getDiscussionComments(
		comments,
		discussion
	)

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

	return (
		<Layout
			activePage=""
			pageTitle={discussion.name}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<ThreadsSidebarWidget
				discussion={discussion}
				nestingLevel={NESTING_LEVEL}
				modals={modals}
				alerts={alerts}
				setAlerts={setAlerts}
				setModals={setModals}
				threads={threads}
				session={session}
			/>
			<div className="col g1">
				<Breadcrumbs items={breadcrumbsItems} />
				<h1 className="bottom-space-sm">{discussion.name}</h1>
				<PreviewableMessage message={discussion.message} user={user} />
				<div className="col top-space-sm g2">
					<CommentList
						comments={discussionComments}
						session={session}
						nestingLevel={NESTING_LEVEL}
						editComment={async () => await commentService.update()}
						reply={reply}
						setReply={setReply}
					/>
					<section className={styles.MessageForm}>
						{session && (
							<CommentForm
								className="w100 g1"
								submitText="Create"
								schema={CommentSchema}
								onSubmit={async (values) => {
									await discussionService.comment(
										comments,
										router,
										values,
										discussion.id_,
										false,
										"",
										session,
										discussion
									)
								}}
							/>
						)}
					</section>
				</div>
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
