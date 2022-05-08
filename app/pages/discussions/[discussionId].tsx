import getComments from "app/api/queries/Comment/getComments"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getNotification from "app/api/queries/Notification/getNotification"
import getNotifications from "app/api/queries/Notification/getNotifications"
import getThreads from "app/api/queries/Thread/getThreads"
import getUser from "app/api/queries/User/getUser"
import { CommentService, DiscussionService } from "app/api/services"
import { getDiscussionComments } from "app/api/services/Comment/functions"
import {
	getDiscussionThreads,
	getUserPrivateThreads,
} from "app/api/services/functions"
import {
	Breadcrumbs,
	Button,
	CommentList,
	CreateThreadModal,
	Header,
	Icon,
	IconButton,
	LoadingOverlay,
	ModalWindow,
	Spinner,
} from "app/core/components"
import { CommentForm } from "app/core/components/Form/children/CommentForm"
import { AddUserToPrivateDiscussionModal } from "app/core/components/ModalWindow/children/AddUserToPrivateDiscussionModal"
import { PreviewableMessage } from "app/core/components/PreviewableMessage/PreviewableMessage"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { check } from "app/core/modules/Check"
import { CommentType, ModalWindowType } from "app/core/types"
import { ThreadType } from "app/core/types/Thread/Thread.types"
import { addObjectToStore, getId } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { CommentSchema } from "app/core/validation"
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
	const [notifications] = useQuery(getNotifications, {})
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
	const discussionComments: CommentType[] = getDiscussionComments(
		comments,
		discussion
	)
	const discussionThreads: ThreadType[] = getDiscussionThreads(
		threads,
		discussion
	)
	const userPrivateThreads: ThreadType[] = getUserPrivateThreads(
		threads,
		discussion,
		session
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

	const createThreadModal = {
		id: getId(modals),
		title: "Create thread",
		children: (
			<CreateThreadModal
				threads={threads}
				discussion={discussion}
				router={router}
			/>
		),
	}

	const inviteUserToDiscussionModal = {
		id: getId(modals),
		title: "Invite user",
		children: (
			<AddUserToPrivateDiscussionModal
				notifications={notifications}
				discussion={discussion}
				router={router}
				nestingLevel={NESTING_LEVEL}
			/>
		),
	}

	const bellIcon = (
		<Icon size="sm" href={icons.bell} nestingLevel={NESTING_LEVEL} />
	)
	const slashBellIcon = (
		<Icon size="sm" href={icons.bellSlash} nestingLevel={NESTING_LEVEL} />
	)
	const arrowUpIcon = (
		<Icon size="md" href={icons.arrowUp} nestingLevel={NESTING_LEVEL} />
	)
	const lockIcon = (
		<Icon size="sm" href={icons.lock} nestingLevel={NESTING_LEVEL} />
	)
	const hashIcon = (
		<Icon size="sm" href={icons.hash} nestingLevel={NESTING_LEVEL} />
	)
	const personAddIcon = (
		<Icon size="sm" href={icons.personAdd} nestingLevel={NESTING_LEVEL} />
	)

	const subscribeButtonText = check.subscribe(discussion, session)
		? "Unsubscribe"
		: "Subscribe"

	const subscribeButtonIcon = check.subscribe(discussion, session)
		? slashBellIcon
		: bellIcon

	const getDiscussionNotifications = async () => {
		if (check.subscribe(discussion, session)) {
			await discussionService.unsubscribe(
				discussion,
				// @ts-ignore
				session.userId,
				setQueryData
			)
		} else {
			await discussionService.subscribe(
				discussion,
				// @ts-ignore
				session.userId,
				setQueryData
			)
		}
	}

	const evaluateDiscussion = async () => {
		if (!check.upvote(discussion, session)) {
			// @ts-ignore
			await discussionService.upvote(discussion, session.userId, setQueryData)
		} else {
			// @ts-ignore
			await discussionService.unvote(discussion, session.userId, setQueryData)
		}
	}

	return (
		<Layout
			activePage=""
			pageTitle={discussion.name}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<aside className="w100 col g2">
				<div className="w100 row aic jcsb">
					<p className="simple-text">Threads</p>
					<IconButton
						variant="tertiary"
						size="md"
						href={icons.plus}
						nestinglevel={NESTING_LEVEL}
						onClick={() => addObjectToStore(setModals, createThreadModal)}
					/>
				</div>
				<Link href={`/discussions/${discussion.id_}`}>
					<Button
						variant="tertiary"
						size="md"
						styles="w100 jcfs"
						leadingIcon={hashIcon}
					>
						General
					</Button>
				</Link>
				{[...userPrivateThreads, ...discussionThreads].map((thread) => (
					<Link
						key={thread.id_}
						href={`/discussions/${discussion.id_}/${thread.id_}`}
					>
						<Button
							variant="tertiary"
							size="md"
							styles="w100 jcfs"
							leadingIcon={check.private(thread) ? lockIcon : hashIcon}
						>
							{thread.name}
						</Button>
					</Link>
				))}
			</aside>
			<div className="col g1">
				<Breadcrumbs items={breadcrumbsItems} />
				<div className="row aic jcsb w100">
					<h1>{discussion.name}</h1>
					<div className="row jcfe aic g1">
						{session && (
							<Fragment>
								<Button
									key="0"
									variant="secondary"
									size="md"
									leadingIcon={subscribeButtonIcon}
									onClick={async () => await getDiscussionNotifications()}
								>
									{subscribeButtonText}
								</Button>
								{discussion.voting && (
									<Button
										key="1"
										variant="secondary"
										size="md"
										leadingIcon={arrowUpIcon}
										styles={`w30 ${
											check.upvote(discussion, session) && "active blue-border"
										}`}
										onClick={async () => await evaluateDiscussion()}
									>
										{discussion.upvotes}
									</Button>
								)}
							</Fragment>
						)}
						{check.invitePermitions(discussion, session) && (
							<IconButton
								variant="secondary"
								size="md"
								href={icons.personAdd}
								nestinglevel={NESTING_LEVEL}
								onClick={() =>
									addObjectToStore(setModals, inviteUserToDiscussionModal)
								}
							/>
						)}
						{session.userId === discussion.authorId && (
							<Link
								key="1"
								href={Routes.EditDiscussionPage({
									discussionId: discussion.id_,
								})}
							>
								<IconButton
									variant="secondary"
									size="md"
									href={icons.gear}
									nestinglevel={NESTING_LEVEL}
								/>
							</Link>
						)}
					</div>
				</div>
				<p className="sub-text bottom-space-sm g1">
					<Link href={`/${user.name}`}>{user.name}</Link> started this
					discussion in {discussion.category}
				</p>
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
										session
									)
								}}
							/>
						)}
					</section>
				</div>
			</div>
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
