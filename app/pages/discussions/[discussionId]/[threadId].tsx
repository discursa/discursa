import getComments from "app/api/queries/Comment/getComments"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
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
	Avatar,
	Breadcrumbs,
	Button,
	CommentForm,
	CommentList,
	CreateThreadModal,
	Header,
	Icon,
	IconButton,
	LoadingOverlay,
	ModalWindow,
	UpdateThreadModal,
} from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { check } from "app/core/modules/Check"
import { CommentType, ModalWindowType, ThreadType } from "app/core/types"
import {
	addObjectToStore,
	getId,
	getShortenUsername,
} from "app/core/utils/functions"
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
import { FC, Fragment, Suspense, useState } from "react"

const NESTING_LEVEL = "../../"
const threadService = new ThreadService()
const commentService = new CommentService()

const ThreadPage: FC = () => {
	const threadId = useParam("threadId", "number")
	const router = useRouter()
	const session = useSession()
	const [reply, setReply] = useState<boolean>(false)
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [user] = useQuery(getUserById, {
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

	const discussionThreads: ThreadType[] = getDiscussionThreads(
		threads,
		discussion
	)
	const userPrivateThreads: ThreadType[] = getUserPrivateThreads(
		threads,
		discussion,
		session
	)
	const threadComments: CommentType[] = getThreadComments(commets, thread)

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

	const updateThreadModal = {
		id: getId(modals),
		title: "Update thread",
		children: <UpdateThreadModal thread={thread} setQueryData={setQueryData} />,
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

	const lockIcon = (
		<Icon size="sm" href={icons.lock} nestingLevel={NESTING_LEVEL} />
	)
	const hashIcon = (
		<Icon size="sm" href={icons.hash} nestingLevel={NESTING_LEVEL} />
	)
	const gearIcon = (
		<Icon size="sm" href={icons.gear} nestingLevel={NESTING_LEVEL} />
	)

	return (
		<Layout
			activePage=""
			pageTitle={thread.name}
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
			<aside className="w100 col g2 pr-40px box-border">
				<div className="row aic jcfs">
					<p className="simple-text right-space-xs">Owner:</p>
					<Link href={`/${user.name}`}>
						<a className="row g1">
							<Avatar
								type="text"
								size="sm"
								shortenName={getShortenUsername(user)}
							/>
							{user.name}
						</a>
					</Link>
				</div>
				<div className="row g1">
					<p className="simple-text">Type:</p>
					<p className="sub-text">{thread.visibility}</p>
				</div>
				{check.admin(session) || check.author(session, session.userId) ? (
					<Button
						variant="secondary"
						size="md"
						type="submit"
						styles="w100"
						leadingIcon={gearIcon}
						onClick={() => addObjectToStore(setModals, updateThreadModal)}
					>
						Settings
					</Button>
				) : (
					""
				)}
			</aside>
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
