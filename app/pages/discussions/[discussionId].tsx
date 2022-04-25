import getComments from "app/api/queries/Comment/getComments"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getUser from "app/api/queries/User/getUser"
import { CommentService, DiscussionService } from "app/api/services"
import {
	Breadcrumbs,
	Button,
	CommentList,
	Header,
	Icon,
	IconButton,
	Spinner,
} from "app/core/components"
import { CommentForm } from "app/core/components/Form/children/CommentForm"
import { PreviewableMessage } from "app/core/components/PreviewableMessage/PreviewableMessage"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { check } from "app/core/modules/Check"
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
	const [discussion, { setQueryData }] = useQuery(
		getDiscussion,
		{ id_: discussionId },
		{ staleTime: Infinity }
	)
	const [reply, setReply] = useState<boolean>(false)
	const [user] = useQuery(getUser, { id: discussion.authorId })
	const [comments] = useQuery(getComments, {})
	const noRepliedComments = comments.filter(
		(comment) => comment.replierId === ""
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

	const bellIcon = (
		<Icon size="sm" href={icons.bell} nestingLevel={NESTING_LEVEL} />
	)
	const slashBellIcon = (
		<Icon size="sm" href={icons.bellSlash} nestingLevel={NESTING_LEVEL} />
	)
	const arrowUpIcon = (
		<Icon size="md" href={icons.arrowUp} nestingLevel={NESTING_LEVEL} />
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
				session.userId,
				setQueryData
			)
		} else {
			await discussionService.subscribe(
				discussion,
				session.userId,
				setQueryData
			)
		}
	}

	const evaluateDiscussion = async () => {
		if (check.upvote(discussion, session)) {
			await discussionService.upvote(discussion, session.userId, setQueryData)
		} else {
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
			<div></div>
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
							</Fragment>
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
				<p className="sub-text bottom-space-sm">
					{user.name} started this discussion
				</p>
				<PreviewableMessage message={discussion.message} user={user} />
				<div className="col top-space-sm g2">
					<h3>Comments</h3>
					{session && (
						<CommentForm
							className="w100 g1"
							submitText="Create"
							schema={CommentSchema}
							onSubmit={async (values) => {
								commentService.create(
									comments,
									values,
									discussion.id_,
									session,
									router,
									false
								)
							}}
						/>
					)}
					<CommentList
						comments={noRepliedComments}
						session={session}
						nestingLevel={NESTING_LEVEL}
						editComment={async () => await commentService.update()}
						reply={reply}
						setReply={setReply}
					/>
				</div>
			</div>
		</Layout>
	)
}

const ShowDiscussionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<Spinner />}>
				<DiscussionPage />
			</Suspense>
		</Fragment>
	)
}

ShowDiscussionPage.authenticate = false

export default ShowDiscussionPage
